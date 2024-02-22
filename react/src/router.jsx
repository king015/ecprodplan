import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Users from "./views/Users";
import NotFound from "./views/notfound/NotFound";
import DefaultLayouts from "./components/layouts/DefaultLayouts";
import GuestLayouts from "./components/layouts/GuestLayouts";
import Dashboard from "./views/Dashboard";
import UserForm from "./views/UserForm";
import FinishedGoods from "./views/FinishedGoods";

import ProductionPlan from "./views/ProductionPlan";
import Logs from "./views/Views";
import WorkInProcess from "./views/WorkInProcess";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayouts />,
        children: [
            {
                path: "/",
                element: <Navigate to="/users" />,
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
