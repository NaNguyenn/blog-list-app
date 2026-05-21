import { useState } from "react";
import loginService from "../services/login";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { setAuthToken } from "../services/api";
import { useUserActions } from "../store/user";
import { useNotificationActions } from "../store/notification";
import { saveUser } from "../services/persistentUser";
import { useField } from "../hooks/useField";
import { Box, Button, TextField } from "@mui/material";

const LoginForm = () => {
  const navigate = useNavigate();
  const { setUser } = useUserActions();
  const { showNotification } = useNotificationActions();
  const { reset: resetUsername, ...username } = useField("text");
  const { reset: resetPassword, ...password } = useField("password");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value,
      });
      saveUser(user);
      setAuthToken(user.token);
      setUser(user);
      resetUsername();
      resetPassword();
      showNotification({ message: "Logged in", type: "success" });
      navigate("/");
    } catch (exception) {
      showNotification({
        message: "Wrong username or password",
        type: "error",
      });
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "1rem",
        }}
      >
        <TextField
          {...username}
          name="Username"
          data-testid="username"
          label="Username"
          variant="standard"
        />
        <TextField
          {...password}
          name="Password"
          type="password"
          data-testid="password"
          label="Password"
          variant="standard"
        />
        <Button type="submit" variant="contained">
          login
        </Button>
      </Box>
    </form>
  );
};

export default LoginForm;
