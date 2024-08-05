import React, { useState } from "react";
import "../styles/LoginRegister.css";

import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { TextField, Button, Typography, Box, Container } from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const inputs = { email, password };
    await login(inputs);
  };

  return (
    <Container component="main" maxWidth="sm" className="formContainer">
      <Box className="formWrapper">
        <div className="title">Login</div>

        <Typography component="p" variant="subtitle1" className="subtitle">
          Enter your email and password to access your account.
        </Typography>
        <div className="sizedbox"></div>

        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          className="formContent"
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            placeholder="m@example.com"
            onChange={(e) => setEmail(e.target.value)}
            className="textField"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="textField"
          />
          <Typography component="p" variant="body2" className="forgotPassword">
            Forgot your password?
          </Typography>
          <div className="sizedbox"></div>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="btn-bllack"
          >
            Sign in
          </Button>
          <div className="sizedbox"></div>

          <Typography className="formFooter">
            Don't have an account? <Link to={"/register"}>Register</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
