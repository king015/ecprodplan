import { Button, Card, Table } from "antd";
import { Line } from "@ant-design/charts";
import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import { Link } from "react-router-dom";

function Dashboard() {
    const [activityData, setActivityData] = useState([]);
    const usersValue = 20;
    const workInProgressValue = 25;
    const finishedGoodsValue = 30;

    const data = [
        { year: "2021", value: 3 },
        { year: "2022", value: 4 },
        { year: "2023", value: 3.5 },
        { year: "2024", value: 5 },
    ];

    // Chart configuration
    const chartConfig = {
        data: data,
        xField: "year",
        yField: "value",
        height: 400, // Increased height for better visibility
        point: {
            size: 5,
            shape: "diamond",
            style: {
                fill: "white", // Color of the points
                stroke: "#5B8FF9", // Border color of the points
                lineWidth: 2, // Border width of the points
            },
        },
        label: {
            style: {
                fill: "#aaa",
            },
        },
    };

    // Columns configuration for the table
    const columns = [
        {
            title: "Activity",
            dataIndex: "activity",
            key: "activity",
            sorter: (a, b) => a.activity.localeCompare(b.activity),
            sortDirections: ["ascend", "descend"],
        },
        {
            title: "Time",
            dataIndex: "time",
            key: "time",
            sorter: (a, b) => new Date(a.time) - new Date(b.time),
            sortDirections: ["ascend", "descend"],
        },
        {
            title: "User",
            dataIndex: "user",
            key: "user",
            sorter: (a, b) => a.user.localeCompare(b.user),
            sortDirections: ["ascend", "descend"],
        },
    ];

    useEffect(() => {
        const fetchActivityData = async () => {
            try {
                const response = await axiosClient.get("/activity-log");
                setActivityData(response.data);
            } catch (error) {
                console.error("Error fetching activity data:", error);
            }
        };

        // Fetch activity data initially
        fetchActivityData();

        // Fetch activity data periodically every 5 seconds
        const intervalId = setInterval(fetchActivityData, 5000);

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "20px",
                background: "#f0f2f5",
            }}
        >
            <div style={{ display: "flex", justifyContent: "center" }}>
                <div style={{ padding: "20px", margin: "0 10px" }}>
                    <Card
                        title="Users"
                        bordered={false}
                        style={{
                            borderRadius: "8px",
                            background:
                                "linear-gradient(45deg, #ff9a9e, #fad0c4)",
                            color: "#fff",
                            width: "385px",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        <p
                            style={{
                                fontSize: "1.2rem",
                                fontWeight: "bold",
                                marginTop: "10px",
                            }}
                        >
                            Total Users: {usersValue}
                        </p>
                        {/* Button linking to the Users section */}
                        <Link to="/users">
                            <Button
                                type="primary"
                                style={{
                                    marginTop: "10px",
                                    background: "#FF6B81",
                                    borderColor: "#FF6B81",
                                }}
                            >
                                View
                            </Button>
                        </Link>
                    </Card>
                </div>
                <div style={{ padding: "20px", margin: "0 10px" }}>
                    <Card
                        title="Work In Process"
                        bordered={false}
                        style={{
                            borderRadius: "8px",
                            background:
                                "linear-gradient(45deg, #96fbc4, #f9f586)",
                            color: "#333",
                            width: "385px",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        <p
                            style={{
                                fontSize: "1.2rem",
                                fontWeight: "bold",
                                marginTop: "10px",
                            }}
                        >
                            Total Work In Process: {workInProgressValue}
                        </p>
                        {/* Button linking to the Work In Process section */}
                        <Link to="/work-in-process">
                            <Button
                                type="primary"
                                style={{
                                    marginTop: "10px",
                                    background: "#82ca9d",
                                    borderColor: "#82ca9d",
                                }}
                            >
                                View
                            </Button>
                        </Link>
                    </Card>
                </div>
                <div style={{ padding: "20px", margin: "0 10px" }}>
                    <Card
                        title="Finished Goods"
                        bordered={false}
                        style={{
                            borderRadius: "8px",
                            background:
                                "linear-gradient(45deg, #96fbc4, #f9f586)",
                            color: "#333",
                            width: "385px",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        <p
                            style={{
                                fontSize: "1.2rem",
                                fontWeight: "bold",
                                marginTop: "10px",
                            }}
                        >
                            Total Finished Goods: {finishedGoodsValue}
                        </p>
                        {/* Button linking to the Finished Goods section */}
                        <Link to="/finished-goods">
                            <Button
                                type="primary"
                                style={{
                                    marginTop: "10px",
                                    background: "#f6cd61",
                                    borderColor: "#f6cd61",
                                }}
                            >
                                View
                            </Button>
                        </Link>
                    </Card>
                </div>
            </div>

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 20,
                    background: "#fff",
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    padding: "20px",
                    overflow: "auto",
                    width: "100%",
                    maxWidth: "1270px",
                }}
            >
                <div style={{ width: "60%", marginRight: 10 }}>
                    <Line {...chartConfig} />
                </div>
                <div style={{ width: "40%" }}>
                    <h4 style={{ marginBottom: "20px", color: "#333" }}>
                        Activity Table
                    </h4>
                    <Table
                        dataSource={activityData}
                        columns={columns}
                        pagination={false}
                        scroll={{ y: 400 }}
                    />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
