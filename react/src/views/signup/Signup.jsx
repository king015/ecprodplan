import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Typography, Form, Input, Button, Alert, Card, Space } from "antd";
import {
    UserOutlined,
    MailOutlined,
    LockOutlined,
    LoadingOutlined,
} from "@ant-design/icons";
import axiosClient from "../../axios-client";
import { useStateContext } from "../../components/context/ContextProvider";
import "./Signup.css";

const { Title } = Typography;

const Signup = () => {
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);
    const { setUser, setToken } = useStateContext();

    const onFinish = (values) => {
        setLoading(true);
        const payload = {
            name: values.name,
            email: values.email,
            password: values.password,
            password_confirmation: values.password_confirmation,
        };
        axiosClient
            .post("/signup", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(
                        Object.entries(response.data.errors)
                            .map(([value]) => `${value}`)
                            .join(", ")
                    );
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="signup-container">
            <Card className="signup-card">
                <Title level={3} className="signup-title">
                    Create an Account
                </Title>
                {errors && (
                    <Alert
                        message={errors}
                        type="error"
                        className="signup-alert"
                    />
                )}
                <Form
                    name="signup"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    layout="vertical"
                    className="signup-form"
                >
                    <Form.Item
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your name!",
                            },
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined />}
                            placeholder="Full Name"
                            className="signup-input"
                        />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your email!",
                            },
                        ]}
                    >
                        <Input
                            prefix={<MailOutlined />}
                            type="email"
                            placeholder="Email Address"
                            className="signup-input"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your password!",
                            },
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="Password"
                            className="signup-input"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password_confirmation"
                        rules={[
                            {
                                required: true,
                                message: "Please confirm your password!",
                            },
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="Confirm Password"
                            className="signup-input"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Space
                            direction="vertical"
                            size="middle"
                            style={{ width: "100%" }}
                        >
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={loading}
                                icon={loading ? <LoadingOutlined /> : null}
                                className="signup-button"
                            >
                                {loading ? "Signing up..." : "Signup"}
                            </Button>
                            <Typography.Paragraph className="signup-link">
                                Already registered?{" "}
                                <RouterLink to="/login">Sign in</RouterLink>
                            </Typography.Paragraph>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default Signup;
