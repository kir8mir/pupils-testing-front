import LogoutIcon from "@mui/icons-material/Logout";
import { Stack } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import _logOut from "../../utils/logOut";

export default function TeacherMain({setIsLoggedIn}) {
  const logOut = () => {
    setIsLoggedIn(null);
    _logOut();
  }
  return (
    <Stack>
      <div className="">HELLO TEACHER</div>
      <IconButton onClick={logOut}>
        <LogoutIcon />
      </IconButton>
    </Stack>
  );
}
