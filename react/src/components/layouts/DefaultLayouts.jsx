import { useState, useEffect } from "react";
import { Layout, Menu, Typography, message, Modal } from "antd";
import {
    MenuOutlined,
    CloseOutlined,
    CalendarOutlined,
    ClockCircleOutlined,
    FundProjectionScreenOutlined,
    UserOutlined,
    FormOutlined,
    DesktopOutlined,
    LogoutOutlined,
} from "@ant-design/icons";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import axiosClient from "../../axios-client";
import { useStateContext } from "../context/ContextProvider";
import { drawerWidth } from "./const";
import "./style.css";

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;
const { Text } = Typography;

export default function DefaultLayouts() {
    const { user, token, setUser, setToken } = useStateContext();
    const [open, setOpen] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());
    // const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    const onLogout = (e) => {
        e.preventDefault();

        Modal.confirm({
            title: "Logout Confirmation",
            content: "Are you sure you want to logout?",
            okText: "Yes",
            cancelText: "No",
            onOk: () => {
                // Perform logout action
                axiosClient
                    .post("/logout")
                    .then(() => {
                        setUser({});
                        setToken(null);
                        message.success("Logged out successfully");
                    })
                    .catch(() => {})
                    .finally(() => {});

                message.loading("Logging out...");
            },
            onCancel: () => {},
        });
    };

    useEffect(() => {
        axiosClient.get("/user").then(({ data }) => {
            setUser(data);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!token) {
        return <Navigate to="/login" />;
    }

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider
                width={drawerWidth}
                theme="dark"
                collapsible
                collapsed={!open}
                onCollapse={handleDrawerToggle}
                collapsedWidth={0}
                trigger={null}
            >
                <div className="drawer-header">
                    <div className="user-info">
                        <Text strong className="user-name">
                            {user.name}
                        </Text>
                        <Text className="user-email">{user.email}</Text>
                    </div>
                </div>
                <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
                    <Menu.Item key="1" disabled>
                        <CalendarOutlined
                            style={{
                                backgroundColor: "#00008B",
                                padding: "7px",
                                borderRadius: "5px",
                                color: "#fff",
                            }}
                        />
                        <Text strong style={{ color: "#fff" }}>
                            {currentTime.toLocaleDateString("en-US", {
                                weekday: "short",
                                month: "short",
                                day: "2-digit",
                                year: "numeric",
                            })}
                        </Text>
                    </Menu.Item>
                    <Menu.Item key="2" disabled>
                        <ClockCircleOutlined
                            style={{
                                backgroundColor: "#00008B",
                                padding: "7px",
                                borderRadius: "5px",
                                color: "#fff",
                            }}
                        />
                        <Text strong style={{ color: "#fff" }}>
                            {currentTime.toLocaleTimeString()}
                        </Text>
                    </Menu.Item>

                    <Menu.Item
                        key="3"
                        icon={
                            <DesktopOutlined
                                style={{
                                    backgroundColor: "#00008B",
                                    padding: "7px",
                                    borderRadius: "5px",
                                }}
                            />
                        }
                        onClick={() => navigate("/dashboard")}
                    >
                        Dashboard
                    </Menu.Item>
                    <SubMenu
                        key="sub1"
                        icon={
                            <FundProjectionScreenOutlined
                                style={{
                                    backgroundColor: "#00008B",
                                    padding: "7px",
                                    borderRadius: "5px",
                                }}
                            />
                        }
                        title="Production Plan"
                    >
                        <Menu.Item
                            key="4"
                            onClick={() => navigate("/production-plan")}
                        >
                            Daily Plan
                        </Menu.Item>
                        <Menu.Item
                            key="5"
                            onClick={() => navigate("/finished-goods")}
                        >
                            Finished Goods
                        </Menu.Item>
                        <Menu.Item
                            key="6"
                            onClick={() => navigate("/work-in-process")}
                        >
                            WIP
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item
                        key="7"
                        icon={
                            <UserOutlined
                                style={{
                                    backgroundColor: "#00008B",
                                    padding: "7px",
                                    borderRadius: "5px",
                                }}
                            />
                        }
                        onClick={() => navigate("/users")}
                    >
                        Users
                    </Menu.Item>
                    <Menu.Item
                        key="8"
                        icon={
                            <FormOutlined
                                style={{
                                    backgroundColor: "#00008B",
                                    padding: "7px",
                                    borderRadius: "5px",
                                }}
                            />
                        }
                        onClick={() => navigate("/logs")}
                    >
                        Logs
                    </Menu.Item>

                    {open && (
                        <div className="logout-container" onClick={onLogout}>
                            <div className="logout-item">
                                <LogoutOutlined className="logout-icon" />
                                <span className="logout-text">Logout</span>
                            </div>
                        </div>
                    )}
                </Menu>

                {open && (
                    <>
                        <div className="version">
                            <span className="version-text">ECPPMS</span>
                            <span
                                className="version-text"
                                style={{
                                    background: "#000020",
                                    borderRadius: "6px",
                                    fontSize: "10px",
                                    boxShadow:
                                        "5px, 0, 12px rgba(0, 0, 0, .18)",
                                }}
                            >
                                v 1.0.2
                            </span>
                        </div>
                    </>
                )}
            </Sider>

            <Layout className="site-layout">
                <Header
                    className="site-layout-background"
                    style={{ padding: 0 }}
                >
                    {open ? (
                        <CloseOutlined
                            className="trigger"
                            onClick={handleDrawerToggle}
                        />
                    ) : (
                        <MenuOutlined
                            className="trigger"
                            onClick={handleDrawerToggle}
                        />
                    )}
                </Header>
                <Content
                    style={{
                        margin: "16px",
                        backgroundColor: "#f0f2f5",
                        padding: "24px",
                        borderRadius: "8px",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    }}
                >
                    <div
                        className="site-layout-background"
                        style={{
                            padding: "24px",
                            minHeight: "360px",
                            borderRadius: "8px",
                        }}
                    >
                        <Outlet />
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
}
