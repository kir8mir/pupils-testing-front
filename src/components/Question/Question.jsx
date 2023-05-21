import { Box, Stack, Switch, TextField, Typography } from "@mui/material";
import React, { useRef } from "react";

export default function Question({
  questionId,
  questionList,
  setQuestionList,
  questionTitle,
}) {
  const haveSingleAnswer = useRef(false);

  const setQuestionTitle = (event) => {
    setQuestionList(
      questionList.map((question) => {
        if (question.id === questionId) {
          return {
            ...question,
            title: event.target.value,
          };
        }
        return question;
      })
    );
  };

  const setIsSingleQuestion = (event) => {
    setQuestionList(
      questionList.map((question) => {
        if (question.id === questionId) {
          return {
            ...question,
            isSingleAnswer: event.target.checked,
          };
        }
        return question;
      })
    );
  };

  console.log("haveSingleAnswer", haveSingleAnswer.current);
  return (
    <Stack style={{ width: "100%" }}>
      <TextField
        style={{ width: "100%", marginBottom: "20px", display: "flex" }}
        id="outlined-multiline-flexible"
        label="Питання"
        value={questionTitle}
        onChange={setQuestionTitle}
        multiline
        variant="standard"
      />
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography id="outlined-multiline-flexible" variant="standard">
          Це питання має одну правильну відповідь?
        </Typography>
        <Switch onChange={setIsSingleQuestion} color="secondary" />
      </Box>
    </Stack>
  );
}
