import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./main.css";
import bg from "./components/images/mainBG.jpg";
import SignIn from "./components/SignIn/SignIn";
import {  useState } from "react";
import TeacherMain from "./components/TeacherMain/TeacherMain";
import PupilMain from "./components/PupilMain/PupilMain";
import Canvas from "./components/Canvas/Canvas";
import {  Switch } from "@mui/material";
import { Box } from "@mui/system";

function App() {
  const [userRole, setUserRole] = useState(localStorage.getItem("accessToken"));
  const [canvasOn, setCanvasOn] = useState(false);


  return (
    <div className="App">
      <img className="bg" src={bg} alt="background" />
      <Box
        sx={{ position: "absolute", bottom: "3%", right: "3%", zIndex: "1000" }}
      >
        {`Чернетка ${canvasOn ? "увімкнена" : "вимкнена"}`}
        <Switch
          onChange={(event) => setCanvasOn(event.target.checked)}
          color="warning"
        />
      </Box>

      <Canvas canvasOn={canvasOn} />
      {!userRole ? (
        <SignIn setIsLoggedIn={setUserRole} />
      ) : localStorage.getItem("role") === "teacher" ? (
        <TeacherMain
          setIsLoggedIn={setUserRole}
        />
      ) : (
        <PupilMain
          setIsLoggedIn={setUserRole}
        />
      )}
    </div>
  );
}

export default App;
