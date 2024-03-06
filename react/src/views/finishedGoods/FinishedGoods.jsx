import { useEffect, useState } from "react";
// import { useStateContext } from "../../components/context/ContextProvider";
import {
    Table,
    Typography,
    Button,
    Input,
    Space,
    Tooltip,
    Modal,
    message,
} from "antd";
import {
    SyncOutlined,
    EditOutlined,
    DeleteOutlined,
    PlusCircleOutlined,
} from "@ant-design/icons";
import axiosClient from "../../axios-client";
import FinishedGoodsModal from "./FinishedGoodsModal";
import { Link } from "react-router-dom";

const { Text } = Typography;
const { Column } = Table;

export default function FinishedGoods() {
    const [finishedGoods, setFinishedGoods] = useState([]);
    const [loading, setLoading] = useState(false);
    // const { setNotification } = useStateContext();
    const [openModal, setOpenModal] = useState(false);
    const [filterValue, setFilterValue] = useState("");

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    const handleRefresh = () => {
        getFinishedGoods();
    };

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const onDeleteClick = (fg) => {
        Modal.confirm({
            title: "Delete User",
            content: "Are you sure you want to delete this data?",
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            onOk() {
                axiosClient
                    .delete(`/finished_goods/${fg.id}`)
                    .then(() => {
                        getFinishedGoods();
                        message.success("Data successfully deleted");
                    })
                    .catch(() => {
                        message.error(
                            "Failed to delete data. Please try again."
                        );
                    });
            },
        });
    };

    const getFinishedGoods = () => {
        setLoading(true);
        axiosClient
            .get("/combined_data")
            .then(({ data }) => {
                setLoading(false);
                setFinishedGoods(data.production_plan);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const handleFilterChange = (event) => {
        setFilterValue(event.target.value);
    };

    useEffect(() => {
        getFinishedGoods();
    }, []);

    const filteredData = finishedGoods.filter((fg) =>
        Object.values(fg).some(
            (value) =>
                value &&
                typeof value === "string" &&
                value.toLowerCase().includes(filterValue.toLowerCase())
        )
    );

    return (
        <>
            <div
                style={{
                    marginBottom: 16,
                    display: "flex",
                    alignItems: "center",
                    borderBottom: "1px solid #ddd",
                    paddingBottom: 8,
                }}
            >
                <Typography.Title level={3} style={{ marginRight: 16 }}>
                    Finished Goods
                </Typography.Title>

                <Text strong style={{ margin: "0 8px" }}>
                    /
                </Text>
                <Link to="/dashboard">
                    <Button type="link">Home</Button>
                </Link>
            </div>
            <div
                style={{
                    marginBottom: 16,
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <Typography.Text
                    strong
                    style={{ marginRight: 8, color: "#1E90FF" }}
                >
                    Filter:
                </Typography.Text>
                <Input
                    placeholder="Enter text to filter"
                    value={filterValue}
                    onChange={handleFilterChange}
                    style={{ width: 200, marginRight: 8 }}
                />

                <Tooltip title="Add FG" placement="right">
                    <Button
                        icon={<PlusCircleOutlined />}
                        onClick={handleOpenModal}
                        style={{
                            marginRight: 8,
                            borderRadius: "50%",
                            alignContent: "center",
                            textAlign: "center",
                            color: "#1E90FF",
                        }}
                    />
                </Tooltip>
                <Tooltip title="Refresh" placement="right">
                    <Button
                        icon={<SyncOutlined />}
                        onClick={handleRefresh}
                        style={{
                            marginRight: 8,
                            borderRadius: "50%",
                            textAlign: "center",
                            alignContent: "center",
                            color: "#1E90FF",
                        }}
                    />
                </Tooltip>
            </div>

            <div style={{ maxWidth: "1800px" }}>
                <Table
                    dataSource={filteredData}
                    loading={loading}
                    pagination={{
                        current: page,
                        pageSize: pageSize,
                        total: filteredData.length,
                        onChange: (page, pageSize) => {
                            setPage(page);
                            setPageSize(pageSize);
                        },
                    }}
                    bordered
                    rowKey="id"
                    size="small"
                    scroll={{ x: 800 }}
                    style={{ backgroundColor: "#f0f2f5" }}
                >
                    <Column
                        key="edit"
                        render={(text, record) => (
                            <Space size="small">
                                <Tooltip title="Edit">
                                    <Button
                                        icon={
                                            <EditOutlined
                                                style={{ color: "#1E90FF" }}
                                            />
                                        }
                                        onClick={() =>
                                            console.log("Edit", record)
                                        }
                                    />
                                </Tooltip>
                            </Space>
                        )}
                    />
                    <Column
                        key="delete"
                        render={(text, record) => (
                            <Space size="small">
                                <Tooltip title="Delete">
                                    <Button
                                        icon={
                                            <DeleteOutlined
                                                style={{ color: "red" }}
                                            />
                                        }
                                        onClick={() => onDeleteClick(record)}
                                    />
                                </Tooltip>
                            </Space>
                        )}
                    />

                    <Column
                        title="Customer"
                        dataIndex="customer"
                        key="customer"
                        sorter={(a, b) => a.customer.localeCompare(b.customer)}
                    />
                    <Column
                        title="EP Code"
                        dataIndex="code"
                        key="code"
                        sorter={(a, b) => a.code.localeCompare(b.code)}
                    />
                    <Column
                        title="Item Description"
                        dataIndex="item_description"
                        key="item_description"
                        sorter={(a, b) =>
                            a.item_description.localeCompare(b.item_description)
                        }
                    />
                    <Column
                        title="Part Number"
                        dataIndex="part_number"
                        key="part_number"
                        sorter={(a, b) =>
                            a.part_number.localeCompare(b.part_number)
                        }
                    />
                    <Column
                        title="Location"
                        dataIndex="location"
                        key="location"
                        sorter={(a, b) => a.location.localeCompare(b.location)}
                    />
                    <Column
                        title="Beginning Inventory"
                        dataIndex="beginning_inventory"
                        key="beginning_inventory"
                        sorter={(a, b) =>
                            a.beginning_inventory - b.beginning_inventory
                        }
                    />
                    <Column
                        title="Beginning Date"
                        dataIndex="beginning_date"
                        key="beginning_date"
                        sorter={(a, b) =>
                            new Date(a.beginning_date) -
                            new Date(b.beginning_date)
                        }
                    />
                    <Column
                        title="Ending Inventory"
                        dataIndex="ending_inventory"
                        key="ending_inventory"
                        sorter={(a, b) =>
                            a.ending_inventory - b.ending_inventory
                        }
                    />
                    <Column
                        title="Ending Date"
                        dataIndex="ending_date"
                        key="ending_date"
                        sorter={(a, b) =>
                            new Date(a.ending_date) - new Date(b.ending_date)
                        }
                    />
                    <Column
                        title="In"
                        dataIndex="fg_in"
                        key="fg_in"
                        sorter={(a, b) => a.fg_in - b.fg_in}
                    />
                    <Column
                        title="Out"
                        dataIndex="fg_out"
                        key="fg_out"
                        sorter={(a, b) => a.fg_out - b.fg_out}
                    />
                </Table>
            </div>

            <FinishedGoodsModal
                open={openModal}
                handleClose={handleCloseModal}
            />
        </>
    );
}
