import { Stack } from "@mui/material";
import Header from "../Header/Header";
import TestList from "../TestList/TestList";
export default function PupilMain({ setIsLoggedIn }) {
  return (
    <Stack gap={"50px"}>
      <Header setIsLoggedIn={setIsLoggedIn} />
      <TestList />
    </Stack>
  );
}
