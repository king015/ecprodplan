import { useState, useEffect } from "react";
import { Modal, Select, Input, Button, InputNumber, message } from "antd";
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
    const [quantities, setQuantities] = useState({}); // State to manage quantities for each selected option
    const [finishedGoods, setFinishedGoods] = useState([]);

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
        setQuantities({}); // Reset quantities when process changes
    };

    const handleSubmit = async () => {
        try {
            const token = localStorage.getItem("ACCESS_TOKEN");

            if (!token) {
                message.error("Token not found in localStorage. Please login.");
                return;
            }

            const headers = {
                Authorization: `Bearer ${token}`,
            };

            const data = {
                epcode,
                process: selectedProcess,
                options: selectedOptions,
            };

            await axiosClient.post("/work_in_process", data, { headers });

            message.success("Work In Process data submitted successfully");
            handleClose();
        } catch (error) {
            console.error("Error submitting Work In Process data:", error);
            message.error(
                "Failed to submit Work In Process data. Please try again."
            );
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
                        {/* Render the number field if there are selected options */}
                        {selectedOptions.map((option, index) => (
                            <div key={index}>
                                <InputNumber
                                    value={quantities[option] || 0} // Use quantities state for value
                                    min={0}
                                    onChange={(value) =>
                                        handleQuantityChange(value, option)
                                    }
                                    style={{ marginTop: 5, width: "100%" }}
                                    placeholder="Quantity" // Use a static placeholder
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
