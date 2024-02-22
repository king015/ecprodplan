import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../components/context/ContextProvider";
import axiosClient from "../axios-client";
import {
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Button,
    Box,
    TablePagination,
    styled,
} from "@mui/material";
import UserFormModal from "./UserForm";

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
    marginBottom: theme.spacing(2),
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(even)": {
        backgroundColor: theme.palette.action.hover,
    },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(1),
}));

export default function Logs() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const { setNotification } = useStateContext();
    const [openModal, setOpenModal] = useState(false);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    useEffect(() => {
        getUsers();
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const onDeleteClick = (user) => {
        if (!window.confirm("Are you sure you want to delete this user?")) {
            return;
        }
        axiosClient.delete(`/user/${user.id}`).then(() => {
            setNotification("User was successfully deleted");
            getUsers();
        });
    };

    const getUsers = () => {
        setLoading(true);
        axiosClient
            .get("/users")
            .then(({ data }) => {
                setLoading(false);
                setUsers(data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    return (
        <Box marginTop="100px">
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "16px",
                }}
            >
                <Typography variant="h4">Users</Typography>
                <Button variant="contained" onClick={handleOpenModal}>
                    Add new
                </Button>
            </div>
            <StyledTableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>ID</StyledTableCell>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell>Email</StyledTableCell>
                            <StyledTableCell>Create Date</StyledTableCell>
                            <StyledTableCell>Actions</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <StyledTableCell
                                    colSpan={5}
                                    align="center"
                                    style={{ padding: "16px" }}
                                >
                                    <CircularProgress />
                                </StyledTableCell>
                            </TableRow>
                        ) : users.length === 0 ? (
                            <TableRow>
                                <StyledTableCell
                                    colSpan={5}
                                    align="center"
                                    style={{ padding: "16px" }}
                                >
                                    <Typography variant="body1">
                                        No data found
                                    </Typography>
                                </StyledTableCell>
                            </TableRow>
                        ) : (
                            users
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                .map((u) => (
                                    <StyledTableRow key={u.id}>
                                        <StyledTableCell>
                                            {u.id}
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            {u.name}
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            {u.email}
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            {u.created_at}
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <Button
                                                variant="contained"
                                                component={Link}
                                                to={`/users/${u.id}`}
                                                className="btn-edit"
                                                style={{
                                                    marginRight: "8px",
                                                }}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant="contained"
                                                className="btn-delete"
                                                onClick={() => onDeleteClick(u)}
                                            >
                                                Delete
                                            </Button>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))
                        )}
                    </TableBody>
                </Table>
            </StyledTableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 15, 25]}
                component="div"
                count={users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

            <UserFormModal open={openModal} handleClose={handleCloseModal} />
        </Box>
    );
}
