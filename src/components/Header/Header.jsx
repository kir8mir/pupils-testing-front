import { IconButton, Stack, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import _logOut from "../../utils/logOut";
import CreateTestModal from "../CreateTestModal/CreateTestModal";

export default function Header({ setIsLoggedIn }) {
  const logOut = () => {
    setIsLoggedIn(null);
    _logOut();
  };

  return (
    <div className="header">
      <Stack
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        paddingX="2rem"
      >
        <Typography component="h1" variant="subtitle2">
          {`HELLO ${localStorage.getItem("role")}`}
        </Typography>

        {localStorage.getItem("role") === "teacher" ? (
          <CreateTestModal />
        ) : (
          <Typography component="h2" variant="h3">
            Тести
          </Typography>
        )}
        <IconButton onClick={logOut}>
          <LogoutIcon />
        </IconButton>
      </Stack>
    </div>
  );
}
