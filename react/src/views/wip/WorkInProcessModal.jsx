import { useState } from "react";
import PropTypes from "prop-types";
import { Modal, Form, Input, Select, Button, Row, Col, message } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import axiosClient from "../../axios-client";
import { customerOptions } from "./const";

const { Option } = Select;

const WorkInProcessModal = ({ open, handleClose }) => {
    const [form] = Form.useForm();

    const [formData, setFormData] = useState({
        customer: "",
        code: "",
        itemDescription: "",
        partNumber: "",
        boardProcess: [],
        foamProcess: [],
    });

    const [foamProcessQuantities, setFoamProcessQuantities] = useState({});
    const [boardProcessQuantities, setBoardProcessQuantities] = useState({});

    const handleChange = (value, name) => {
        // Ensure that value is an array
        const updatedValue = Array.isArray(value) ? value : [];

        const quantities = updatedValue.reduce((acc, item) => {
            acc[item] = 0;
            return acc;
        }, {});

        if (name === "foamProcess") {
            setFoamProcessQuantities(quantities);
        } else if (name === "boardProcess") {
            setBoardProcessQuantities(quantities);
        }

        setFormData((prevData) => ({
            ...prevData,
            [name]: updatedValue,
        }));
    };
    const handleQuantityChange = (value, name) => {
        if (name.startsWith("foam")) {
            setFoamProcessQuantities((prevQuantities) => ({
                ...prevQuantities,
                [name]: value,
            }));
        } else if (name.startsWith("board")) {
            setBoardProcessQuantities((prevQuantities) => ({
                ...prevQuantities,
                [name]: value,
            }));
        }
    };

    const handleSubmit = () => {
        form.validateFields().then((values) => {
            const token = localStorage.getItem("ACCESS_TOKEN");
            console.log("Token:", token); // Log the token to check if it's retrieved correctly

            const headers = {
                Authorization: `Bearer ${token}`,
            };
            console.log("Headers:", headers); // Log the headers to check if Authorization header is set correctly

            const data = {
                customer: values.customer,
                code: values.code || "",
                itemDescription: values.itemDescription || "",
                partNumber: values.partNumber || "",
                boardProcess: formData.boardProcess.map((process) => ({
                    name: process,
                    quantity: boardProcessQuantities[`${process}Quantity`] || 0,
                })),
                foamProcess: formData.foamProcess.map((process) => ({
                    name: process,
                    quantity: foamProcessQuantities[`${process}Quantity`] || 0,
                })),
            };

            axiosClient
                .post("/work_in_process", data, { headers })
                .then(() => {
                    message.success("Work in Process saved successfully");
                    handleClose();
                })
                .catch((error) => {
                    console.error("Error posting data:", error);
                    if (error.response) {
                        console.log("Response data:", error.response.data);
                        console.log("Response status:", error.response.status);
                        console.log(
                            "Response headers:",
                            error.response.headers
                        );
                    }
                    message.error("An error occurred while posting the data.");
                });
        });
    };

    const handleCancel = () => {
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
                    key="submit"
                    type="primary"
                    icon={<SaveOutlined />}
                    onClick={handleSubmit}
                >
                    Submit
                </Button>,
            ]}
            width={1300}
            height={1000}
        >
            <Form
                form={form}
                layout="vertical"
                initialValues={formData}
                onValuesChange={(changedValues, allValues) =>
                    setFormData(allValues)
                }
            >
                <Row gutter={24}>
                    <Col span={8}>
                        <Form.Item
                            label="Customer"
                            name="customer"
                            rules={[
                                {
                                    required: true,
                                    message: "Please select a customer",
                                },
                            ]}
                        >
                            <Select
                                placeholder="Select a customer"
                                onChange={(value) =>
                                    handleChange(value, "customer")
                                }
                            >
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

                        <Form.Item label="EP Code" name="code">
                            <Input
                                onChange={(e) =>
                                    handleChange(e.target.value, "code")
                                }
                            />
                        </Form.Item>
                        <Form.Item
                            label="Item Description"
                            name="itemDescription"
                        >
                            <Input
                                onChange={(e) =>
                                    handleChange(
                                        e.target.value,
                                        "itemDescription"
                                    )
                                }
                            />
                        </Form.Item>
                        <Form.Item label="Part Number" name="partNumber">
                            <Input
                                onChange={(e) =>
                                    handleChange(e.target.value, "partNumber")
                                }
                            />
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item label="Board Process" name="boardProcess">
                            <Select
                                mode="multiple"
                                placeholder="Select board processes"
                                onChange={(value) =>
                                    handleChange(value, "boardProcess")
                                }
                            >
                                <Option value="Creaser">Creaser</Option>
                                <Option value="Flexo Printing">
                                    Flexo Printing
                                </Option>
                                <Option value="Printer Slotter">
                                    Printer Slotter
                                </Option>
                                <Option value="Slotting">Slotting</Option>
                                <Option value="Clapper">Clapper</Option>
                                <Option value="Diecut">Diecut</Option>
                                <Option value="Stitching">Stitching</Option>
                                <Option value="Detach">Detach</Option>
                                <Option value="Gluing">Gluing</Option>
                                <Option value="Pre-Assembly">
                                    Pre-Assembly
                                </Option>
                                <Option value="Manual Slotting">
                                    Manual Slotting
                                </Option>
                                <Option value="Packing">Packing</Option>
                                <Option value="Pallet Assembly">
                                    Pallet Assembly
                                </Option>
                                <Option value="Manual Printing">
                                    Manual Printing
                                </Option>
                                <Option value="Manual Cutting">
                                    Manual Cutting
                                </Option>
                                <Option value="Laminating">Laminating</Option>
                                <Option value="Box Assembly">
                                    Box Assembly
                                </Option>
                            </Select>

                            {Object.entries(boardProcessQuantities).map(
                                ([item, quantity]) => (
                                    <Form.Item
                                        key={item}
                                        label={`${item} Quantity`}
                                        name={`${item}Quantity`}
                                    >
                                        <Input
                                            type="number"
                                            value={quantity}
                                            onChange={(e) =>
                                                handleQuantityChange(
                                                    e.target.value,
                                                    `${item}Quantity`
                                                )
                                            }
                                        />
                                    </Form.Item>
                                )
                            )}

                            {/* Render the total quantity if any item selected */}
                            <Form.Item label="Total Board Process Quantity">
                                <Input
                                    disabled
                                    value={formData.boardProcess.length}
                                />
                            </Form.Item>
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item label="Foam Process" name="foamProcess">
                            <Select
                                mode="multiple"
                                placeholder="Select foam processes"
                                onChange={(value) =>
                                    handleChange(value, "foamProcess")
                                }
                            >
                                <Option value="Manual Cutting">
                                    Manual Cutting
                                </Option>
                                <Option value="Diecut">Diecut</Option>
                                <Option value="Bandsaw">Bandsaw</Option>
                                <Option value="Skiving">Skiving</Option>
                                <Option value="Detach">Detach</Option>
                                <Option value="Heating Plate">
                                    Heating Plate
                                </Option>
                                <Option value="Hotmelt">Hotmelt</Option>
                                <Option value="Assembly Heating">
                                    Assembly Heating
                                </Option>
                                <Option value="Manual Printing">
                                    Manual Printing
                                </Option>
                                <Option value="Sealing">Sealing</Option>
                                <Option value="Packing">Packing</Option>
                            </Select>
                            {/* Render the generated number input fields */}
                            {Object.entries(foamProcessQuantities).map(
                                ([item, quantity]) => (
                                    <Form.Item
                                        key={item}
                                        label={`${item} Quantity`}
                                        name={`${item}Quantity`}
                                    >
                                        <Input
                                            type="number"
                                            value={quantity}
                                            onChange={(e) =>
                                                handleQuantityChange(
                                                    e.target.value,
                                                    `${item}Quantity`
                                                )
                                            }
                                        />
                                    </Form.Item>
                                )
                            )}

                            <Form.Item label="Total Foam Process Quantity">
                                <Input
                                    disabled
                                    value={formData.foamProcess.length}
                                />
                            </Form.Item>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};

WorkInProcessModal.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
};

export default WorkInProcessModal;
