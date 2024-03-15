import { Modal, Table, Typography } from "antd";
import PropTypes from "prop-types";

const { Text } = Typography;

const ProcessModal = ({ visible, onClose, process }) => {
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

    const data = [
        {
            key: "1",
            process: "Process 1",
            quantity: 10,
        },
        {
            key: "2",
            process: "Process 2",
            quantity: 20,
        },
        {
            key: "3",
            process: "Process 3",
            quantity: 30,
        },
        {
            key: "4",
            process: "Process 4",
            quantity: 40,
        },
        {
            key: "5",
            process: "Process 5",
            quantity: 100,
        },
    ];

    // Calculate total quantity
    const totalQuantity = data.reduce((acc, curr) => acc + curr.quantity, 0);

    return (
        <Modal
            title={`PROCESS - ${process}`}
            visible={visible}
            onCancel={onClose}
            footer={null}
            centered
            bodyStyle={{ padding: 0 }}
        >
            <Table
                dataSource={data}
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
        </Modal>
    );
};

ProcessModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    process: PropTypes.string.isRequired,
};

export default ProcessModal;
