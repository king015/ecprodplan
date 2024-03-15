import { useState } from "react";
import PropTypes from "prop-types";
import {
    Button,
    Modal,
    Form,
    Input,
    Select,
    DatePicker,
    Row,
    Col,
    message,
} from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { customerOptions } from "./const";
import axiosClient from "../../axios-client";

const { Option } = Select;

const FinishedGoodsModal = ({ open, handleClose }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleSubmit = () => {
        form.validateFields()
            .then((values) => {
                setLoading(true);
                const token = localStorage.getItem("ACCESS_TOKEN");

                if (!token) {
                    message.error(
                        "Token not found in localStorage. Please login."
                    );
                    return;
                }

                const headers = {
                    Authorization: `Bearer ${token}`,
                };

                axiosClient
                    .post("/finished_goods", values, { headers })
                    .then(() => {
                        message.success("Finished Goods posted successfully");
                        form.resetFields(); // Clear form fields on successful submission
                        handleClose();
                    })
                    .catch((error) => {
                        console.error("Error posting Finished Goods:", error);
                        if (error.response) {
                            console.log("Response data:", error.response.data);
                            console.log(
                                "Response status:",
                                error.response.status
                            );
                            console.log(
                                "Response headers:",
                                error.response.headers
                            );
                        }
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            })
            .catch((errorInfo) => {
                console.log("Validation failed:", errorInfo);
            });
    };

    const handleCancel = () => {
        form.resetFields(); // Clear form fields when modal is closed
        handleClose();
    };

    return (
        <Modal
            title="Add Finished Goods"
            visible={open}
            onCancel={handleCancel}
            footer={[
                <Button key="cancel" onClick={handleCancel}>
                    Cancel
                </Button>,
                <Button
                    icon={<SaveOutlined />}
                    key="submit"
                    type="primary"
                    onClick={handleSubmit}
                    loading={loading}
                >
                    Submit
                </Button>,
            ]}
            width={900}
        >
            <Form
                form={form}
                layout="vertical"
                initialValues={{
                    customer: "",
                    code: "",
                    itemDescription: "",
                    partNumber: "",
                    location: "",
                    beginning_inventory: "",
                    beginning_date: null,
                    ending_inventory: "",
                    ending_date: null,
                    fg_in: "",
                    fg_out: "",
                }}
            >
                <Row gutter={[16, 0]}>
                    {/* Left Column */}
                    <Col span={12}>
                        <Form.Item
                            label="EP Code"
                            name="code"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input EP Code",
                                },
                            ]}
                        >
                            <Input style={{ height: "35px", width: "100%" }} />
                        </Form.Item>

                        <Form.Item
                            label="Customer"
                            name="customer"
                            rules={[
                                {
                                    required: true,
                                    message: "Please select customer",
                                },
                            ]}
                        >
                            <Select style={{ height: "35px", width: "100%" }}>
                                {customerOptions.map((option) => (
                                    <Option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Item Description"
                            name="itemDescription"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input Item Description",
                                },
                            ]}
                        >
                            <Input style={{ height: "35px", width: "100%" }} />
                        </Form.Item>

                        <Form.Item
                            label="Part Number"
                            name="partNumber"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input Part Number",
                                },
                            ]}
                        >
                            <Input style={{ height: "35px", width: "100%" }} />
                        </Form.Item>

                        <Form.Item
                            label="Location"
                            name="location"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input Location",
                                },
                            ]}
                        >
                            <Input style={{ height: "35px", width: "100%" }} />
                        </Form.Item>

                        <Form.Item
                            label="Beginning Inventory"
                            name="beginning_inventory"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input Beginning Inventory",
                                },
                            ]}
                        >
                            <Input
                                style={{ height: "35px", width: "100%" }}
                                type="number"
                            />
                        </Form.Item>
                    </Col>

                    {/* Right Column */}
                    <Col span={12}>
                        <Form.Item
                            label="Beginning Inventory Date"
                            name="beginning_date"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Please select Beginning Inventory Date",
                                },
                            ]}
                        >
                            <DatePicker
                                style={{ height: "35px", width: "100%" }}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Ending Inventory"
                            name="ending_inventory"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input Ending Inventory",
                                },
                            ]}
                        >
                            <Input
                                style={{ height: "35px", width: "100%" }}
                                type="number"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Ending Inventory Date"
                            name="ending_date"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Please select Ending Inventory Date",
                                },
                            ]}
                        >
                            <DatePicker
                                style={{ height: "35px", width: "100%" }}
                            />
                        </Form.Item>

                        <Form.Item
                            label="FG In"
                            name="fg_in"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input FG In",
                                },
                            ]}
                        >
                            <Input
                                style={{ height: "35px", width: "100%" }}
                                type="number"
                            />
                        </Form.Item>

                        <Form.Item
                            label="FG Out"
                            name="fg_out"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input FG Out",
                                },
                            ]}
                        >
                            <Input
                                style={{ height: "35px", width: "100%" }}
                                type="number"
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};

FinishedGoodsModal.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
};

export default FinishedGoodsModal;
