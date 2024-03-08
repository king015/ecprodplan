import { Button, Card, Table, Spin, Divider } from "antd";
import { Line } from "@ant-design/charts";
import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import { Link } from "react-router-dom";

function Dashboard() {
    const [activityData, setActivityData] = useState([]);
    const [loading, setLoading] = useState(true);
    const usersValue = 0;
    const workInProgressValue = 0;
    const finishedGoodsValue = 0;

    const data = [
        { year: "2021", value: 3 },
        { year: "2022", value: 4 },
        { year: "2023", value: 3.5 },
        { year: "2024", value: 5 },
    ];

    const chartConfig = {
        data: data,
        xField: "year",
        yField: "value",
        height: 400,
        point: {
            size: 5,
            shape: "diamond",
            style: {
                fill: "white",
                stroke: "#5B8FF9",
                lineWidth: 2,
            },
        },
        label: {
            style: {
                fill: "#aaa",
            },
        },
    };

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
            dataIndex: "timestamps",
            key: "timestamps",
            sorter: (a, b) => new Date(a.timestamps) - new Date(b.timestamps),
            sortDirections: ["ascend", "descend"],
        },
        {
            title: "User",
            dataIndex: "user_id",
            key: "user_id",
            sorter: (a, b) => a.user_id.localeCompare(b.user_id),
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
            } finally {
                setLoading(false);
            }
        };

        fetchActivityData();

        const intervalId = setInterval(fetchActivityData, 5000);

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
                textAlign: "left",
                marginLeft: "20px",
            }}
        >
            <h1
                style={{
                    fontSize: "2.5rem",
                    fontWeight: "bold",
                    marginBottom: "20px",
                    color: "#333",
                }}
            >
                Dashboard
            </h1>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    maxWidth: "1700px",
                    width: "100%",
                    margin: "0 auto",
                }}
            >
                <div
                    style={{
                        padding: "20px",
                        margin: "10px",
                        width: "calc(33% - 20px)",
                        transition: "transform 0.3s",
                    }}
                >
                    <Card
                        key="users"
                        title="Users"
                        bordered={false}
                        style={{
                            borderRadius: "8px",
                            background:
                                "linear-gradient(45deg, #FF6B81, #FF8E53)",
                            color: "#fff",
                            width: "100%",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                            transition: "transform 0.3s",
                        }}
                        hoverable
                        actions={[
                            <Link key="users-link" to="/users">
                                <Button
                                    type="primary"
                                    style={{
                                        marginTop: "10px",
                                        background: "#ff9a00",
                                        borderColor: "#ff9a00",
                                    }}
                                >
                                    View
                                </Button>
                            </Link>,
                        ]}
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
                    </Card>
                </div>

                <div
                    style={{
                        padding: "20px",
                        margin: "10px",
                        width: "calc(33% - 20px)",
                        transition: "transform 0.3s",
                    }}
                >
                    <Card
                        key="work-in-process"
                        title="Work In Process"
                        bordered={false}
                        style={{
                            borderRadius: "8px",
                            background:
                                "linear-gradient(45deg, #00DBDE, #FC00FF)",
                            color: "#fff",
                            width: "100%",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                            transition: "transform 0.3s",
                        }}
                        hoverable
                        actions={[
                            <Link
                                key="work-in-process-link"
                                to="/work-in-process"
                            >
                                <Button
                                    type="primary"
                                    style={{
                                        marginTop: "10px",
                                        background: "#00FFC8",
                                        borderColor: "#00FFC8",
                                    }}
                                >
                                    View
                                </Button>
                            </Link>,
                        ]}
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
                    </Card>
                </div>

                <div
                    style={{
                        padding: "20px",
                        margin: "10px",
                        width: "calc(33% - 20px)",
                        transition: "transform 0.3s",
                    }}
                >
                    <Card
                        key="finished-goods"
                        title="Finished Goods"
                        bordered={false}
                        style={{
                            borderRadius: "8px",
                            background:
                                "linear-gradient(45deg, #E8CBC0, #636FA4)",
                            color: "#fff",
                            width: "100%",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                            transition: "transform 0.3s",
                        }}
                        hoverable
                        actions={[
                            <Link
                                key="finished-goods-link"
                                to="/finished-goods"
                            >
                                <Button
                                    type="primary"
                                    style={{
                                        marginTop: "10px",
                                        background: "#B06AB3",
                                        borderColor: "#B06AB3",
                                    }}
                                >
                                    View
                                </Button>
                            </Link>,
                        ]}
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
                    </Card>
                </div>
            </div>

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 20,
                    background:
                        "linear-gradient(180deg, #ffffff 0%, #f0f2f5 100%)",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    padding: "20px",
                    maxWidth: "1700px",
                    margin: "20px auto",
                }}
            >
                <div style={{ width: "60%", marginRight: 10 }}>
                    <Spin spinning={loading}>
                        <Line
                            {...chartConfig}
                            style={{
                                background: "#fff",
                                borderRadius: "8px",
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                            }}
                            interactions={[
                                {
                                    type: "slider",
                                    cfg: {
                                        start: 0,
                                        end: 1,
                                    },
                                },
                                {
                                    type: "tooltip",
                                },
                            ]}
                            animation={false}
                        />
                    </Spin>
                </div>
                <div
                    style={{
                        width: "100%",
                        maxWidth: "800px",
                        margin: "0 auto",
                        background: "#fff",
                        padding: "20px",
                        borderRadius: "8px",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        marginBottom: "20px",
                    }}
                >
                    <h4
                        style={{
                            marginBottom: "20px",
                            color: "#333",
                            fontSize: "1.5rem",
                            textAlign: "center",
                            fontWeight: "bold",
                        }}
                    >
                        Activity Logs
                    </h4>
                    <Divider style={{ marginBottom: "20px" }} />{" "}
                    <Spin spinning={loading}>
                        <Table
                            dataSource={activityData}
                            columns={columns}
                            pagination={false}
                            scroll={{ y: 400 }}
                            bordered
                            style={{ borderRadius: "8px" }}
                        />
                    </Spin>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
