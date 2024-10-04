import { createBrowserRouter } from "react-router-dom";
import MainLayout from '../Layout/MainLayout';
import HomePage from "../Pages/HomePage/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },
]);

export default router;
