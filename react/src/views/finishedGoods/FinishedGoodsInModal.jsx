import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Modal, Form, Input, DatePicker, Button, message } from "antd";
import axiosClient from "../../axios-client";
import moment from "moment";

const FinishedGoodsInModal = ({ visible, handleClose, selectedItemId }) => {
    const [loading, setLoading] = useState(false);
    const [initialValues, setInitialValues] = useState(null);

    useEffect(() => {
        if (visible && selectedItemId) {
            setLoading(true);
            axiosClient
                .get(`/finished_goods/${selectedItemId}`)
                .then((response) => {
                    const { quantity, date, remarks } = response.data;
                    setInitialValues({ quantity, date: moment(date), remarks });
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
        // Perform any validation here if needed
        const token = localStorage.getItem("ACCESS_TOKEN");

        if (!token) {
            message.error("Token not found in localStorage. Please login.");
            return;
        }

        const headers = {
            Authorization: `Bearer ${token}`,
        };

        axiosClient
            .get("/finished_goods")
            .then((response) => {
                const beginningInventory = response.data.beginning_inventory;
                const newQuantity = initialValues.quantity;
                const updatedBeginningInventory =
                    beginningInventory + newQuantity;

                // Update beginning inventory first
                return axiosClient.post(
                    "/beginning_inventory",
                    { beginning_inventory: updatedBeginningInventory },
                    { headers }
                );
            })
            .then(() => {
                // Then update finished goods quantity
                return axiosClient.post(
                    `/finished_goods/${selectedItemId}/update_quantity`,
                    {
                        quantity: initialValues.quantity,
                        date: initialValues.date,
                        remarks: initialValues.remarks,
                    },
                    { headers }
                );
            })
            .then(() => {
                // Handle success response
                message.success("Beginning inventory updated successfully.");
                handleClose(); // Close the modal
            })
            .catch(() => {
                // Handle error response
                message.error(
                    "Failed to update beginning inventory or quantity. Please try again."
                );
            });
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
                    <Form.Item label="Quantity" name="Beginning_inventory">
                        <Input
                            type="number"
                            style={{ width: "100%", height: 40 }}
                        />
                    </Form.Item>
                    <Form.Item label="Date" name="beginning_date">
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
