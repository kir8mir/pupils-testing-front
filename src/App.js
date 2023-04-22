import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import SignIn from "./components/SignIn/SignIn";
import { useEffect, useState } from "react";
import TeacherMain from "./components/TeacherMain/TeacherMain";
import PupilMain from "./components/PupilMain/PupilMain";

function App() {
  const [userRole, setUserRole] = useState(localStorage.getItem("accessToken"));

  useEffect(() => {
    console.log("isLoggedIn", userRole);
  }, [userRole]);
  return (
    <div className="App">
      {!userRole ? (
        <SignIn setIsLoggedIn={setUserRole} />
      ) : userRole === "teacher" ? (
        <TeacherMain setIsLoggedIn={setUserRole} />
      ) : (
        <PupilMain setIsLoggedIn={setUserRole} />
      )}
    </div>
  );
}

export default App;
