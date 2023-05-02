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
        padding="20px 50px"
        backgroundColor="rgba(128, 128, 128, 0.2)"
      >
        <Typography component="h1" variant="subtitle2">
          {`Привіт ${localStorage.getItem("name")}`}
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
