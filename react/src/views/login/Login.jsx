import { useState } from "react";
import { Link } from "react-router-dom";
import { message, Form, Input, Button, Typography, Layout } from "antd";
import axiosClient from "../../axios-client";
import { useStateContext } from "../../components/context/ContextProvider";
import loginBackground from "../../assets/logo3.jpg";

const { Content } = Layout;
const { Title } = Typography;

export default function Login() {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const { setUser, setToken } = useStateContext();

    const onFinish = (values) => {
        setLoading(true);

        axiosClient
            .post("/login", values)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
                message.success("Signed in successfully!");
            })
            .catch((err) => {
                const error =
                    err.response?.data?.message ||
                    "An unexpected error occurred.";
                message.error(error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <Layout>
            <Content
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "100vh",
                    background: "#ffffff",
                }}
            >
                <div
                    style={{
                        flex: 1,
                        background: `url(${loginBackground})`,
                        backgroundSize: "100% 100%",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        height: "100vh",
                    }}
                ></div>
                <div
                    style={{
                        flex: 1,
                        padding: "20px",
                        maxWidth: "400px",
                        borderLeft: "1px solid #e0e0e0",
                        height: "100vh",
                        alignContent: "center",
                    }}
                >
                    <Title
                        level={4}
                        style={{ textAlign: "left", marginBottom: "30px" }}
                    >
                        Welcome!
                    </Title>
                    <Form
                        form={form}
                        name="login"
                        onFinish={onFinish}
                        initialValues={{
                            remember: true,
                        }}
                        size="large"
                        style={{ textAlign: "center" }}
                    >
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your email!",
                                },
                            ]}
                        >
                            <Input
                                size="large"
                                placeholder="Email Address"
                                style={{
                                    borderRadius: "10px",
                                    border: "1px solid #ccc", // Add border
                                    padding: "12px", // Add padding
                                }}
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your password!",
                                },
                            ]}
                        >
                            <Input.Password
                                size="large"
                                placeholder="Password"
                                style={{
                                    borderRadius: "10px",
                                    border: "1px solid #ccc", // Add border
                                    padding: "12px", // Add padding
                                }}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={loading}
                                style={{
                                    width: "100%",
                                    borderRadius: "10px",
                                    backgroundColor: "#1890ff", // Change button color
                                    borderColor: "#1890ff", // Change border color
                                }}
                            >
                                {loading ? "Signing in..." : "Sign In"}
                            </Button>
                        </Form.Item>
                    </Form>

                    <div style={{ textAlign: "center" }}>
                        <Link to="/signup">
                            Don&apos;t have an account? Sign Up
                        </Link>
                    </div>
                </div>
            </Content>
        </Layout>
    );
}
