import { Checkbox, Stack, TextField } from "@mui/material";

export default function Answer({
  setAnswerList,
  answerList,
  answerId,
  answerTitle,
  isRight
}) {
  const setAnswerTitle = (event) => {
    setAnswerList(
      answerList.map((answer) => {
        if (answer.id === answerId) {
          return { ...answer, title: event.target.value };
        }
        return answer;
      })
    );
  };

  const setIsRight = (event) => {
    setAnswerList(
      answerList.map((answer) => {
        if (answer.id === answerId) {
          return { ...answer, isRight: !isRight };
        }
        return answer;
      })
    );
  }

  return (
    <Stack style={{ width: "100%", display: "flex", flexDirection: "row" }}>
      <TextField
        style={{ width: "100%" }}
        id="outlined-multiline-flexible"
        label="Відповідь"
        value={answerTitle}
        onChange={setAnswerTitle}
        multiline
      />
      <Checkbox checked={isRight} onClick={setIsRight} color="success" />
    </Stack>
  );
}
