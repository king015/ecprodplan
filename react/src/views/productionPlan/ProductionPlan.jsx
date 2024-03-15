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
} from "antd";
import {
    SyncOutlined,
    EditOutlined,
    DeleteOutlined,
    FileExcelOutlined,
} from "@ant-design/icons";
import axiosClient from "../../axios-client";
import { exportToCSV, exportToExcel } from "../../exportUtils";

const { Text } = Typography;

export default function FinishedGoods() {
    const [productionPlan, setProductionPlan] = useState([]);
    const [loading, setLoading] = useState(false);
    // const { setNotification } = useStateContext();

    const [filterValue, setFilterValue] = useState("");
    const [pagination, setPagination] = useState({ current: 1, pageSize: 5 });

    useEffect(() => {
        getProductionPlan();
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
            .get("/finished_goods_data")
            .then((response) => {
                const finishedGoodsData =
                    response.data.finished_goods_data || [];
                // Map finished goods data to match the structure of workInProcess
                const mappedData = finishedGoodsData.map((item) => ({
                    ...item,
                    // Add dummy values for other columns not present in finished goods data
                    creaser: null,
                    flexo_print: null,
                    // Add more dummy values for other board process columns
                    // Add dummy values for foam process columns as well
                }));
                setProductionPlan(mappedData);
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
            width: 500,
            sorter: (a, b) => a.item_description - b.item_description,
        },
        {
            title: "Part Number",
            dataIndex: "partNumber",
            key: "partNumber",
            fixed: "left",
            width: 150,
            sorter: (a, b) => a.part_number - b.part_number,
        },
        {
            title: "WR",
            dataIndex: "weekly_requisites",
            key: "weekly_requisites",
            fixed: "left",
            width: 60,
            sorter: (a, b) => a.weekly_requisites - b.weekly_requisites,
        },
        {
            title: "For Schedule",
            children: [
                {
                    title: "M",
                    dataIndex: "mon",
                    key: "mon",
                    sorter: (a, b) => a.mon - b.mon,
                    width: 60,
                },
                {
                    title: "T",
                    dataIndex: "tues",
                    key: "tues",
                    sorter: (a, b) => a.tues - b.tues,
                    width: 60,
                },
                {
                    title: "W",
                    dataIndex: "wed",
                    key: "wed",
                    sorter: (a, b) => a.wed - b.wed,
                    width: 60,
                },
                {
                    title: "TH",
                    dataIndex: "thurs",
                    key: "thurs",
                    sorter: (a, b) => a.thurs - b.thurs,
                    width: 60,
                },
                {
                    title: "F",
                    dataIndex: "fri",
                    key: "fri",
                    sorter: (a, b) => a.fri - b.fri,
                    width: 60,
                },
                {
                    title: "S",
                    dataIndex: "sat",
                    key: "sat",
                    sorter: (a, b) => a.sat - b.sat,
                    width: 60,
                },
                {
                    title: "FG",
                    dataIndex: "finished_goods",
                    key: "finished_goods",
                    sorter: (a, b) => a.finished_goods - b.finished_goods,
                    width: 60,
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
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: "1px solid #ddd",
                    paddingBottom: 8,
                }}
            >
                <Typography.Title level={3} style={{ marginRight: 16 }}>
                    Production Plan
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
                    borderBottom: "1px solid #ddd",
                    paddingBottom: 8,
                }}
            ></div>

            <div
                style={{
                    marginBottom: "16px",
                    display: "flex",
                    alignItems: "center",
                    paddingBottom: 8,
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
                    style={{ marginRight: "8px", width: "200px" }}
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
        </>
    );
}
