import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import DashboardLayout from "../Layout/DashboardLayout";
import ProtectedRoute from "../Components/Shared/ProtectedRoute/ProtectedRoute";
import HomePage from "../Pages/HomePage/HomePage";
import MenuPage from "../Pages/MenuPage/MenuPage";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import LoginPage from "../Pages/LoginPage/LoginPage";
import RegisterPage from "../Pages/RegisterPage/RegisterPage";
import ChefPage from "../Pages/ChefPage/ChefPage";
import BlogPage from "../Pages/BlogPage/BlogPage";
import BlogDetailsPage from "../Pages/BlogDetailsPage/BlogDetailsPage";
import MenuDetailsPage from "../Pages/MenuDetailsPage.jsx/MenuDetailsPage";
import ChefDetailsPage from "../Pages/ChefDetailsPage/ChefDetailsPage";
import AboutPage from "../Pages/AboutPage/AboutPage";
import ContactPage from "../Pages/ContactPage/ContactPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "menu",
        element: <MenuPage />,
      },
      {
        path: "menu-details/:id",
        element: <MenuDetailsPage />,
      },
      {
        path: "chef",
        element: <ChefPage />,
      },
      {
        path: "chef-details/:id",
        element: <ChefDetailsPage />,
      },
      {
        path: "blog",
        element: <BlogPage />,
      },
      {
        path: "blog-details/:id",
        element: <BlogDetailsPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
  // Dashboard routes with DashboardLayout and ProtectedRoute
  {
    path: "/dashboard",
    element: (
      // <ProtectedRoute>
      <DashboardLayout />
      // </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [],
  },
]);

export default router;
