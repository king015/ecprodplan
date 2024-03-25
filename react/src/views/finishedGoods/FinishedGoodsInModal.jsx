import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Modal, Form, Input, DatePicker, Button, message } from "antd";
import axiosClient from "../../axios-client";
import moment from "moment";

const FinishedGoodsInModal = ({ visible, handleClose, selectedItemId }) => {
    const [loading, setLoading] = useState(false);
    const [initialValues, setInitialValues] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        if (visible && selectedItemId) {
            setLoading(true);
            axiosClient
                .get(`/finished_goods/${selectedItemId}`)
                .then((response) => {
                    const { quantity, date, remarks } = response.data;
                    setInitialValues({
                        fg_in: quantity,
                        date: moment(date),
                        remarks,
                    });
                    setLoading(false);
                })
                .catch(() => {
                    message.error(
                        "Failed to fetch item details. Please try again."
                    );
                    setLoading(false);
                });
        }
    }, [visible, selectedItemId]);

    const handleFinish = () => {
        const token = localStorage.getItem("ACCESS_TOKEN");

        if (!token) {
            message.error("Token not found in localStorage. Please login.");
            return;
        }

        const headers = {
            Authorization: `Bearer ${token}`,
        };

        const { fg_in } = form.getFieldsValue(); // Get the value of fg_in from the form
        const submittedQuantity = parseInt(fg_in, 10); // Parse the submitted quantity

        // Fetch current beginning inventory
        axiosClient
            .get(`/finished_goods/${selectedItemId}`)
            .then((response) => {
                const currentBeginningInventory =
                    response.data.beginning_inventory || 0;

                // Calculate updated ending inventory
                const updatedEndingInventory =
                    currentBeginningInventory + submittedQuantity;

                // Update beginning inventory with submitted quantity (fg_in)
                return axiosClient
                    .put(
                        `/finished_goods/${selectedItemId}/beginning_inventory`,
                        { beginning_inventory: submittedQuantity },
                        { headers }
                    )
                    .then(() => {
                        // Update ending inventory with updated value
                        return axiosClient.put(
                            `/finished_goods/${selectedItemId}/ending_inventory`,
                            { ending_inventory: updatedEndingInventory },
                            { headers }
                        );
                    });
            })
            .then(() => {
                // Handle success
                message.success("Inventory updated successfully.");
                handleClose(); // Close the modal
            })
            .catch(() => {
                // Handle error
                message.error("Failed to update inventory. Please try again.");
            });
    };

    const handleQuantityChange = (e) => {
        const { value } = e.target;
        setInitialValues({ ...initialValues, fg_in: value });
    };

    return (
        <Modal
            title="Edit Finished Goods"
            visible={visible}
            onCancel={handleClose}
            footer={[
                <Button key="cancel" onClick={handleClose}>
                    Cancel
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    onClick={handleFinish}
                    loading={loading}
                >
                    Submit
                </Button>,
            ]}
        >
            {initialValues && (
                <Form layout="vertical" initialValues={initialValues}>
                    <Form.Item label="Quantity" name="fg_in">
                        <Input
                            type="number"
                            style={{ width: "100%", height: 40 }}
                            value={initialValues.fg_in}
                            onChange={(e) =>
                                handleQuantityChange(e.target.value)
                            }
                        />
                    </Form.Item>
                    <Form.Item label="Date" name="date">
                        <DatePicker
                            style={{
                                width: "100%",
                                height: 40,
                                justifyContentL: "center",
                                alignContent: "center",
                                alignItems: "center",
                            }}
                        />
                    </Form.Item>
                    <Form.Item label="Remarks" name="remarks">
                        <Input.TextArea style={{ width: "100%", height: 50 }} />
                    </Form.Item>
                </Form>
            )}
        </Modal>
    );
};

FinishedGoodsInModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    selectedItemId: PropTypes.number, // Ensure it's a number or null
};

export default FinishedGoodsInModal;
