import { Box, Collapse, Stack } from "@mui/material";
import Answer from "../Answer/Answer";
import React from "react";
import { TransitionGroup } from "react-transition-group";

export default function AnswerList({ answerList, questionId, setAnswerList }) {
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
          gap: "20px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {answerList.map((answer) => {
          if (answer.questionId === questionId) {
            return (
              <div key={answer.id}>
                <Collapse in={true}>
                  <Box style={{ display: "flex" }}>
                    <Answer
                      setAnswerList={setAnswerList}
                      answerList={answerList}
                      answerId={answer.id}
                      answerTitle={answer.title}
                      isRight={answer.isRight}
                    />
                  </Box>
                </Collapse>
              </div>
            );
          }
          return null;
        })}
      </TransitionGroup>
    </Stack>
  );
}
