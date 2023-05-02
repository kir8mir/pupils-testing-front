import {
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Typography,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import bg from "../images/bg.jpg";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { sendPupilAnswer } from "../../utils/sendPupilAnswer";
import { getAllPupilAnswers } from "../../utils/getAllPupilAnswers";
import Grade from "../Grade/Grade";
import { removeTest } from "../../utils/removeTest";
import getAllPupils from "../../utils/getAllPupils";

export default function SingleTest({ setSingleTestModal, singleTestModal }) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    border: "2px solid #000",
    boxShadow: 24,
    p: 3,
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    textAlign: "center",
    gap: "30px",
  };
  const [open, setOpen] = React.useState(true);
  const [selectedPupil, setSelectedPupil] = React.useState("");
  const [allPupil, setAllPupil] = React.useState([]);
  const handleChange = (event) => {
    setSelectedPupil(event.target.value);
  };

  const pupilAnswers = useRef([]);
  const isPupilAnswersLoaded = useRef(false);
  const [grade, setGrade] = useState(null);
  const allPupilAnswers = useRef([]);

  const isPupil = localStorage.getItem("role") === "pupil";

  const [alreadyAnswered, setAlreadyAnswered] = useState([]);
  const setAnswer = (id) => {
    pupilAnswers.current = pupilAnswers.current.map((answer) => {
      if (answer.answerId === id) {
        return { ...answer, isChecked: !answer.isChecked };
      } else {
        return answer;
      }
    });
  };

  const calculateAnswers = () => {
    if (!alreadyAnswered.length) return;
    let numberOfRightsAnswers = 0;
    let numberOfOthersAnswers = 0;

    singleTestModal.quizzes.forEach((rightQuiz) =>
      alreadyAnswered[0].answersIntoQuizzes
        .filter((alreadyQuizzed) => alreadyQuizzed.quizId === rightQuiz.id)
        .forEach((pupilAnswer) => {
          const thisAnswer = rightQuiz.answers.find(
            (rightAnswer) => rightAnswer.id === pupilAnswer.answerId
          );

          if (thisAnswer.is_right) numberOfOthersAnswers++;

          return pupilAnswer.isChecked === thisAnswer.is_right &&
            thisAnswer.is_right
            ? numberOfRightsAnswers++
            : null;
        })
    );

    setGrade({
      rightAnswers: numberOfRightsAnswers,
      totalRightAnswers: numberOfOthersAnswers,
      percent: ((100 / numberOfOthersAnswers) * numberOfRightsAnswers).toFixed(
        0
      ),
    });
  };

  const sendPupilAnswers = async () => {
    setOpen(false);

    const pupilAnswer = {
      testId: +localStorage.getItem("currentTestId"),
      userId: +localStorage.getItem("userId"),
      answersIntoQuizzes: pupilAnswers.current,
    };

    await sendPupilAnswer(pupilAnswer);

    // eslint-disable-next-line no-restricted-globals
    location.reload();
  };

  const deleteTest = () => {
    removeTest(localStorage.getItem("currentTestId"));
    setOpen(false);
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  };

  useEffect(() => {
    calculateAnswers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alreadyAnswered]);

  useEffect(() => {
    (async () => {
      setAllPupil(await getAllPupils());
      allPupilAnswers.current = (await getAllPupilAnswers()).data;
      setAlreadyAnswered(
        allPupilAnswers.current.filter((pupilAnswer) => {
          const currentUser = !selectedPupil
            ? +localStorage.getItem("userId")
            : selectedPupil;
          return (
            pupilAnswer.testId === +localStorage.getItem("currentTestId") &&
            pupilAnswer.userId === currentUser
          );
        })
      );
    })();
  }, [selectedPupil]);

  return (
    <Modal
      open={open}
      onClose={() => setSingleTestModal(null)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ zIndex: "100" }}
    >
      <Box sx={style}>
        <Typography
          sx={{ borderBottom: "3px dashed gray" }}
          id="modal-modal-title"
          variant="h4"
          component="h2"
        >
          {singleTestModal.title}
        </Typography>

        {!isPupil && (
          <Box sx={{ width: "100%", backgroundColor: "white" }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Учні</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedPupil}
                label="Age"
                onChange={handleChange}
              >
                {allPupil.map((pupil) => (
                  <MenuItem value={pupil.id}>{pupil.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        )}

        {singleTestModal.quizzes.map((quiz, index) => (
          <Stack
            key={quiz.id}
            sx={{
              border: "5px solid gray",
              width: "100%",
              gap: "10px",
              padding: "15px 10px",
              borderRadius: "5px",
            }}
          >
            <Typography
              sx={{ borderBottom: "3px dashed gray", padding: "10px 0" }}
              id="modal-modal-title"
              variant="h5"
              component="h2"
            >
              {quiz.title}
            </Typography>
            {quiz.answers.map((answer, aIndex) => {
              if (!isPupilAnswersLoaded.current) {
                pupilAnswers.current.push({
                  quizId: quiz.id,
                  answerId: answer.id,
                  isChecked: false,
                });

                if (
                  index === singleTestModal.quizzes.length - 1 &&
                  aIndex === quiz.answers.length - 1
                ) {
                  isPupilAnswersLoaded.current = true;
                }
              }

              return (
                <Box
                  key={answer.id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                    sx={
                      answer.is_right &&
                      !isPupil &&
                      !selectedPupil && { color: "green" }
                    }
                    style={{
                      padding: "1px 5px",
                      width: "100%",
                      borderRadius: "10px",
                      backgroundColor:
                        alreadyAnswered.some((element) =>
                          element.answersIntoQuizzes.some(
                            (aAnswer) =>
                              aAnswer.answerId === answer.id &&
                              aAnswer.isChecked &&
                              answer.is_right
                          )
                        ) &&
                        (isPupil || selectedPupil)
                          ? "green"
                          : "",
                      color:
                        alreadyAnswered.some((element) =>
                          element.answersIntoQuizzes.some(
                            (aAnswer) =>
                              aAnswer.answerId === answer.id &&
                              !aAnswer.isChecked &&
                              answer.is_right
                          )
                        ) &&
                        (isPupil || selectedPupil)
                          ? "green"
                          : "",
                      border:
                        alreadyAnswered.some((element) =>
                          element.answersIntoQuizzes.some(
                            (aAnswer) =>
                              aAnswer.answerId === answer.id &&
                              aAnswer.isChecked &&
                              !answer.is_right
                          )
                        ) &&
                        (isPupil || selectedPupil)
                          ? "3px solid red"
                          : "",
                    }}
                  >
                    {`- ${answer.title}`}
                  </Typography>
                  {isPupil && !alreadyAnswered.length && (
                    <Checkbox
                      checked={pupilAnswers.current.some(
                        (pupilAnswer) =>
                          pupilAnswer.answerId === answer.id &&
                          pupilAnswer.isChecked
                      )}
                      onClick={() => setAnswer(answer.id)}
                      color="success"
                    />
                  )}
                </Box>
              );
            })}
          </Stack>
        ))}

        {isPupil && !alreadyAnswered.length && (
          <LoadingButton
            color="secondary"
            onClick={sendPupilAnswers}
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="contained"
          >
            <span>Зберегти</span>
          </LoadingButton>
        )}

        <Box
          sx={{
            width: "100%",
            backgroundColor: "rgba(128, 128, 128, 0.2)",
            padding: "10px 20px",
            borderRadius: "8px",
          }}
        >
          {" "}
          {grade && (
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
            >{`${grade.rightAnswers} / ${grade.totalRightAnswers}`}</Typography>
          )}
          {grade && (
            <Box sx={{ width: "100%" }}>
              <Grade value={grade.percent} />
            </Box>
          )}
        </Box>
        {!isPupil && (
          <LoadingButton
            color="secondary"
            onClick={deleteTest}
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="contained"
          >
            <span>Видалити</span>
          </LoadingButton>
        )}
      </Box>
    </Modal>
  );
}
