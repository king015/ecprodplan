import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { useStateContext } from "../../components/context/ContextProvider";
import {
    Typography,
    Button,
    Input,
    Table,
    Space,
    Tooltip,
    message,
    Menu,
    Dropdown,
    Modal,
    InputNumber,
} from "antd";
import {
    SyncOutlined,
    EditOutlined,
    DeleteOutlined,
    FileExcelOutlined,
    TagsOutlined,
    SearchOutlined,
} from "@ant-design/icons";
import axiosClient from "../../axios-client";
import { exportToCSV, exportToExcel } from "../../exportUtils";
import ProductionProcessModal from "./ProductionProcessModal";

// const { Text } = Typography;

export default function FinishedGoods() {
    const [productionPlan, setProductionPlan] = useState([]);
    const [loading, setLoading] = useState(false);
    // const { setNotification } = useStateContext();

    const [filterValue, setFilterValue] = useState("");
    const [pagination, setPagination] = useState({ current: 1 });

    const [openProcessModal, setOpenProcessModal] = useState(false);

    const [data, setData] = useState([
        {
            key: "1",
            weekly_requisites: 0,
            mon: 0,
            tues: 0,
            wed: 0,
            thurs: 0,
            fri: 0,
            sat: 0,
        },
        // Add more initial data if needed
    ]);

    useEffect(() => {
        getProductionPlan();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onDeleteClick = (plan) => {
        Modal.confirm({
            title: "Delete data",
            content: "Are you sure you want to delete this data?",
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            onOk() {
                axiosClient
                    .delete(`/production_plan/${plan.id}`)
                    .then(() => {
                        getProductionPlan();
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

    const handleRefresh = () => {
        getProductionPlan();
    };

    const getProductionPlan = () => {
        setLoading(true);
        axiosClient
            .get("/work_in_process")
            .then(({ data: { data = [], meta = {} } }) => {
                setProductionPlan(data);
                setLoading(false);
                setPagination({ ...pagination, total: meta.total });
            })
            .catch(() => {
                setLoading(false);
            });
    };
    const handleFilterChange = (event) => {
        setFilterValue(event.target.value);
    };

    const filteredData = Array.isArray(productionPlan)
        ? productionPlan.filter((fg) =>
              Object.values(fg).some(
                  (value) =>
                      value &&
                      typeof value === "string" &&
                      value.toLowerCase().includes(filterValue.toLowerCase())
              )
          )
        : [];

    const handleExport = (fileType) => {
        if (fileType === "csv") {
            exportToCSV(productionPlan, "work_in_process.csv");
        } else if (fileType === "excel") {
            exportToExcel(productionPlan, "work_in_process.xlsx");
        }
    };

    const exportMenu = (
        <Menu onClick={handleExport}>
            <Menu.Item key="csv">Export as CSV</Menu.Item>
            <Menu.Item key="excel">Export as Excel</Menu.Item>
        </Menu>
    );

    const handleOpenProcessModal = () => {
        setOpenProcessModal(true);
    };

    const handleCloseProcessModal = () => {
        setOpenProcessModal(false);
    };

    const handleInputChange = (value, dataIndex, key) => {
        const newData = [...data];
        const index = newData.findIndex((item) => key === item.key);
        if (index > -1) {
            newData[index][dataIndex] = value;
            setData(newData);

            // Send updated data to backend
            axiosClient
                .put(`/production-plan/${key}`, { [dataIndex]: value })
                .then((response) => {
                    // Handle success
                    console.log("Data updated successfully:", response.data);
                })
                .catch((error) => {
                    // Handle error
                    console.error("Error updating data:", error);
                    message.error("Failed to update data. Please try again.");
                });
        }
    };

    const columns = [
        {
            title: "",
            key: "action",
            width: 35,
            fixed: "left",
            render: (text, record) => (
                <Space size="small" style={{ width: 100 }}>
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
            key: "action2",
            fixed: "left",
            width: 35,
            render: () => (
                <Space size="small" style={{ width: 100 }}>
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
            title: "",
            key: "action",
            width: 35,
            fixed: "left",
            render: (text, record) => (
                <Space size="small" style={{ width: 100 }}>
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
            title: "Customer",
            dataIndex: "customer",
            key: "customer",
            fixed: "left",
            width: 300,
            sorter: (a, b) => a.customer - b.customer,
        },
        {
            title: "EP Code",
            dataIndex: "code",
            key: "code",
            fixed: "left",
            width: 150,
            sorter: (a, b) => a.code - b.code,
        },
        {
            title: "Item Description",
            dataIndex: "itemDescription",
            key: "itemDescription",
            fixed: "left",
            width: 400,
            sorter: (a, b) => a.item_description - b.item_description,
        },
        {
            title: "Part Number",
            dataIndex: "partNumber",
            key: "partNumber",
            fixed: "left",
            width: 200,
            sorter: (a, b) => a.part_number - b.part_number,
        },
        {
            title: "WR",
            dataIndex: "weekly_requisites",
            key: "weekly_requisites",
            fixed: "left",
            width: 75,
            render: (text, record) => (
                <InputNumber
                    value={text}
                    style={{ width: "60px" }}
                    onChange={(value) =>
                        handleInputChange(
                            value,
                            "weekly_requisites",
                            record.key
                        )
                    }
                />
            ),
            sorter: (a, b) => a.weekly_requisites - b.weekly_requisites,
        },
        {
            title: "For Schedule",
            children: [
                {
                    title: "M",
                    dataIndex: "mon",
                    width: 60,
                    render: (text, record) => (
                        <InputNumber
                            value={text}
                            style={{ width: "50px" }}
                            onChange={(value) =>
                                handleInputChange(value, "mon", record.key)
                            }
                        />
                    ),
                },
                {
                    title: "T",
                    dataIndex: "tues",
                    width: 60,
                    render: (text, record) => (
                        <InputNumber
                            value={text}
                            style={{ width: "50px" }}
                            onChange={(value) =>
                                handleInputChange(value, "tues", record.key)
                            }
                        />
                    ),
                },
                {
                    title: "W",
                    dataIndex: "wed",
                    width: 60,
                    render: (text, record) => (
                        <InputNumber
                            value={text}
                            style={{ width: "50px" }}
                            onChange={(value) =>
                                handleInputChange(value, "wed", record.key)
                            }
                        />
                    ),
                },
                {
                    title: "TH",
                    dataIndex: "thurs",
                    width: 60,
                    render: (text, record) => (
                        <InputNumber
                            value={text}
                            style={{ width: "50px" }}
                            onChange={(value) =>
                                handleInputChange(value, "thurs", record.key)
                            }
                        />
                    ),
                },
                {
                    title: "F",
                    dataIndex: "fri",
                    width: 60,
                    render: (text, record) => (
                        <InputNumber
                            value={text}
                            style={{ width: "50px" }}
                            onChange={(value) =>
                                handleInputChange(value, "fri", record.key)
                            }
                        />
                    ),
                },
                {
                    title: "S",
                    dataIndex: "sat",
                    width: 60,
                    render: (text, record) => (
                        <InputNumber
                            value={text}
                            style={{ width: "50px" }}
                            onChange={(value) =>
                                handleInputChange(value, "sat", record.key)
                            }
                        />
                    ),
                },
                {
                    title: "FG",
                    dataIndex: "finished_goods",
                    key: "finished_goods",
                    sorter: (a, b) => a.finished_goods - b.finished_goods,
                    width: 60,
                    editable: true,
                },
            ],
        },
        {
            title: "Board Process",
            children: [
                {
                    title: "CR",
                    dataIndex: "creaser",
                    key: "creaser",
                    sorter: (a, b) => a.creaser - b.creaser,
                    width: 60,
                },
                {
                    title: "FP",
                    dataIndex: "flexo_print",
                    key: "flexo_print",
                    sorter: (a, b) => a.flexo_print - b.flexo_print,
                    width: 60,
                },
                {
                    title: "P-S",
                    dataIndex: "printer_slotter",
                    key: "printer_slotter",
                    sorter: (a, b) => a.printer_slotter - b.printer_slotter,
                    width: 60,
                },
                {
                    title: "SLO",
                    dataIndex: "slotting",
                    key: "slotting",
                    sorter: (a, b) => a.slotting - b.slotting,
                    width: 60,
                },
                {
                    title: "CLA",
                    dataIndex: "clapper",
                    key: "clapper",
                    sorter: (a, b) => a.clapper - b.clapper,
                    width: 60,
                },
                {
                    title: "D-C",
                    dataIndex: "diecut",
                    key: "diecut",
                    sorter: (a, b) => a.diecut - b.diecut,
                    width: 60,
                },
                {
                    title: "ST",
                    dataIndex: "stitching",
                    key: "stitching",
                    sorter: (a, b) => a.stitching - b.stitching,
                    width: 60,
                },
                {
                    title: "DE",
                    dataIndex: "detach",
                    key: "detach",
                    sorter: (a, b) => a.detach - b.detach,
                    width: 60,
                },
                {
                    title: "GL",
                    dataIndex: "gluing",
                    key: "gluing",
                    sorter: (a, b) => a.gluing - b.gluing,
                    width: 60,
                },
                {
                    title: "P-A",
                    dataIndex: "pre_assembly",
                    key: "pre_assembly",
                    sorter: (a, b) => a.pre_assembly - b.pre_assembly,
                    width: 60,
                },
                {
                    title: "M-S",
                    dataIndex: "manual_slotting",
                    key: "manual_slotting",
                    sorter: (a, b) => a.manual_slotting - b.manual_slotting,
                    width: 60,
                },
                {
                    title: "PA",
                    dataIndex: "packing",
                    key: "packing",
                    sorter: (a, b) => a.packing - b.packing,
                    width: 60,
                },
                {
                    title: "P-A",
                    dataIndex: "pallet_assembly",
                    key: "pallet_assembly",
                    sorter: (a, b) => a.pallet_assembly - b.pallet_assembly,
                    width: 60,
                },
                {
                    title: "M-P",
                    dataIndex: "manual_printing",
                    key: "manual_printing",
                    sorter: (a, b) => a.manual_printing - b.manual_printing,
                    width: 60,
                },
                {
                    title: "M-C",
                    dataIndex: "manual_cutting",
                    key: "manual_cutting",
                    sorter: (a, b) => a.manual_cutting - b.manual_cutting,
                    width: 60,
                },
                {
                    title: "LAM",
                    dataIndex: "laminating",
                    key: "laminating",
                    sorter: (a, b) => a.laminating - b.laminating,
                    width: 60,
                },
                {
                    title: "B-A",
                    dataIndex: "box_assembly",
                    key: "box_assembly",
                    sorter: (a, b) => a.box_assembly - b.box_assembly,
                    width: 60,
                },
            ],
        },
        {
            title: "Foam Process",
            children: [
                {
                    title: "M-C",
                    dataIndex: "fp_manual_cutting",
                    key: "fp_manual_cutting",
                    sorter: (a, b) => a.fp_manual_cutting - b.fp_manual_cutting,
                    width: 60,
                },
                {
                    title: "DE",
                    dataIndex: "fp_diecut",
                    key: "fp_diecut",
                    sorter: (a, b) => a.fp_diecut - b.fp_diecut,
                    width: 60,
                },
                {
                    title: "B-S",
                    dataIndex: "bandsaw",
                    key: "bandsaw",
                    sorter: (a, b) => a.bandsaw - b.bandsaw,
                    width: 60,
                },
                {
                    title: "SK",
                    dataIndex: "skiving",
                    key: "skiving",
                    sorter: (a, b) => a.skiving - b.skiving,
                    width: 60,
                },
                {
                    title: "DE",
                    dataIndex: "fp_detach",
                    key: "fp_detach",
                    sorter: (a, b) => a.fp_detach - b.fp_detach,
                    width: 60,
                },
                {
                    title: "H-P",
                    dataIndex: "heating_plate",
                    key: "heating_plate",
                    sorter: (a, b) => a.heating_plate - b.heating_plate,
                    width: 60,
                },
                {
                    title: "H-M",
                    dataIndex: "hotmelt",
                    key: "hotmelt",
                    sorter: (a, b) => a.hotmelt - b.hotmelt,
                    width: 65,
                },
                {
                    title: "A-H",
                    dataIndex: "assembly_heating",
                    key: "assembly_heating",
                    sorter: (a, b) => a.assembly_heating - b.assembly_heating,
                    width: 60,
                },
                {
                    title: "M-P",
                    dataIndex: "fp_manual_printing",
                    key: "fp_manual_printing",
                    sorter: (a, b) =>
                        a.fp_manual_printing - b.fp_manual_printing,
                    width: 60,
                },
                {
                    title: "SE",
                    dataIndex: "sealing",
                    key: "sealing",
                    sorter: (a, b) => a.sealing - b.sealing,
                    width: 60,
                },
                {
                    title: "PA",
                    dataIndex: "fp_packing",
                    key: "fp_packing",
                    sorter: (a, b) => a.fp_packing - b.fp_packing,
                    width: 60,
                },
            ],
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
                    PRODUCTION PLAN
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
                    PRODUCTION PLAN
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
                <Tooltip title="Export" placement="right">
                    <Dropdown overlay={exportMenu} placement="bottomRight">
                        <Button
                            icon={<FileExcelOutlined />}
                            style={{
                                marginRight: 8,
                                borderRadius: "50%",
                                textAlign: "center",
                                alignContent: "center",
                                color: "#1E90FF",
                            }}
                        />
                    </Dropdown>
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
                    scroll={{ x: 800 }}
                    style={{ backgroundColor: "#f0f2f5" }}
                />
            </div>

            <ProductionProcessModal
                visible={openProcessModal}
                onClose={handleCloseProcessModal}
                process="Viewer"
                data={productionPlan}
            />
        </>
    );
}
