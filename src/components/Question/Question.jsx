import { Stack, TextField } from "@mui/material";
import React from "react";

export default function Question({
  questionId,
  questionList,
  setQuestionList,
  questionTitle,
}) {

  const setQuestionTitle = (event) => {
    setQuestionList(
      questionList.map((question) => {
        if (question.id === questionId) {
          return { ...question, title: event.target.value };
        }
        return question;
      })
    );
  };
  return (
    <Stack style={{ width: "100%" }}>
      <TextField
        style={{ width: "100%", marginBottom: '20px', display: 'flex', }}
        id="outlined-multiline-flexible"
        label="Питання"
        value={questionTitle}
        onChange={setQuestionTitle}
        multiline
        variant="standard"
      />
    </Stack>
  );
}