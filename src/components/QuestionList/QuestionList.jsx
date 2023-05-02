import { Box, Collapse, IconButton, Stack } from "@mui/material";
import React from "react";
import { TransitionGroup } from "react-transition-group";
import AddIcon from "@mui/icons-material/Add";
import Question from "../Question/Question";
import AnswerList from "../AnswerList/AnswerList";
import { v4 as uuidv4 } from "uuid";


export default function QuestionList({setAnswerList, setQuestionList, answerList, questionList}) {
  return (
    <Stack
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <TransitionGroup
        style={{
          width: "100%",
          gap: "40px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {questionList.map((question) => (
          <Stack
            key={question.id}
            style={{
              border: "1px solid gray",
              borderRadius: "5px",
              padding: "20px 10px",
            }}
          >
            <Collapse in={true}>
              <Box style={{ display: "flex" }}>
                <Question
                  questionId={question.id}
                  questionList={questionList}
                  setQuestionList={setQuestionList}
                  questionTitle={question.title}
                />
                <IconButton
                  style={{ width: "min-content" }}
                  onClick={() =>
                    setAnswerList([
                      ...answerList,
                      { id: uuidv4(), questionId: question.id, title: "", isRight: false },
                    ])
                  }
                >
                  <AddIcon />
                </IconButton>
              </Box>
              <AnswerList answerList={answerList} setAnswerList={setAnswerList} questionId={question.id} />
            </Collapse>
          </Stack>
        ))}
      </TransitionGroup>

      <IconButton
        style={{ width: "min-content" }}
        onClick={() =>
          setQuestionList([...questionList, { title: "", id: uuidv4() }])
        }
      >
        <AddIcon />
      </IconButton>
      
    </Stack>
  );
}
