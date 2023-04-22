import LogoutIcon from "@mui/icons-material/Logout";
import { Stack } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import _logOut from "../../utils/logOut";

export default function PupilMain({setIsLoggedIn}) {
  const logOut = () => {
    setIsLoggedIn(null);
    _logOut();
  }
  return (
    <Stack>
      <div className="">HELLO PUPIL</div>
      <IconButton onClick={logOut}>
        <LogoutIcon />
      </IconButton>
    </Stack>
  );
}
