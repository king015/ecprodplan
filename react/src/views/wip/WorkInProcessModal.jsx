import { useState } from "react";
import PropTypes from "prop-types";
import { Modal, Form, Input, Select, Button, Row, Col, message } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import axiosClient from "../../axios-client";
import { customerOptions } from "./const";

const { Option } = Select;

const WorkInProcessModal = ({ open, handleClose }) => {
    const [form] = Form.useForm();
    const { setWorkInProcess } = useState();
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
        let updatedValue;

        if (Array.isArray(value) && value.length > 0) {
            const quantities = value.reduce((acc, item) => {
                acc[item] = 0;
                return acc;
            }, {});

            if (name === "foamProcess") {
                setFoamProcessQuantities(quantities);
            } else if (name === "boardProcess") {
                setBoardProcessQuantities(quantities);
            }

            updatedValue = value;
        } else {
            if (name === "foamProcess") {
                setFoamProcessQuantities({});
            } else if (name === "boardProcess") {
                setBoardProcessQuantities({});
            }
            updatedValue = value;
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
            const data = {
                ...values,
                ...formData,
            };

            axiosClient
                .post("/combine_data", data)
                .then((data) => {
                    setWorkInProcess(data.production_plan);
                    message.success("Data saved successfully");
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

                        if (error.response.data.errors) {
                            const { errors } = error.response.data;
                            Object.values(errors).forEach((errorMsg) => {
                                message.error(errorMsg);
                            });
                        }
                    } else {
                        message.error(
                            "An error occurred while posting the data."
                        );
                    }
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
            Height={1000}
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
                            name="item_description"
                        >
                            <Input
                                onChange={(e) =>
                                    handleChange(
                                        e.target.value,
                                        "item_description"
                                    )
                                }
                            />
                        </Form.Item>
                        <Form.Item label="Part Number" name="part_number">
                            {" "}
                            <Input
                                onChange={(e) =>
                                    handleChange(e.target.value, "part_number")
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
                                <Option value="Creaser" name="creaser">
                                    Creaser
                                </Option>
                                <Option
                                    value="Flexo Printing"
                                    name="flexo_printing"
                                >
                                    Flexo Printing
                                </Option>
                                <Option
                                    value="Printer Slotter"
                                    name="printer_slotter"
                                >
                                    Printer Slotter
                                </Option>
                                <Option value="Slotting" name="slotting">
                                    Slotting
                                </Option>
                                <Option value="Clapper" name="clapper">
                                    Clapper
                                </Option>
                                <Option value="Diecut" name="diecut">
                                    Diecut
                                </Option>
                                <Option value="Stitching" name="stitching">
                                    Stitching
                                </Option>
                                <Option value="Detach" name="detach">
                                    Detach
                                </Option>
                                <Option value="Gluing" name="gluing">
                                    Gluing
                                </Option>
                                <Option
                                    value="Pre-Assembly"
                                    name="pre_assembly"
                                >
                                    Pre-Assembly
                                </Option>
                                <Option
                                    value="Manual Slotting"
                                    name="manual_slotting"
                                >
                                    Manual Slotting
                                </Option>
                                <Option value="Packing" name="packing">
                                    Packing
                                </Option>
                                <Option
                                    value="Pallet Assembly"
                                    name="pallet_assembly"
                                >
                                    Pallet Assembly
                                </Option>
                                <Option
                                    value="Manual Printing"
                                    name="manual_printing"
                                >
                                    Manual Printing
                                </Option>
                                <Option
                                    value="Manual Cutting"
                                    name="manual_cutting"
                                >
                                    Manual Cutting
                                </Option>
                                <Option value="Laminating" name="laminating">
                                    Laminating
                                </Option>
                                <Option
                                    value="Box Assembly"
                                    name="box_assembly"
                                >
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
                                <Input disabled value={formData.boardProcess} />
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
                                <Option
                                    value="Manual Cutting"
                                    name="fp_manual_cutting"
                                >
                                    Manual Cutting
                                </Option>
                                <Option value="Diecut" name="fp_diecut">
                                    Diecut
                                </Option>
                                <Option value="Bandsaw" name="bandsaw">
                                    Bandsaw
                                </Option>
                                <Option value="Skiving" name="skiving">
                                    Skiving
                                </Option>
                                <Option value="Detach" name="fp_detach">
                                    Detach
                                </Option>
                                <Option
                                    value="Heating Plate"
                                    name="heating_plate"
                                >
                                    Heating Plate
                                </Option>
                                <Option value="Hotmelt" name="hotmelt">
                                    Hotmelt
                                </Option>
                                <Option
                                    value="Assembly Heating"
                                    name="assembly_heating"
                                >
                                    Assembly Heating
                                </Option>
                                <Option
                                    value="Manual Printing"
                                    name="fp_manual_printing"
                                >
                                    Manual Printing
                                </Option>
                                <Option value="Sealing" name="sealing">
                                    Sealing
                                </Option>
                                <Option value="Packing" name="fp_packing">
                                    Packing
                                </Option>
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
                                <Input disabled value={formData.foamProcess} />
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
