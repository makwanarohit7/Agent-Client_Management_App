import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState("");
  const navigate = useNavigate();
  const theme = createTheme();
  console.log(data);

  const handelLogin = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      username: username,
      password: password,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:5000/project/login/", requestOptions)
      .then((res) => {
        // console.log(res);
        if (res.status >= 400) {
          throw new Error("Unvaild Username and Password!");
        }
        return res.json();
      })
      .then(
        (data) => {
          setData(data);
          sessionStorage.setItem("Token", data);
          navigate("/dashboard");
        },
        (err) => {
          alert(err);
        }
      );
  };
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handelLogin}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                type={"text"}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                label="Username*"
                fullWidth
              />
              <TextField
                margin="normal"
                type={"password"}
                fullWidth
                label="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />

              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handelLogin}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  Don't have an account?
                  <Button
                    onClick={() => {
                      navigate("/singup");
                    }}
                  >
                    Sign Up
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default Login;
