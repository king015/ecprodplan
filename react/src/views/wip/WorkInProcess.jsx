import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    Typography,
    Button,
    Input,
    Table,
    Space,
    Tooltip,
    message,
    Modal,
} from "antd";
import {
    EditOutlined,
    DeleteOutlined,
    PlusCircleOutlined,
    SyncOutlined,
    SearchOutlined,
    TagsOutlined,
} from "@ant-design/icons";
import axiosClient from "../../axios-client";
import WorkInProcessModal from "./WorkInProcessModal";
import ProcessModal from "./ProcessModal";
import "./WorkInProcess.css";

// const { Text } = Typography;

export default function WorkInProcess() {
    const [workInProcess, setWorkInProcess] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openWorkInProcessModal, setOpenWorkInProcessModal] = useState(false);
    const [openProcessModal, setOpenProcessModal] = useState(false);
    const [filterValue, setFilterValue] = useState("");
    const [pagination, setPagination] = useState({ current: 1 });

    const handleOpenWorkInProcessModal = () => {
        setOpenWorkInProcessModal(true);
    };

    const handleCloseWorkInProcessModal = () => {
        setOpenWorkInProcessModal(false);
    };

    const handleOpenProcessModal = () => {
        setOpenProcessModal(true);
    };

    const handleCloseProcessModal = () => {
        setOpenProcessModal(false);
    };

    useEffect(() => {
        getWorkInProcess();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onDeleteClick = (production) => {
        Modal.confirm({
            title: "Delete data",
            content: "Are you sure you want to delete this data?",
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            onOk() {
                axiosClient
                    .delete(`/work_in_process/${production.id}`)
                    .then(() => {
                        getWorkInProcess();
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

    const getWorkInProcess = () => {
        setLoading(true);
        axiosClient
            .get("/work_in_process")
            .then(({ data: { data = [], meta = {} } }) => {
                setWorkInProcess(data);
                setLoading(false);
                setPagination({ ...pagination, total: meta.total });
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const handleRefresh = () => {
        getWorkInProcess();
    };

    const handleFilterChange = (event) => {
        setFilterValue(event.target.value);
    };

    const filteredData = workInProcess.filter((production) =>
        Object.values(production).some(
            (value) =>
                value &&
                typeof value === "string" &&
                value.toLowerCase().includes(filterValue.toLowerCase())
        )
    );

    const columns = [
        {
            key: "action",

            width: 15,
            render: (text, record) => (
                <Space size="small" style={{ width: 5 }}>
                    <Tooltip title="Delete" placement="right">
                        <Button
                            icon={<DeleteOutlined style={{ color: "red" }} />}
                            size="small"
                            onClick={() => {
                                onDeleteClick(record);
                                message.error(`Deleting record ${record.id}`);
                            }}
                        />
                    </Tooltip>
                </Space>
            ),
        },
        {
            key: "action2",

            width: 15,
            render: () => (
                <Space size="small" style={{ width: 5 }}>
                    <Tooltip title="View Processes" placement="right">
                        <Button
                            icon={<TagsOutlined style={{ color: "#006400" }} />}
                            size="small"
                            onClick={handleOpenProcessModal}
                        />
                    </Tooltip>
                </Space>
            ),
        },
        {
            key: "action3",
            width: 15,

            render: (text, record) => (
                <Space size="small" style={{ width: 5 }}>
                    <Tooltip title="Edit" placement="right">
                        <Button
                            icon={<EditOutlined style={{ color: "#1E90FF" }} />}
                            size="small"
                            onClick={() => {
                                console.log("Edit", record);
                                message.info(`Editing record ${record.id}`);
                            }}
                        />
                    </Tooltip>
                </Space>
            ),
        },
        {
            title: "EP Code",
            dataIndex: "code",
            key: "code",

            width: 100,
            sorter: (a, b) => a.code.localeCompare(b.code),
        },
        {
            title: "Customer",
            dataIndex: "customer",
            key: "customer",
            width: 200,

            sorter: (a, b) => a.customer.localeCompare(b.customer),
        },
        {
            title: "Item Description",
            dataIndex: "itemDescription",
            key: "itemDescription",

            width: 350,
            sorter: (a, b) =>
                a.itemDescription.localeCompare(b.itemDescription),
        },
        {
            title: "Part Number",
            dataIndex: "partNumber",
            key: "partNumber",

            width: 200,
            sorter: (a, b) => a.partNumber.localeCompare(b.partNumber),
        },
    ];

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
                    WORK IN PROCESS
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
                    WORK IN PROCESS
                </Typography.Title>
            </div>

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 10,
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
                    onClick={handleOpenWorkInProcessModal}
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
                            borderRadius: "50%",
                            color: "#1E90FF",
                        }}
                    />
                </Tooltip>
            </div>

            <div style={{ maxWidth: "1800px" }}>
                <Table
                    dataSource={filteredData}
                    columns={columns}
                    loading={loading}
                    pagination={{
                        ...pagination,
                        total: filteredData.length,
                        onChange: (page) => {
                            setPagination({ ...pagination, current: page });
                        },
                    }}
                    size="small"
                    scroll={{ x: 1500 }}
                    style={{ backgroundColor: "#f0f2f5" }}
                />
            </div>
            <WorkInProcessModal
                visible={openWorkInProcessModal}
                handleClose={handleCloseWorkInProcessModal}
            />
            <ProcessModal
                visible={openProcessModal}
                onClose={handleCloseProcessModal}
                process="Viewer"
                data={workInProcess}
            />
        </>
    );
}
