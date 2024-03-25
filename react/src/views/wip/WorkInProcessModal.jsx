import { useState, useEffect } from "react";
import { Modal, Select, Input, Button, InputNumber, message, Form } from "antd";
import axiosClient from "../../axios-client"; // Assuming this is the correct import path for your axios client
import PropTypes from "prop-types";
import { SaveOutlined } from "@ant-design/icons";

const { Option } = Select;

const processes = {
    "Board Process": [
        "Creaser",
        "Flexo Printing",
        "Printer Slotter",
        "Slotting",
        "Clapper",
        "Diecut",
        "Stitching",
        "Detach",
        "Gluing",
        "Packing",
        "Pre Assembly",
        "Manual Slotting",
        "Pallet Assembly",
        "Manual Printing",
        "Manual Cutting",
        "Laminating",
        "Box Assembly",
    ],

    "Foam Process": [
        "Manual Cutting",
        "Diecut",
        "Bandsaw",
        "Skiving",
        "Detach",
        "Heating Plate",
        "Hotmelt",
        "Assembly Heating",
        "Manual Printing",
        "Sealing",
        "Packing",
    ],
};

function WorkInProcessModal({ visible, handleClose }) {
    const [epcode, setEpcode] = useState("");
    const [selectedProcess, setSelectedProcess] = useState("");
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [finishedGoods, setFinishedGoods] = useState([]);
    const [loading, setLoading] = useState(false);

    const [form] = Form.useForm();

    useEffect(() => {
        const fetchFinishedGoods = async () => {
            try {
                const response = await axiosClient.get("/finished_goods_data");
                const { finished_goods_data } = response.data;
                setFinishedGoods(finished_goods_data);
            } catch (error) {
                console.error("Error fetching finished goods data:", error);
            }
        };

        fetchFinishedGoods();
    }, []);

    const handleEpcodeChange = (value) => {
        setEpcode(value);
    };

    const handleProcessChange = (value) => {
        setSelectedProcess(value);
        setSelectedOptions([]);
        setQuantities({});
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);

            const token = localStorage.getItem("ACCESS_TOKEN");

            if (!token) {
                message.error("Token not found in localStorage. Please login.");
                return;
            }

            const headers = {
                Authorization: `Bearer ${token}`,
            };

            const selectedGood = finishedGoods.find(
                (good) => good.code === epcode
            );

            if (!selectedGood) {
                message.error("Please select a valid EP Code.");
                return;
            }

            // Check if the data already exists
            const existingData = await axiosClient.get("/work_in_process", {
                headers,
                params: {
                    customer: selectedGood.customer,
                    code: selectedGood.code,
                    itemDescription: selectedGood.itemDescription,
                    partNumber: selectedGood.partNumber,
                    process: selectedProcess,
                    options: selectedOptions,
                    quantities: quantities,
                },
            });

            if (existingData.length > 0) {
                // Data already exists, show error message
                message.error("Data already exists!");
                return;
            }

            // Include selected processes in the data object
            const data = {
                customer: selectedGood.customer,
                code: selectedGood.code,
                itemDescription: selectedGood.itemDescription,
                partNumber: selectedGood.partNumber,
                process: selectedProcess,
                options: selectedOptions,
                quantities: quantities,
                // Add selected processes here
                creaser: selectedOptions.includes("Creaser")
                    ? quantities["Creaser"]
                    : null,
                flexo_print: selectedOptions.includes("Flexo Printing")
                    ? quantities["Flexo Printing"]
                    : null,
                printer_slotter: selectedOptions.includes("Printer Slotter")
                    ? quantities["Printer Slotter"]
                    : null,
                slotting: selectedOptions.includes("Slotting")
                    ? quantities["Slotting"]
                    : null,
                clapper: selectedOptions.includes("Clapper")
                    ? quantities["Clapper"]
                    : null,
                diecut: selectedOptions.includes("Diecut")
                    ? quantities["Diecut"]
                    : null,
                stitching: selectedOptions.includes("Stitching")
                    ? quantities["Stitching"]
                    : null,
                detach: selectedOptions.includes("Detach")
                    ? quantities["Detach"]
                    : null,
                gluing: selectedOptions.includes("Gluing")
                    ? quantities["Gluing"]
                    : null,
                pre_assembly: selectedOptions.includes("Pre Assembly")
                    ? quantities["Pre Assembly"]
                    : null,
                manual_slotting: selectedOptions.includes("Manual Slotting")
                    ? quantities["Manual Slotting"]
                    : null,
                packing: selectedOptions.includes("Packing")
                    ? quantities["Packing"]
                    : null,
                pallet_assembly: selectedOptions.includes("Pallet Assembly")
                    ? quantities["Pallet Assembly"]
                    : null,
                manual_printing: selectedOptions.includes("Manual Printing")
                    ? quantities["Manual Printing"]
                    : null,
                manual_cutting: selectedOptions.includes("Manual Cutting")
                    ? quantities["Manual Cutting"]
                    : null,
                laminating: selectedOptions.includes("Laminating")
                    ? quantities["Laminating"]
                    : null,
                box_assembly: selectedOptions.includes("Box Assembly")
                    ? quantities["Box Assembly"]
                    : null,
                fp_manual_cutting: selectedOptions.includes("FP Manual Cutting")
                    ? quantities["FP Manual Cutting"]
                    : null,
                fp_diecut: selectedOptions.includes("FP Diecut")
                    ? quantities["FP Diecut"]
                    : null,
                bandsaw: selectedOptions.includes("Bandsaw")
                    ? quantities["Bandsaw"]
                    : null,
                skiving: selectedOptions.includes("Skiving")
                    ? quantities["Skiving"]
                    : null,
                fp_detach: selectedOptions.includes("FP Detach")
                    ? quantities["FP Detach"]
                    : null,
                heating_plate: selectedOptions.includes("Heating Plate")
                    ? quantities["Heating Plate"]
                    : null,
                hotmelt: selectedOptions.includes("Hotmelt")
                    ? quantities["Hotmelt"]
                    : null,
                assembly_heating: selectedOptions.includes("Assembly Heating")
                    ? quantities["Assembly Heating"]
                    : null,
                fp_manual_printing: selectedOptions.includes(
                    "FP Manual Printing"
                )
                    ? quantities["FP Manual Printing"]
                    : null,
                sealing: selectedOptions.includes("Sealing")
                    ? quantities["Sealing"]
                    : null,
                fp_packing: selectedOptions.includes("FP Packing")
                    ? quantities["FP Packing"]
                    : null,
            };

            await axiosClient.post("/work_in_process", data, { headers });

            message.success("Work In Process data submitted successfully");
            handleClose();

            // Reset form fields
            form.resetFields();
        } catch (error) {
            console.error("Error submitting Work In Process data:", error);
            message.error(
                "Failed to submit Work In Process data. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    const resetFields = () => {
        setEpcode("");
        setSelectedProcess("");
        setSelectedOptions([]);
        setQuantities({});
    };

    const handleQuantityChange = (value, option) => {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [option]: value,
        }));
    };

    const handleCancel = () => {
        resetFields();
        handleClose();
    };

    const selectedGood = finishedGoods.find((good) => good.code === epcode);

    return (
        <Modal
            title="Work In Process Modal"
            visible={visible}
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
            width={800}
        >
            <div style={{ display: "flex" }}>
                <div style={{ flex: 1, marginRight: 16 }}>
                    <Select
                        placeholder="Select EP Code"
                        value={epcode}
                        onChange={handleEpcodeChange}
                        style={{ marginBottom: 16, width: "100%" }}
                        dropdownClassName="epcode-select-dropdown"
                    >
                        {finishedGoods.map((good) => (
                            <Option key={good.code} value={good.code}>
                                {good.code}
                            </Option>
                        ))}
                    </Select>
                    {selectedGood && (
                        <div>
                            <Input
                                value={selectedGood.customer || ""}
                                readOnly
                                addonBefore="Customer"
                                style={{ marginBottom: 8 }}
                            />
                            <Input
                                value={selectedGood.itemDescription || ""}
                                readOnly
                                addonBefore="Item Description"
                                style={{ marginBottom: 8 }}
                            />
                            <Input
                                value={selectedGood.partNumber || ""}
                                readOnly
                                addonBefore="Part Number"
                                style={{ marginBottom: 16 }}
                            />
                            <Select
                                placeholder="Select Process"
                                value={selectedProcess}
                                onChange={handleProcessChange}
                                style={{ width: "100%" }}
                            >
                                {Object.keys(processes).map((process) => (
                                    <Option key={process} value={process}>
                                        {process}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                    )}
                </div>
                {selectedProcess && (
                    <div style={{ flex: 1 }}>
                        <Select
                            mode="multiple"
                            placeholder={`Select ${selectedProcess}`}
                            value={selectedOptions}
                            onChange={setSelectedOptions}
                            style={{ marginTop: 16, width: "100%" }}
                        >
                            {processes[selectedProcess].map((option) => (
                                <Option key={option} value={option}>
                                    {option}
                                </Option>
                            ))}
                        </Select>

                        {selectedOptions.map((option, index) => (
                            <div key={index}>
                                <InputNumber
                                    value={quantities[option] || 0}
                                    min={0}
                                    onChange={(value) =>
                                        handleQuantityChange(value, option)
                                    }
                                    style={{ marginTop: 5, width: "100%" }}
                                    placeholder="Quantity"
                                    name={`quantity_${option}`}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Modal>
    );
}

WorkInProcessModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
};

export default WorkInProcessModal;
