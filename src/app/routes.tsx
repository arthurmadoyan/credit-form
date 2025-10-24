import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "../widgets/Layout/Layout";
import PersonalFormPage from "../pages/PersonalDataPage/PersonalDataPage";
import AddressDataPage from "../pages/AddressDataPage/AddressDataPage";
import CreditParametersPage from "../pages/CreditParametersPage/CreditParametersPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Navigate to="/step1" />,
            },
            { path: "step1", element: <PersonalFormPage /> },
            { path: "step2", element: <AddressDataPage /> },
            { path: "step3", element: <CreditParametersPage /> },
        ],
    },
]);


