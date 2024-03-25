import { useEffect } from "react";
import { Form, Input, Button, Typography } from "antd";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";

const { Title } = Typography;

const Register = () => {
    const [form] = Form.useForm();
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const onFinish = () => {
        post(route("register"));
    };

    return (
        <GuestLayout>
            <Head title="Register" />
            <div style={{ maxWidth: 400, margin: "auto" }}>
                <Title level={2}>Register</Title>
                <Form
                    form={form}
                    initialValues={data}
                    onFinish={onFinish}
                    layout="vertical"
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Please input your name!",
                            },
                        ]}
                    >
                        <Input
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            autoComplete="name"
                            autoFocus
                        />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Please input your email!",
                            },
                            {
                                type: "email",
                                message: "Please enter a valid email!",
                            },
                        ]}
                    >
                        <Input
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            autoComplete="username"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your password!",
                            },
                        ]}
                    >
                        <Input.Password
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            autoComplete="new-password"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Confirm Password"
                        name="password_confirmation"
                        rules={[
                            {
                                required: true,
                                message: "Please confirm your password!",
                            },
                            {
                                validator: (_, value) => {
                                    if (!value || data.password === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        "The two passwords do not match!"
                                    );
                                },
                            },
                        ]}
                    >
                        <Input.Password
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                            autoComplete="new-password"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Link href={route("login")}>Already registered?</Link>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={processing}
                            disabled={processing}
                        >
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </GuestLayout>
    );
};

export default Register;
