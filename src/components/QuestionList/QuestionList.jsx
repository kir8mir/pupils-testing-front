import { Box, Collapse, IconButton, Stack } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import Question from "../Question/Question";
import AnswerList from "../AnswerList/AnswerList";
import { v4 as uuidv4 } from "uuid";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export default function QuestionList({
  setAnswerList,
  setQuestionList,
  answerList,
  questionList,
  removeQuestion,
}) {


  return (
    <Stack
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Stack
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
              <Box key={`${'box'}question.id`} style={{ display: "flex" }}>
                <Question
                  questionId={question.id}
                  questionList={questionList}
                  setQuestionList={setQuestionList}
                  questionTitle={question.title}
                  key={`${'q'}question.id`}
                />
                <IconButton
                  style={{ width: "min-content", height: "min-content" }}
                  onClick={() =>
                    setAnswerList([
                      ...answerList,
                      {
                        id: uuidv4(),
                        questionId: question.id,
                        title: "",
                        isRight: false,
                      },
                    ])
                  }
                >
                  <AddIcon />
                </IconButton>
                <IconButton
                  style={{ width: "min-content", height: "min-content" }}
                  onClick={() => removeQuestion(question.id)}
                >
                  <DeleteForeverIcon />
                </IconButton>
              </Box>
              <AnswerList
                answerList={answerList}
                setAnswerList={setAnswerList}
                questionId={question.id}
                questionList={questionList}
                key={`${'a'}question.id`}
              />
            </Collapse>
          </Stack>
        ))}
      </Stack>

      <IconButton
        style={{ width: "min-content", marginTop: "20px" }}
        onClick={() =>
          setQuestionList([
            ...questionList,
            {
              title: "",
              id: uuidv4(),
              isSingleAnswer: false,
            },
          ])
        }
      >
        <AddIcon />
      </IconButton>
    </Stack>
  );
}
