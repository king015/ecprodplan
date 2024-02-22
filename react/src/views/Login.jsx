import { Link as RouterLink } from "react-router-dom";
import { createRef, useState } from "react";
import { useStateContext } from "../components/context/ContextProvider";
import axiosClient from "../axios-client";
import {
    Box,
    Button,
    TextField,
    Typography,
    Alert,
    Link,
    Paper,
    Container,
} from "@mui/material";

export default function Login() {
    const emailRef = createRef();
    const passwordRef = createRef();
    const { setUser, setToken } = useStateContext();
    const [message, setMessage] = useState(null);

    const onSubmit = (ev) => {
        ev.preventDefault();

        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };
        axiosClient
            .post("/login", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    setMessage(response.data.message);
                } else {
                    setMessage("An unexpected error occurred.");
                }
            });
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Paper
                    elevation={6}
                    sx={{
                        my: { xs: 3, md: 6 },
                        p: { xs: 2, md: 3 },
                        width: "100%",
                        maxWidth: 400,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
                        Sign in
                    </Typography>

                    {message && (
                        <Alert severity="error" sx={{ width: "100%" }}>
                            {message}
                        </Alert>
                    )}

                    <Box component="form" onSubmit={onSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            inputRef={emailRef}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            inputRef={passwordRef}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Box textAlign="center">
                            <Link
                                component={RouterLink}
                                to="/signup"
                                variant="body2"
                            >
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
}
