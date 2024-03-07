import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import PsychologyIcon from "@mui/icons-material/Psychology";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { Link, Navigate, Outlet } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";

import {
    FolderViewOutlined,
    FileDoneOutlined,
    SyncOutlined,
    DesktopOutlined,
} from "@ant-design/icons";

import {
    List,
    Menu,
    MenuItem,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from "@mui/material";
import { useStateContext } from "../context/ContextProvider";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import axiosClient from "../../axios-client";
import {
    AppBar,
    Footer,
    Main,
    MainContentBox,
    StyledListItemIcon,
    drawerWidth,
} from "./const";
import { message } from "antd";

export default function DefaultLayouts() {
    const { user, token, setUser, setToken } = useStateContext();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [currentTime, setCurrentTime] = React.useState(new Date());
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const handleDrawerToggle = () => {
        setOpen(!open);
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
        setLoading(true);

        axiosClient
            .post("/logout")
            .then(() => {
                setUser({});
                setToken(null);

                message.success("Logged out successfully");
            })
            .catch(() => {})
            .finally(() => {
                setLoading(false);
            });

        message.loading("Logging out...");
    };

    React.useEffect(() => {
        axiosClient.get("/user").then(({ data }) => {
            setUser(data);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!token) {
        return <Navigate to="/login" />;
    }

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                open={open}
                sx={{ bgcolor: "#1976d2", boxShadow: "none" }}
            >
                <Toolbar
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "0 20px",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            transition: "transform 0.3s",
                            transform: open
                                ? "translateX(100px)"
                                : "translateX(0)",
                        }}
                    >
                        <Typography
                            variant="h6"
                            noWrap
                            sx={{
                                color: "#fff",
                                flexGrow: 1,
                                paddingRight: open ? "16px" : "0",
                                padding: "15px",
                                transition: "margin-left 0.3s",
                            }}
                        >
                            ECPDP
                        </Typography>
                        <IconButton
                            color="inherit"
                            aria-label="toggle drawer"
                            onClick={handleDrawerToggle}
                            edge="start"
                            sx={{
                                mr: 2,
                                transition: "margin-right 0.3s",
                                marginRight: open ? "0" : "-16px",
                            }}
                        >
                            {open ? <ChevronLeftIcon /> : <MenuIcon />}
                        </IconButton>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography
                            variant="body1"
                            noWrap
                            sx={{
                                mr: 2,
                                textTransform: "uppercase",
                                color: "#fff",
                            }}
                        >
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

            {loading && <div>Loading...</div>}
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    transition: "width 0.3s",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between", // Arrange items vertically with space in-between
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                        backgroundColor: "#2E2E2E",
                        color: "#FFFFFF",
                        marginTop: "64px",
                        height: `calc(100% - 64px)`,
                        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <div>
                    <List>
                        <ListItem>
                            <StyledListItemIcon>
                                <CalendarMonthOutlinedIcon />
                            </StyledListItemIcon>
                            <ListItemText
                                primary={`${currentTime.toLocaleDateString(
                                    "en-US",
                                    {
                                        weekday: "short",
                                        month: "short",
                                        day: "2-digit",
                                        year: "numeric",
                                    }
                                )}`}
                            />
                        </ListItem>
                        <Divider
                            sx={{
                                backgroundColor: "#ffffff",
                                opacity: 0.5,
                            }}
                        />
                        <ListItem>
                            <StyledListItemIcon>
                                <AccessTimeOutlinedIcon />
                            </StyledListItemIcon>
                            <ListItemText
                                primary={`${currentTime.toLocaleTimeString()}`}
                            />
                        </ListItem>
                        <Divider
                            sx={{
                                backgroundColor: "#ffffff",
                                opacity: 0.5,
                            }}
                        />
                        <ListItem
                            button
                            component={Link}
                            to="/dashboard"
                            sx={{
                                transition: "0.3s",
                                "&:hover": {
                                    paddingLeft: "32px",
                                },
                                "&:hover .MuiListItemIcon-root": {
                                    marginLeft: "8px",
                                },
                            }}
                        >
                            <StyledListItemIcon sx={{ transition: "0.3s" }}>
                                <DashboardIcon />
                            </StyledListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </ListItem>
                        <Divider
                            sx={{
                                backgroundColor: "#ffffff",
                                opacity: 0.5,
                            }}
                        />

                        <Accordion
                            sx={{
                                backgroundColor: "#212121",
                                borderRadius: "8px",
                                boxShadow: "none",
                            }}
                        >
                            <AccordionSummary
                                expandIcon={
                                    <ExpandMoreOutlinedIcon
                                        sx={{ color: "#fefefe" }}
                                    />
                                }
                                aria-controls="finished-goods-content"
                                id="finished-goods-header"
                                sx={{
                                    backgroundColor: "#343434",
                                    borderBottom: "1px solid #616161",
                                }}
                            >
                                <StyledListItemIcon>
                                    <PsychologyIcon />
                                </StyledListItemIcon>
                                <ListItemText
                                    primary="Production Plan"
                                    sx={{ color: "#fefefe" }}
                                />
                            </AccordionSummary>
                            <AccordionDetails
                                sx={{ padding: 0, color: "#fefefe" }}
                            >
                                <List sx={{ backgroundColor: "#212121" }}>
                                    <ListItem
                                        button
                                        component={Link}
                                        to="/production-plan"
                                        sx={{
                                            paddingLeft: "48px",
                                        }}
                                    >
                                        <StyledListItemIcon>
                                            <FolderViewOutlined />
                                        </StyledListItemIcon>
                                        <ListItemText primary="Overview" />
                                    </ListItem>
                                    <Divider
                                        sx={{
                                            backgroundColor: "#ffffff",
                                            opacity: 0.5,
                                        }}
                                    />
                                    <ListItem
                                        button
                                        component={Link}
                                        to="/finished-goods"
                                        sx={{
                                            paddingLeft: "48px",
                                        }}
                                    >
                                        <StyledListItemIcon>
                                            <FileDoneOutlined />
                                        </StyledListItemIcon>
                                        <ListItemText primary="Finished Goods" />
                                    </ListItem>
                                    <Divider
                                        sx={{
                                            backgroundColor: "#ffffff",
                                            opacity: 0.5,
                                        }}
                                    />
                                    <ListItem
                                        button
                                        component={Link}
                                        to="/work-in-process"
                                        sx={{
                                            paddingLeft: "48px",
                                        }}
                                    >
                                        <StyledListItemIcon>
                                            <SyncOutlined />{" "}
                                        </StyledListItemIcon>
                                        <ListItemText primary="WIP" />
                                    </ListItem>
                                </List>
                            </AccordionDetails>
                        </Accordion>

                        <Divider
                            sx={{
                                backgroundColor: "#ffffff",
                                opacity: 0.5,
                            }}
                        />

                        <ListItem
                            button
                            component={Link}
                            to="/users"
                            sx={{
                                transition: "0.3s",
                                "&:hover": {
                                    paddingLeft: "32px",
                                },
                                "&:hover .MuiListItemIcon-root": {
                                    marginLeft: "8px",
                                },
                            }}
                        >
                            <StyledListItemIcon>
                                <PeopleIcon />
                            </StyledListItemIcon>
                            <ListItemText primary="Users" />
                        </ListItem>
                        <Divider
                            sx={{
                                backgroundColor: "#ffffff",
                                opacity: 0.5,
                            }}
                        />

                        <ListItem
                            button
                            component={Link}
                            to="/logs"
                            sx={{
                                transition: "0.3s",
                                "&:hover": {
                                    paddingLeft: "32px",
                                },
                                "&:hover .MuiListItemIcon-root": {
                                    marginLeft: "8px",
                                },
                            }}
                        >
                            <StyledListItemIcon>
                                <SaveAsIcon />
                            </StyledListItemIcon>
                            <ListItemText primary="Logs" />
                        </ListItem>

                        <Divider
                            sx={{
                                backgroundColor: "#ffffff",
                                opacity: 0.5,
                            }}
                        />
                    </List>
                </div>
                <div
                    style={{
                        backgroundColor: "#1976d2",
                        padding: "10px",
                        textAlign: "center",
                        fontSize: "14px",
                        position: "absolute",
                        bottom: "20px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        boxShadow: "0px 8px 16px rgba(25, 118, 210, 0.2)",
                        zIndex: 999,
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <span
                        style={{
                            display: "flex",
                            alignItems: "center",
                            marginRight: "auto",
                            fontWeight: "bold",
                        }}
                    >
                        <DesktopOutlined style={{ marginRight: "5px" }} />
                        ECPPS
                    </span>

                    <span
                        style={{
                            fontSize: "14px", // Increase font size for sharper appearance
                            color: "#ffffff",
                            fontWeight: "bold", // Adjust font weight for sharper appearance
                            marginRight: "10px",
                        }}
                    >
                        v 1.0.0
                    </span>
                </div>
            </Drawer>
            <Main open={open}>
                <MainContentBox>
                    <Outlet />
                </MainContentBox>
                <Footer>
                    <Typography variant="body2" align="center">
                        &copy; ECPPS {new Date().getFullYear()}
                    </Typography>
                </Footer>
            </Main>
        </Box>
    );
}
