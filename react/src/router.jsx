import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "./views/login/Login";
import Signup from "./views/signup/Signup";
import Users from "./views/users/Users";
import NotFound from "./views/notfound/NotFound";
import DefaultLayouts from "./components/layouts/DefaultLayouts";
import GuestLayouts from "./components/layouts/GuestLayouts";
import Dashboard from "./views/dashboard/Dashboard";
import UserForm from "./views/users/UserForm";
import FinishedGoods from "./views/finishedGoods/FinishedGoods";

import ProductionPlan from "./views/productionPlan/ProductionPlan";

import WorkInProcess from "./views/wip/WorkInProcess";
import Logs from "./views/logs/Logs";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayouts />,
        children: [
            {
                path: "/",
                element: <Navigate to="/dashboard" />,
            },
            {
                path: "/users",
                element: <Users />,
            },
            {
                path: "/dashboard",
                element: <Dashboard />,
            },
            {
                path: "/production-plan",
                element: <ProductionPlan />,
            },
            {
                path: "/finished-goods",
                element: <FinishedGoods />,
            },
            {
                path: "/work-in-process",
                element: <WorkInProcess />,
            },
            {
                path: "/logs",
                element: <Logs />,
            },
            {
                path: "/users/new",
                element: <UserForm key="userCreate" />,
            },
            {
                path: "/users/:id",
                element: <UserForm key="userUpdate" />,
            },
        ],
    },
    {
        path: "/",
        element: <GuestLayouts />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <Signup />,
            },
        ],
    },

    {
        path: "*",
        element: <NotFound />,
    },
]);

export default router;
