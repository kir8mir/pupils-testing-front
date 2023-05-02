import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { getAllPupilAnswers } from "../../utils/getAllPupilAnswers";

export default function TestCard({ title, testId }) {
  const [isDone, setIsDone] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const allPupilAnswers = await getAllPupilAnswers();
      if (
        allPupilAnswers.data.some(
          (answer) =>
            answer.testId === testId &&
            answer.userId === +localStorage.getItem("userId")
        )
      ) {
        setIsDone(true);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDone]);

  return (
    <Card
      sx={{
        maxWidth: 300,
        minWidth: 300,
        backgroundColor:
          localStorage.getItem("role") === "pupil"
            ? isDone
              ? "green"
              : "orange"
            : "",
      }}
    >
      <CardActionArea>
        <CardContent>
          <Typography
            sx={{ maxWidth: 200, textOverflow: "ellipsis", overflow: "hidden" }}
            maxWidth={"300px"}
            noWrap
            gutterBottom
            variant="h5"
            component="div"
          >
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
