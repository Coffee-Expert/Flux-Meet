import React, { useContext, useState } from "react";
import "../styles/LoginRegister.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { TextField, Button, Typography, Box, Container } from "@mui/material";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { register } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const inputs = { username, email, password };
    await register(inputs);
  };

  return (
    <Container component="main" maxWidth="sm" className="formContainer">
      <Box className="formWrapper">
        <div className="title">Register</div>
        <Typography component="p" variant="subtitle1" className="subtitle">
          Create an account to get started.
        </Typography>
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
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            className="textField"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
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
          <div className="sizedbox"></div>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="btn-black"
          >
            Register
          </Button>
          <div className="sizedbox"></div>

          <Typography className="formFooter">
            Already registered? <Link to={"/login"}>Login</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
