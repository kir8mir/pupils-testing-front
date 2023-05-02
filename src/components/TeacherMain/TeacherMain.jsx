import { Stack } from "@mui/material";
import Header from "../Header/Header";
import TestList from "../TestList/TestList";
import { useState } from "react";

export default function TeacherMain({
  setIsLoggedIn,
}) {
  
  const [rerenderMain, setRerenderMain] = useState(0);

  const rerender = () => {
    setRerenderMain(rerenderMain + 1);
  };


  return (
    <Stack gap={"50px"}>
      <Header
        setIsLoggedIn={setIsLoggedIn}
        rerender={rerender}
      />
      <TestList rerender={rerender}/>
    </Stack>
  );
}
