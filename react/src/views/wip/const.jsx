import { TableCell, TableContainer, TableRow, styled } from "@mui/material";

export const customerOptions = [
    { value: "Customer 1", label: "Customer 1" },
    { value: "Customer 2", label: "Customer 2" },
    { value: "Customer 3", label: "Customer 3" },
    // Add more options as needed
];

export const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
    marginBottom: theme.spacing(2),
}));

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    borderBottom: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1),
    borderRight: `2px solid ${theme.palette.divider}`,
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    borderBottom: `1px solid ${theme.palette.divider}`,
    "&:nth-of-type(even)": {
        backgroundColor: theme.palette.action.hover,
    },
}));
