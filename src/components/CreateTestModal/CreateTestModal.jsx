import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Stack, TextField } from "@mui/material";
import QuestionList from "../QuestionList/QuestionList";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import createTest from "../../utils/createTest";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "15px",
  maxHeight: "90vh",
  overflow: "scroll",
};

export default function CreateTestModal() {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [testTitle, setTestTitle] = React.useState("");
  const [questionList, setQuestionList] = React.useState([]);
  const [answerList, setAnswerList] = React.useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  async function handleClick() {
    await createTest(testTitle, questionList, answerList);

    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
      // eslint-disable-next-line no-restricted-globals
      location.reload();
      setOpen(false);
      clearTimeout(timeout);
    }, 5000);
  }

  return (
    <Stack>
      <Button variant="contained" onClick={handleOpen}>
        Створити Тест
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            id="standard-multiline-flexible"
            label="Назва Тесту"
            multiline
            maxRows={4}
            value={testTitle}
            onChange={(event) => {
              setTestTitle(event.target.value);
            }}
            variant="standard"
            style={{ width: "100%", marginBottom: "20px" }}
          />
          <QuestionList
            questionList={questionList}
            answerList={answerList}
            setQuestionList={setQuestionList}
            setAnswerList={setAnswerList}
          />
          <LoadingButton
            color="secondary"
            onClick={handleClick}
            loadingPosition="start"
            loading={loading}
            startIcon={<SaveIcon />}
            variant="contained"
          >
            <span>Зберегти</span>
          </LoadingButton>
        </Box>
      </Modal>
    </Stack>
  );
}
