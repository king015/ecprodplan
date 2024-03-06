import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import ListItemIcon from "@mui/material/ListItemIcon";

export const drawerWidth = 250;

export const Main = styled("main", {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
    [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(2),
    },
}));

export const AppBar = styled(MuiAppBar)(({ theme }) => ({
    transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
}));

export const MainContentBox = styled(Box)(({ theme, open }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexGrow: 1,
    backgroundColor: "#f5f5f5",
    padding: theme.spacing(3),
    margin: "5em 0",
    marginLeft: open ? `${drawerWidth}px` : 0,
    transition: theme.transitions.create(["margin", "padding"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    borderRadius: theme.spacing(1),
    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
    [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(2),
    },
}));

export const Footer = styled("footer")(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(0),
    marginTop: "auto",
    textAlign: "center",
}));

export const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    borderRadius: "10%",
    marginRight: theme.spacing(2),
    minWidth: "unset",
    padding: theme.spacing(0.75),
    color: theme.palette.primary.contrastText,
}));
