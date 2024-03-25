import { Modal, Table, Typography, Spin } from "antd";
import PropTypes from "prop-types";
import axiosClient from "../../axios-client";
import { useEffect, useState } from "react";

const { Text } = Typography;

const ProcessModal = ({ visible, onClose, process, loading }) => {
    const [data, setData] = useState([]);
    const [totalQuantity, setTotalQuantity] = useState(0);

    const columns = [
        {
            title: "Process",
            dataIndex: "process",
            key: "process",
            render: (text) => <Text strong>{text}</Text>,
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
            key: "quantity",
        },
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosClient.get(
                    `/work_in_process?process=${process}`
                );
                const responseData = response.data;
                setData((responseData.data = [])); // Assuming the data is nested under 'data' key in the response
                const totalQuantity = responseData.data.reduce(
                    (acc, curr) => acc + curr.quantity,
                    0
                );
                setTotalQuantity(totalQuantity);
            } catch (error) {
                console.error("Error fetching work in process data:", error);
            }
        };

        if (visible) {
            fetchData();
        }
    }, []);

    // Filter out processes with null values
    const filteredData = data.filter((item) => {
        return Object.keys(item).some(
            (key) => item[key] !== null && key !== "id"
        ); // Exclude 'id' column
    });

    return (
        <Modal
            title={`PROCESS - ${process}`}
            visible={visible}
            onCancel={onClose}
            footer={null}
            centered
            bodyStyle={{ padding: 0 }}
        >
            <Spin spinning={loading}>
                <Table
                    dataSource={filteredData}
                    columns={columns}
                    pagination={false}
                    size="small"
                    bordered
                    scroll={{ y: 300 }}
                />
                <div
                    style={{
                        background: "#f0f2f5",
                        padding: "16px",
                        borderTop: "1px solid #e8e8e8",
                        textAlign: "right",
                    }}
                >
                    <Text strong style={{ color: "#006400" }}>
                        Total Quantity:{" "}
                        <span style={{ color: "#000" }}>{totalQuantity}</span>
                    </Text>
                </div>
            </Spin>
        </Modal>
    );
};

ProcessModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    process: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired, // Loading state
};

export default ProcessModal;
