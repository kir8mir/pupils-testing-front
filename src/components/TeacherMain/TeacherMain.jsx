import LogoutIcon from "@mui/icons-material/Logout";
import { Stack } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import _logOut from "../../utils/logOut";

export default function TeacherMain({ setIsLoggedIn }) {
  const logOut = () => {
    setIsLoggedIn(null);
    _logOut();
  };
  return (
    <Stack>
      <IconButton onClick={logOut}>
        <LogoutIcon />
      </IconButton>
      <div className="">HELLO TEACHER</div>
    </Stack>
  );
}
