import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Modal, Form, Input, Button, message } from "antd";
import axiosClient from "../../axios-client";
import { ToTopOutlined } from "@ant-design/icons";

const FinishedGoodsEditModal = ({ visible, handleClose, selectedItemId }) => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const [initialValues, setInitialValues] = useState({});

    useEffect(() => {
        if (visible && selectedItemId) {
            setLoading(true);
            axiosClient
                .get(`/finished_goods/${selectedItemId}`)
                .then((response) => {
                    console.log("API response:", response.data);
                    const data = response.data.data;
                    setInitialValues(data || {});
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching item details:", error);
                    message.error(
                        "Failed to fetch item details. Please try again."
                    );
                    setLoading(false);
                });
        }
    }, [visible, selectedItemId]);

    const handleFinish = () => {
        form.validateFields()
            .then((values) => {
                setLoading(true);
                axiosClient
                    .put(`/finished_goods/${selectedItemId}`, values)
                    .then(() => {
                        message.success("Edit successful.");
                        handleClose();
                    })
                    .catch((error) => {
                        console.error("Error updating item:", error);
                        message.error(
                            "Failed to update item. Please try again."
                        );
                        setLoading(false);
                    });
            })
            .catch((error) => {
                console.error("Validation failed:", error);
            });
    };

    const handleCancel = () => {
        handleClose();
    };

    return (
        <Modal
            title="Edit Finished Goods"
            visible={visible}
            onCancel={handleCancel}
            footer={[
                <Button key="cancel" onClick={handleCancel}>
                    Cancel
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    icon={<ToTopOutlined />}
                    onClick={handleFinish}
                    loading={loading}
                >
                    Submit
                </Button>,
            ]}
        >
            <Form form={form} layout="vertical" initialValues={initialValues}>
                <Form.Item
                    label="EP Code"
                    name="code"
                    rules={[
                        { required: true, message: "Please input the EP Code" },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Customer"
                    name="customer"
                    rules={[
                        {
                            required: true,
                            message: "Please input the Customer",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Item Description"
                    name="itemDescription"
                    rules={[
                        {
                            required: true,
                            message: "Please input the Item Description",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Part Number"
                    name="partNumber"
                    rules={[
                        {
                            required: true,
                            message: "Please input the Part Number",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Location"
                    name="location"
                    rules={[
                        {
                            required: true,
                            message: "Please input the Location",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Beginning Inventory"
                    name="beginning_inventory"
                    rules={[
                        {
                            required: true,
                            message: "Please input the Beginning Inventory",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Date"
                    name="beginning_date"
                    rules={[
                        { required: true, message: "Please input the Date" },
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

FinishedGoodsEditModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    selectedItemId: PropTypes.string.isRequired,
};

export default FinishedGoodsEditModal;
