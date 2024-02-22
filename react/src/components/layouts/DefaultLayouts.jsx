import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { Link, Navigate, Outlet } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import { List, Menu, MenuItem } from "@mui/material";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../../axios-client";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
    ({ theme, open }) => ({
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
    })
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
}));

export default function DefaultLayouts() {
    const { user, token, setUser, setToken } = useStateContext();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleMenuToggle = () => {
        setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
    };

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
        handleMenuToggle();
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMenuToggle();
    };

    const onLogout = (e) => {
        e.preventDefault();

        axiosClient.post("/logout").then(() => {
            setUser({});
            setToken(null);
        });
    };

    React.useEffect(() => {
        axiosClient.get("/user").then(({ data }) => {
            setUser(data);
        });
    }, []);

    if (!token) {
        return <Navigate to="/login" />;
    }

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar
                    sx={{ display: "flex", justifyContent: "space-between" }}
                >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{ mr: 2, ...(open && { display: "none" }) }}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="body1" noWrap sx={{ mr: 2 }}>
                            {user.name}
                        </Typography>
                        <IconButton
                            color="inherit"
                            onClick={handleMenuOpen}
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            edge="end"
                        >
                            {isMenuOpen ? (
                                <ExpandLessOutlinedIcon />
                            ) : (
                                <ExpandMoreOutlinedIcon />
                            )}
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                        >
                            <MenuItem onClick={onLogout}>Logout</MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>

            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <Typography variant="h6" noWrap>
                        Production Plan
                    </Typography>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === "ltr" ? (
                            <ChevronLeftIcon />
                        ) : (
                            <ChevronRightIcon />
                        )}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    <ListItem button component={Link} to="/dashboard">
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                    <Divider />
                    <ListItem button component={Link} to="/production-plan">
                        <ListItemIcon>
                            <PsychologyAltIcon />
                        </ListItemIcon>
                        <ListItemText primary="Production Plan" />
                    </ListItem>
                    <Divider />
                    <ListItem button component={Link} to="/finished-goods">
                        <ListItemIcon>
                            <AssignmentTurnedInIcon />
                        </ListItemIcon>
                        <ListItemText primary="Finished Goods" />
                    </ListItem>
                    <Divider />
                    <ListItem button component={Link} to="/work-in-process">
                        <ListItemIcon>
                            <EventRepeatIcon />
                        </ListItemIcon>
                        <ListItemText primary="Work-in-Process" />
                    </ListItem>
                    <Divider />
                    <ListItem button component={Link} to="/users">
                        <ListItemIcon>
                            <PeopleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Users" />
                    </ListItem>
                    <Divider />
                    <ListItem button component={Link} to="/logs">
                        <ListItemIcon>
                            <SaveAsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Logs" />
                    </ListItem>
                    <Divider />
                </List>
            </Drawer>
            <Main open={open}>
                <Outlet />
            </Main>
        </Box>
    );
}
