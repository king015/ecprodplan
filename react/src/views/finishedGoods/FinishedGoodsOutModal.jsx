import { Modal, Form, Input, DatePicker } from "antd";
import PropTypes from "prop-types";

const FinishedGoodsOutModal = ({ visible, onClose }) => {
    const [form] = Form.useForm();

    const handleOk = () => {
        form.validateFields()
            .then((values) => {
                form.resetFields();
                onClose(values);
            })
            .catch((errorInfo) => {
                console.log("Validation failed:", errorInfo);
            });
    };

    const handleCancel = () => {
        form.resetFields();
        onClose(null);
    };

    return (
        <Modal
            title="Add Finished Goods"
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <Form form={form} name="finishedGoodsForm" layout="vertical">
                <Form.Item
                    name="quantity"
                    label="Quantity"
                    rules={[
                        {
                            required: true,
                            message: "Please input quantity!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="date"
                    label="Date"
                    rules={[{ required: true, message: "Please select date!" }]}
                >
                    <DatePicker style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item name="remarks" label="Remarks">
                    <Input.TextArea />
                </Form.Item>
            </Form>
        </Modal>
    );
};

FinishedGoodsOutModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default FinishedGoodsOutModal;
