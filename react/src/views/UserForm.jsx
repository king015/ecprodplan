import { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useStateContext } from "../components/context/ContextProvider.jsx";
import axiosClient from "../axios-client.js";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

export default function UserFormModal({ open, handleClose, id }) {
    const { setNotification } = useStateContext();
    const [user, setUser] = useState({
        id: null,
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (id) {
            setLoading(true);
            axiosClient
                .get(`/users/${id}`)
                .then(({ data }) => {
                    setLoading(false);
                    setUser(data);
                })
                .catch(() => {
                    setLoading(false);
                });
        }
    }, [id]);

    const onSubmit = (ev) => {
        ev.preventDefault();
        if (user.id) {
            axiosClient
                .put(`/users/${user.id}`, user)
                .then(() => {
                    setNotification("User was successfully updated");
                    handleClose();
                })
                .catch((err) => {
                    handleErrors(err);
                });
        } else {
            axiosClient
                .post("/users", user)
                .then(() => {
                    setNotification("User was successfully created");
                    handleClose();
                })
                .catch((err) => {
                    handleErrors(err);
                });
        }
    };

    const handleErrors = (err) => {
        const response = err.response;
        if (response && response.status === 422) {
            const errors = response.data.errors;
            const errorMessage = Object.keys(errors)
                .map((key) => errors[key][0])
                .join("\n");
            showErrorAlert(errorMessage);
        }
    };

    const showErrorAlert = (message) => {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: message,
            confirmButtonText: "OK",
            position: "top-end",
            customClass: {
                popup: "error-alert-popup",
                content: "error-alert-content",
            },
            width: 300, // Adjust the width as needed
        });
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="user-form-modal-title"
            aria-describedby="user-form-modal-description"
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Box
                sx={{
                    backgroundColor: "white",
                    borderRadius: 4,
                    boxShadow: 24,
                    padding: 4,
                    maxWidth: 400,
                    width: "100%",
                }}
            >
                {user.id && (
                    <Typography variant="h5" align="center">
                        Update User: {user.name}
                    </Typography>
                )}
                {!user.id && (
                    <Typography variant="h5" align="center">
                        New User
                    </Typography>
                )}
                {loading && (
                    <Typography variant="body1" align="center">
                        Loading...
                    </Typography>
                )}
                {!loading && (
                    <form onSubmit={onSubmit}>
                        <TextField
                            value={user.name}
                            onChange={(ev) =>
                                setUser({ ...user, name: ev.target.value })
                            }
                            label="Name"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            value={user.email}
                            onChange={(ev) =>
                                setUser({ ...user, email: ev.target.value })
                            }
                            label="Email"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            type="password"
                            onChange={(ev) =>
                                setUser({ ...user, password: ev.target.value })
                            }
                            label="Password"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            type="password"
                            onChange={(ev) =>
                                setUser({
                                    ...user,
                                    password_confirmation: ev.target.value,
                                })
                            }
                            label="Password Confirmation"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                        />
                        <Box mt={2} textAlign="center">
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                Save
                            </Button>
                        </Box>
                    </form>
                )}
            </Box>
        </Modal>
    );
}

UserFormModal.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    id: PropTypes.string, // Assuming id is a string, adjust if it's a different type
};
