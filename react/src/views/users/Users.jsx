import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    Table,
    Typography,
    Button,
    Spin,
    Modal,
    message,
    Tooltip,
    Input,
} from "antd";
import {
    DeleteOutlined,
    EditOutlined,
    SyncOutlined,
    PlusCircleOutlined,
} from "@ant-design/icons";
import axiosClient from "../../axios-client";
import UserForm from "./UserForm";

const { Text } = Typography;

const { Column } = Table;

export default function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    const [filterValue, setFilterValue] = useState("");

    const handleRefresh = () => {
        getUsers();
    };

    useEffect(() => {
        getUsers();
    }, []);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const onDeleteClick = (user) => {
        Modal.confirm({
            title: "Delete User",
            content: "Are you sure you want to delete this user?",
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            onOk() {
                axiosClient.delete(`/users/${user.id}`).then(() => {
                    getUsers();
                    message.success("User successfully deleted");
                });
            },
        });
    };

    const getUsers = () => {
        setLoading(true);
        axiosClient
            .get("/users")
            .then(({ data }) => {
                setLoading(false);
                setUsers(data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const handleFilterChange = (event) => {
        setFilterValue(event.target.value);
    };

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
                <Typography.Title
                    level={3}
                    style={{
                        marginRight: 16,
                        fontWeight: "bold",
                        fontSize: "1.5rem",
                    }}
                >
                    User Management
                </Typography.Title>
                <Typography variant="body2" style={{ marginRight: 8 }}>
                    <Text strong style={{ margin: "0 8px" }}>
                        /
                    </Text>
                    <Link
                        to="/dashboard"
                        style={{
                            color: "#1890ff",
                            textDecoration: "none",
                            marginLeft: "8px",
                        }}
                    >
                        HOME
                    </Link>
                </Typography>
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

                <Button
                    icon={<PlusCircleOutlined />}
                    onClick={handleOpenModal}
                    style={{
                        marginRight: 8,
                        borderRadius: 5,
                        alignContent: "center",
                        textAlign: "center",
                        color: "#1E90FF",
                    }}
                >
                    Add User
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

            <Spin spinning={loading}>
                <Table
                    dataSource={users}
                    pagination={{
                        current: page,
                        pageSize: pageSize,
                        total: users.length,
                        onChange: (page, pageSize) => {
                            setPage(page);
                            setPageSize(pageSize);
                        },
                    }}
                    rowKey="id"
                    onChange={(pagination, filters, sorter) => {
                        console.log("pagination:", pagination);
                        console.log("sorter:", sorter);
                    }}
                >
                    <Column
                        title="ID"
                        dataIndex="id"
                        key="id"
                        sorter={(a, b) => a.id - b.id}
                    />
                    <Column
                        title="Name"
                        dataIndex="name"
                        key="name"
                        sorter={(a, b) => a.name.localeCompare(b.name)}
                    />
                    <Column
                        title="Email"
                        dataIndex="email"
                        key="email"
                        sorter={(a, b) => a.email.localeCompare(b.email)}
                    />
                    <Column
                        title="Created At"
                        dataIndex="created_at"
                        key="created_at"
                        sorter={(a, b) =>
                            new Date(a.created_at) - new Date(b.created_at)
                        }
                    />
                    <Column
                        title=""
                        key="edit"
                        render={(text, record) => (
                            <Tooltip title="Edit" placement="right">
                                <Button
                                    type="link"
                                    icon={<EditOutlined />}
                                    component={Link}
                                    to={`/users/${record.id}`}
                                />
                            </Tooltip>
                        )}
                    />
                    <Column
                        title=""
                        key="delete"
                        render={(text, record) => (
                            <Tooltip title="Delete" placement="right">
                                <Button
                                    type="link"
                                    icon={<DeleteOutlined />}
                                    danger
                                    onClick={() => onDeleteClick(record)}
                                />
                            </Tooltip>
                        )}
                    />
                </Table>
            </Spin>
            <UserForm visible={openModal} handleCancel={handleCloseModal} />
        </>
    );
}
