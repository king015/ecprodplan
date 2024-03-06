import { Button, Modal, Form, Input, Select, DatePicker, Row, Col } from "antd";
import PropTypes from "prop-types";
import axiosClient from "../../axios-client";
import { customerOptions } from "./const";
import { SaveOutlined } from "@ant-design/icons";

const { Option } = Select;

export default function FinishedGoodsModal({ open, handleClose }) {
    const [form] = Form.useForm();

    const handleSubmit = () => {
        form.validateFields()
            .then((values) => {
                axiosClient
                    .post("/finished_goods", values)
                    .then(() => {
                        console.log("Data posted successfully");
                        handleClose();
                    })
                    .catch((error) => {
                        console.error("Error posting data:", error);
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
                    });
            })
            .catch((errorInfo) => {
                console.log("Validation failed:", errorInfo);
            });
    };

    return (
        <Modal
            title="Add Finished Goods"
            visible={open}
            onCancel={handleClose}
            footer={[
                <Button key="cancel" onClick={handleClose}>
                    Cancel
                </Button>,
                <Button
                    icon={<SaveOutlined />}
                    key="submit"
                    type="primary"
                    onClick={handleSubmit}
                >
                    Save
                </Button>,
            ]}
            width={1000}
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
                <Row gutter={[16, 16]}>
                    <Col span={12}>
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
                            <Select style={{ width: "100%" }}>
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
                    </Col>
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
                            <Input style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
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
                            <Input style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
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
                            <Input style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
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
                            <Input style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
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
                            <Input style={{ width: "100%" }} type="number" />
                        </Form.Item>
                    </Col>
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
                                style={{ width: "100%" }}
                                inputStyle={{ width: "100%" }}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
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
                            <Input style={{ width: "100%" }} type="number" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Ending Inventory Date"
                            name="ending_date"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Please select Beginning Inventory Date",
                                },
                            ]}
                        >
                            <DatePicker
                                style={{ width: "100%" }}
                                inputStyle={{ width: "100%" }}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
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
                            <Input style={{ width: "100%" }} type="number" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
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
                            <Input style={{ width: "100%" }} type="number" />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
}

FinishedGoodsModal.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
};
