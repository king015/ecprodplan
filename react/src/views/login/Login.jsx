import { useState } from "react";
import { Link } from "react-router-dom";
import { message, Form, Input, Button, Typography, Layout } from "antd";
import axiosClient from "../../axios-client";
import { useStateContext } from "../../components/context/ContextProvider";
// import loginBackground from "../../assets/logo3.jpg";
import "./Login.css";

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
            <Content className="login-content">
                <div className="login-background"></div>
                <div className="login-form-container">
                    <Title level={4} className="login-title">
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
                        className="login-form"
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
                                className="login-input"
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
                                className="login-input"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={loading}
                                className="login-button"
                            >
                                {loading ? "Signing in..." : "Sign In"}
                            </Button>
                        </Form.Item>
                    </Form>
                    <div className="login-signup-link">
                        <Link to="/signup">
                            Don&apos;t have an account? Sign Up
                        </Link>
                    </div>
                </div>
            </Content>
        </Layout>
    );
}
