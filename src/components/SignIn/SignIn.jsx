import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { signInTeacher, signInPupil } from "../../utils/signIn";
import { ButtonGroup, Stack, Switch } from "@mui/material";
import { Fingerprint } from "@mui/icons-material";
import { createMyProfile } from "../../utils/createMyProfile";
import { borderRadius, padding } from "@mui/system";

const theme = createTheme();

export default function SignIn({ setIsLoggedIn }) {
  const [pupilOrTeacher, setPupilOrTeacher] = useState(true);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    pupilOrTeacher
      ? setIsLoggedIn(
          await signInPupil(data.get("email"), data.get("password"))
        )
      : setIsLoggedIn(
          await signInTeacher(data.get("email"), data.get("password"))
        );
  };

  const createProfile = async (event) => {
    event.preventDefault();
    createMyProfile(pupilOrTeacher, { name, password });
  };

  const pupilOrTeacherSwitcher = (event) => {
    setPupilOrTeacher(event.target.checked);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: 'red',
            padding: '20px',
            borderRadius: '20px'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "white" }}>
            <Fingerprint color="success" />
          </Avatar>
          <Typography component="h1" variant="h5">
            Авторизація
          </Typography>
          <Box
            component="form"
            display="flex"
            alignItems="center"
            flexDirection="column"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Імʼя"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(event) => setName(event.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Пароль"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(event) => setPassword(event.target.value)}
            />
            <Stack flexDirection="row" alignItems="center">
              <Typography component="h1" variant="h6">
                Я вчитель
              </Typography>
              <Switch
                onChange={pupilOrTeacherSwitcher}
                defaultChecked
                color="default"
              />
              <Typography component="h1" variant="h6">
                Я учень
              </Typography>
            </Stack>

            <ButtonGroup
              disableElevation
              variant="contained"
              aria-label="Disabled elevation buttons"
            >
              <Button type="submit" fullWidth sx={{ mt: 3, mb: 2 }}>
                Увійти
              </Button>
              <Button onClick={createProfile} fullWidth sx={{ mt: 3, mb: 2 }}>
                Створити профіль
              </Button>
            </ButtonGroup>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
