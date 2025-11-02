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
import CartPage from "../Pages/CartPage/CartPage";
import CheckoutPage from "../Pages/CheckoutPage/CheckoutPage";
import PaymentSuccessPage from "../Pages/PaymentSuccessPage/PaymentSuccessPage";
import PaymentFailurePage from "../Pages/PaymentFailurePage/PaymentFailurePage";
import OverviewPage from "../Pages/Dashboard/Overview/OverviewPage";
import ProfilePage from "../Pages/Dashboard/Profile/ProfilePage";
import MyOrders from "../Pages/Dashboard/MyOrders/MyOrders";
import AllUser from "../Pages/Dashboard/AllUser/AllUser";
import AddMenuPage from "../Pages/Dashboard/AddMenu/AddMenuPage";
import ManageOrders from "../Pages/Dashboard/ManageOrders/ManageOrders";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "about", element: <AboutPage /> },
      { path: "menu", element: <MenuPage /> },
      { path: "menu-details/:id", element: <MenuDetailsPage /> },
      { path: "chef", element: <ChefPage /> },
      { path: "chef-details/:id", element: <ChefDetailsPage /> },
      { path: "blog", element: <BlogPage /> },
      { path: "blog-details/:id", element: <BlogDetailsPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "cart", element: <CartPage /> },
      { path: "checkout", element: <CheckoutPage /> },
      { path: "payment/success", element: <PaymentSuccessPage /> },
      { path: "payment/failure", element: <PaymentFailurePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
    ],
  },
  // Dashboard routes should be a separate object
  {
    path: "/dashboard",
    element: (
      // <ProtectedRoute>
      <DashboardLayout />
      // </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      // admin only
      { path: "overview", element: <OverviewPage /> },
      { path: "menu", element: <MenuPage /> }, // admin and chef both can access
      { path: "add-menu", element: <AddMenuPage /> }, // admin and chef both can access
      { path: "users", element: <AllUser /> },
      { path: "manage-orders", element: <ManageOrders /> },

      // customers
      { path: "profile", element: <ProfilePage /> },
      { path: "myOrders", element: <MyOrders /> },
    ],
  },
]);

export default router;
