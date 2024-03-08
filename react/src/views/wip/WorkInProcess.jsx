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
    Modal,
} from "antd";
import {
    EditOutlined,
    DeleteOutlined,
    PlusCircleOutlined,
    SyncOutlined,
} from "@ant-design/icons";
import axiosClient from "../../axios-client";
import WorkInProcessModal from "./WorkInProcessModal";

const { Text } = Typography;

export default function FinishedGoods() {
    const [workInProcess, setWorkInProcess] = useState([]);

    const [loading, setLoading] = useState(false);
    // const { setNotification } = useStateContext();
    const [openModal, setOpenModal] = useState(false);
    const [filterValue, setFilterValue] = useState("");
    const [pagination, setPagination] = useState({ current: 1, pageSize: 5 });

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    useEffect(() => {
        getWorkInProcess();
    }, []);

    const onDeleteClick = (wip) => {
        Modal.confirm({
            title: "Delete data",
            content: "Are you sure you want to delete this data?",
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            onOk() {
                axiosClient
                    .delete(`/work_in_processes/${wip.id}`)
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
            .get("/work_in_processes")
            .then(({ data }) => {
                setLoading(false);
                if (data && data.work_in_processes) {
                    console.log("Fetched data:", data);
                    const processedData = data.work_in_processes.map((wip) => ({
                        ...wip,
                        customer: wip.finished_goods.customer,
                        code: wip.finisheds_good.code,
                        itemDescription: wip.finished_goods.itemDescription,
                        partNumber: wip.finished_goods.partNumber,
                    }));
                    console.log("Processed data:", processedData);
                    setWorkInProcess(processedData);
                } else {
                    console.error("Error: No work in process data found");
                    message.error(
                        "Failed to fetch data. No work in process data found."
                    );
                }
            })
            .catch((error) => {
                setLoading(false);
                console.error("Error fetching data:", error);
                message.error("Failed to fetch data. Please try again.");
            });
    };

    const handleRefresh = () => {
        getWorkInProcess();
    };

    const handleFilterChange = (event) => {
        setFilterValue(event.target.value);
    };

    const filteredData = Array.isArray(workInProcess)
        ? workInProcess.filter((fg) =>
              Object.values(fg).some(
                  (value) =>
                      value &&
                      typeof value === "string" &&
                      value.toLowerCase().includes(filterValue.toLowerCase())
              )
          )
        : [];

    const columns = [
        {
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
            key: "action",
            fixed: "left",
            width: 35,
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
            width: 100,
            sorter: (a, b) => a.code - b.code,
        },
        {
            title: "Item Description",
            dataIndex: "itemDescription",
            key: "itemDescription",
            fixed: "left",
            width: 500,
            sorter: (a, b) => a.itemDescription - b.itemDescription,
        },
        {
            title: "Part Number",
            dataIndex: "partNumber",
            key: "partNumber",
            fixed: "left", // Fixed column
            width: 150,
            sorter: (a, b) => a.partNumber - b.partNumber,
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
                    width: 60,
                    sorter: (a, b) => a.clapper - b.clapper,
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
                    width: 60,
                    sorter: (a, b) => a.stitching - b.stitching,
                },
                {
                    title: "DE",
                    dataIndex: "detach",
                    key: "detach",
                    width: 60,
                    sorter: (a, b) => a.detach - b.detach,
                },
                {
                    title: "GL",
                    dataIndex: "gluing",
                    key: "gluing",
                    width: 60,
                    sorter: (a, b) => a.gluing - b.gluing,
                },
                {
                    title: "P-A",
                    dataIndex: "pre_assembly",
                    key: "pre_assembly",
                    width: 60,
                    sorter: (a, b) => a.pre_assembly - b.pre_assembly,
                },
                {
                    title: "M-S",
                    dataIndex: "manual_slotting",
                    key: "manual_slotting",
                    width: 60,
                    sorter: (a, b) => a.manual_slotting - b.manual_slotting,
                },
                {
                    title: "PA",
                    dataIndex: "packing",
                    key: "packing",
                    width: 60,
                    sorter: (a, b) => a.packing - b.packing,
                },
                {
                    title: "PAL-A",
                    dataIndex: "pallet_assembly",
                    key: "pallet_assembly",
                    sorter: (a, b) => a.pallet_assembly - b.pallet_assembly,
                    width: 60,
                },
                {
                    title: "M-P",
                    dataIndex: "manual_printing",
                    key: "manual_printing",
                    width: 60,
                    sorter: (a, b) => a.manual_printing - b.manual_printing,
                },
                {
                    title: "M-C",
                    dataIndex: "manual_cutting",
                    key: "manual_cutting",
                    width: 60,
                    sorter: (a, b) => a.manual_cutting - b.manual_cutting,
                },
                {
                    title: "LAM",
                    dataIndex: "laminating",
                    key: "laminating",
                    width: 60,
                    sorter: (a, b) => a.laminating - b.laminating,
                },
                {
                    title: "B-A",
                    dataIndex: "box_assembly",
                    key: "box_assembly",
                    width: 60,
                    sorter: (a, b) => a.box_assembly - b.box_assembly,
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
                    width: 60,
                    sorter: (a, b) => a.fp_manual_cutting - b.fp_manual_cutting,
                },
                {
                    title: "D-C",
                    dataIndex: "fp_diecut",
                    key: "fp_diecut",
                    width: 60,
                    sorter: (a, b) => a.fp_diecut - b.fp_diecut,
                },
                {
                    title: "B-S",
                    dataIndex: "bandsaw",
                    key: "bandsaw",
                    width: 60,
                    sorter: (a, b) => a.bandsaw - b.bandsaw,
                },
                {
                    title: "SK",
                    dataIndex: "skiving",
                    key: "skiving",
                    width: 60,
                    sorter: (a, b) => a.skiving - b.skiving,
                },
                {
                    title: "DE",
                    dataIndex: "fp_detach",
                    key: "fp_detach",
                    width: 60,
                    sorter: (a, b) => a.fp_detach - b.fp_detach,
                },
                {
                    title: "H-P",
                    dataIndex: "heating_plate",
                    key: "heating_plate",
                    width: 60,
                    sorter: (a, b) => a.heating_plate - b.heating_plate,
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
                    width: 60,
                    sorter: (a, b) => a.assembly_heating - b.assembly_heating,
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
                    width: 60,
                    sorter: (a, b) => a.sealing - b.sealing,
                },
                {
                    title: "PA",
                    dataIndex: "fp_packing",
                    key: "fp_packing",
                    width: 60,
                    sorter: (a, b) => a.fp_packing - b.fp_packing,
                },
            ],
        },
    ];

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
                    Work In Process
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

                <Tooltip title="Add" placement="right">
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
                    scroll={{ x: 1000 }}
                    style={{ backgroundColor: "#f0f2f5" }}
                />
            </div>
            <WorkInProcessModal
                open={openModal}
                handleClose={handleCloseModal}
            />
        </>
    );
}
