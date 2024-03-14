import { Modal, Button, Input, Form, message } from "antd";
import PropTypes from "prop-types";
import { SaveOutlined } from "@ant-design/icons";
import axiosClient from "../../axios-client";
import { useState } from "react";

const UserForm = ({ visible, handleCancel }) => {
    const [loading, setLoading] = useState(false);

    const onFinish = (values) => {
        setLoading(true);
        axiosClient
            .post("/users", values)
            .then((response) => {
                console.log("User created successfully:", response.data);
                message.success("User created successfully");
                handleCancel();
            })
            .catch((error) => {
                console.error("Error creating user:", error);
                if (error.response && error.response.data) {
                    const { errors } = error.response.data;
                    Object.values(errors).forEach((errorMsg) => {
                        message.error(errorMsg);
                    });
                } else {
                    message.error("An error occurred while creating the user.");
                }
            })
            .finally(() => {
                setLoading(false); // Reset loading state when request is completed
            });
    };

    return (
        <Modal
            title="User Form"
            visible={visible}
            onCancel={handleCancel}
            footer={[
                <Button key="back" onClick={handleCancel}>
                    Cancel
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    htmlType="submit"
                    form="userForm"
                    icon={<SaveOutlined />}
                    loading={loading}
                    onClick={() => {
                        document
                            .getElementById("userForm")
                            .dispatchEvent(
                                new Event("submit", { cancelable: true })
                            );
                    }}
                >
                    Submit
                </Button>,
            ]}
            centered
            destroyOnClose
            maskClosable={false}
        >
            <Form
                id="userForm"
                onFinish={onFinish}
                labelCol={{ span: 9 }}
                wrapperCol={{ span: 15 }}
            >
                <Form.Item
                    label="Full Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Please input your full name!",
                        },
                    ]}
                >
                    <Input />
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
                            message: "Please enter a valid email address!",
                        },
                    ]}
                >
                    <Input />
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
                    <Input.Password style={{ height: "auto" }} />
                </Form.Item>
                <Form.Item
                    label="Re-Type Password"
                    name="password_confirmation"
                    dependencies={["password"]}
                    rules={[
                        {
                            required: true,
                            message: "Please confirm your password!",
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (
                                    !value ||
                                    getFieldValue("password") === value
                                ) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error(
                                        "The two passwords that you entered do not match!"
                                    )
                                );
                            },
                        }),
                    ]}
                >
                    <Input.Password style={{ height: "auto" }} />
                </Form.Item>
            </Form>
        </Modal>
    );
};

UserForm.propTypes = {
    visible: PropTypes.bool.isRequired,
    handleCancel: PropTypes.func.isRequired,
};

export default UserForm;
