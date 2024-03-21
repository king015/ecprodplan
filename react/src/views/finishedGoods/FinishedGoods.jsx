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
    MinusCircleOutlined,
    SearchOutlined,
} from "@ant-design/icons";
import axiosClient from "../../axios-client";
import FinishedGoodsModal from "./FinishedGoodsModal";
import { Link } from "react-router-dom";

// const { Text } = Typography;
const { Column } = Table;

export default function FinishedGoods() {
    const [finishedGoods, setFinishedGoods] = useState([]);
    const [loading, setLoading] = useState(false);
    // const { setNotification } = useStateContext();
    const [openModal, setOpenModal] = useState(false);
    const [filterValue, setFilterValue] = useState("");

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

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
            .get("/finished_goods_data")
            .then((response) => {
                const finishedGoodsData =
                    response.data.finished_goods_data || [];

                const mappedData = finishedGoodsData.map((item) => ({
                    ...item,
                    creaser: null,
                    flexo_print: null,
                }));
                setFinishedGoods(mappedData);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                console.error("Error fetching data:", error);
                message.error("Failed to fetch data. Please try again.");
            });
    };

    const handleFilterChange = (event) => {
        setFilterValue(event.target.value);
    };

    useEffect(() => {
        getFinishedGoods();
    }, []);

    const filteredData = Array.isArray(finishedGoods)
        ? finishedGoods.filter((fg) =>
              Object.values(fg).some(
                  (value) =>
                      value &&
                      typeof value === "string" &&
                      value.toLowerCase().includes(filterValue.toLowerCase())
              )
          )
        : [];

    return (
        <>
            <div
                style={{
                    marginBottom: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    borderBottom: "1px solid #ddd",
                    paddingBottom: 9,
                }}
            >
                <Typography.Title
                    level={0}
                    style={{
                        color: "#1890ff",
                        marginRight: 5,
                        fontWeight: 600,
                        fontSize: 12,
                        marginBottom: 0,
                    }}
                >
                    FINISHED GOODS
                </Typography.Title>
                <Typography variant="body2" style={{ marginRight: 8 }}>
                    <span style={{ margin: "0 8px" }}>/</span>
                    <Link
                        to="/dashboard"
                        style={{
                            color: "#1890ff",
                            fontWeight: 600,
                            fontSize: 12,
                            textDecoration: "none",
                            marginLeft: 5,
                        }}
                    >
                        HOME
                    </Link>
                </Typography>
            </div>

            <div className="">
                <Typography.Title
                    level={0}
                    style={{
                        color: "#1890ff",
                        marginRight: 16,
                        marginTop: "16px",
                        marginBottom: "16px",
                        fontWeight: 400,
                        fontSize: "20px",
                    }}
                >
                    FINISHED GOODS
                </Typography.Title>
            </div>
            <div
                style={{
                    marginBottom: 10,
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <Input
                    placeholder="Search"
                    prefix={<SearchOutlined style={{ marginRight: 8 }} />}
                    value={filterValue}
                    onChange={handleFilterChange}
                    style={{
                        width: 300,
                        marginRight: 8,
                    }}
                />

                <Button
                    icon={<PlusCircleOutlined />}
                    onClick={handleOpenModal}
                    style={{
                        marginRight: 8,
                        borderRadius: "5px",
                        color: "#1E90FF",
                    }}
                >
                    Add Item
                </Button>

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
                    scroll={{ x: 1500 }}
                    style={{ backgroundColor: "#f0f2f5" }}
                >
                    <Column
                        key="delete"
                        width={20}
                        render={(text, record) => (
                            <Space size="small">
                                <Tooltip title="Delete" placement="right">
                                    <Button
                                        size="small"
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
                        key="edit"
                        width={20}
                        render={(text, record) => (
                            <Space size="small">
                                <Tooltip title="Edit" placement="right">
                                    <Button
                                        size="small"
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
                        key="add"
                        width={20}
                        render={(text, record) => (
                            <Space size="small">
                                <Tooltip title="Add FG In" placement="right">
                                    <Button
                                        size="small"
                                        icon={
                                            <PlusCircleOutlined
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
                        key="add"
                        width={20}
                        render={(text, record) => (
                            <Space size="small">
                                <Tooltip title="Add FG Out" placement="right">
                                    <Button
                                        size="small"
                                        icon={
                                            <MinusCircleOutlined
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
                        title="EP Code"
                        dataIndex="code"
                        key="code"
                        sorter={(a, b) => a.code.localeCompare(b.code)}
                    />

                    <Column
                        title="Customer"
                        dataIndex="customer"
                        key="customer"
                        sorter={(a, b) => a.customer.localeCompare(b.customer)}
                    />

                    <Column
                        title="Item Description"
                        dataIndex="itemDescription"
                        key="itemDescription"
                        sorter={(a, b) =>
                            a.itemDescription.localeCompare(b.itemDescription)
                        }
                    />
                    <Column
                        title="Part Number"
                        dataIndex="partNumber"
                        key="partNumber"
                        sorter={(a, b) =>
                            a.partNumber.localeCompare(b.partNumber)
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
