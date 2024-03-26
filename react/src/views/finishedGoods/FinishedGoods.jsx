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
import FinishedGoodsInModal from "./FinishedGoodsInModal";
import FinishedGoodsEditModal from "./FinishedGoodsEdit";
import "./FinishedGoods.css";

// const { Text } = Typography;
const { Column } = Table;

export default function FinishedGoods() {
    const [finishedGoods, setFinishedGoods] = useState([]);
    const [loading, setLoading] = useState(false);
    // const { setNotification } = useStateContext();
    const [openModal, setOpenModal] = useState(false);
    const [openFinishedGoodsInModal, setOpenFinishedGoodsInModal] =
        useState(false);
    const [filterValue, setFilterValue] = useState("");
    const [selectedItemId, setSelectedItemId] = useState(null);

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [openEditModal, setOpenEditModal] = useState(false);

    const [selectedEditItemId, setSelectedEditItemId] = useState(null);

    const handleRefresh = () => {
        getFinishedGoods();
    };

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    // Modify the handleOpenFinishedGoodsInModal function to accept the id parameter
    const handleOpenFinishedGoodsInModal = (id) => {
        setOpenFinishedGoodsInModal(true);
        setSelectedItemId(id); // Store the id in component state
    };

    const handleCloseFinishedGoodsInModal = () => {
        setOpenFinishedGoodsInModal(false);
    };

    const handleOpenEditModal = (id) => {
        setSelectedEditItemId(id);
        setOpenEditModal(true);
    };

    const handleCloseEditModal = () => {
        setSelectedEditItemId(null);
        setOpenEditModal(false);
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
            .get("/finished_goods")
            .then((response) => {
                const finishedGoodsData = response.data.data || [];
                setFinishedGoods(finishedGoodsData);
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
                className="finished-goods-container"
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

            <div
                style={{ maxWidth: "1800px" }}
                className="finished-goods-table"
            >
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
                    className="finished-goods-table-cell"
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
                                            handleOpenEditModal(record.id)
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
                                            handleOpenFinishedGoodsInModal(
                                                record.id
                                            )
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
                        title="Date"
                        dataIndex="beginning_date"
                        key="beginning_date"
                        sorter={(a, b) =>
                            new Date(a.beginning_date) -
                            new Date(b.beginning_date)
                        }
                    />
                    <Column
                        title="I"
                        dataIndex="fg_in"
                        key="fg_in"
                        sorter={(a, b) => a.fg_in - b.fg_in}
                    />
                    <Column
                        title="O"
                        dataIndex="fg_out"
                        key="fg_out"
                        sorter={(a, b) => a.fg_out - b.fg_out}
                    />
                    <Column
                        title="Ending Inventory"
                        dataIndex="ending_inventory"
                        key="ending_inventory"
                        render={(text, record) =>
                            record.fg_in !== undefined
                                ? record.beginning_inventory + record.fg_in
                                : record.beginning_inventory
                        }
                        sorter={(a, b) => {
                            // Get the ending inventory values for both records
                            const endingInventoryA =
                                a.fg_in !== undefined
                                    ? a.beginning_inventory + a.fg_in
                                    : a.beginning_inventory;
                            const endingInventoryB =
                                b.fg_in !== undefined
                                    ? b.beginning_inventory + b.fg_in
                                    : b.beginning_inventory;

                            // Compare the ending inventory values
                            if (endingInventoryA < endingInventoryB) {
                                return -1;
                            }
                            if (endingInventoryA > endingInventoryB) {
                                return 1;
                            }
                            return 0;
                        }}
                    />

                    <Column
                        title="Date"
                        dataIndex="ending_date"
                        key="ending_date"
                        sorter={(a, b) =>
                            new Date(a.ending_date) - new Date(b.ending_date)
                        }
                    />
                </Table>
            </div>

            <FinishedGoodsModal
                open={openModal}
                handleClose={handleCloseModal}
            />
            <FinishedGoodsInModal
                visible={openFinishedGoodsInModal}
                handleClose={handleCloseFinishedGoodsInModal}
                selectedItemId={selectedItemId}
            />
            <FinishedGoodsEditModal
                visible={openEditModal}
                handleClose={handleCloseEditModal}
                selectedItemId={selectedEditItemId}
            />
        </>
    );
}
