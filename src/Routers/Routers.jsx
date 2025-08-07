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

// Dashboard imports
// Dashboard Home Pages
import AdminDashboard from "../Pages/Dashboard/ADMIN/AdminDashboard";
import ChefDashboard from "../Pages/Dashboard/CHEF/ChefDashboard";
import UserDashboard from "../Pages/Dashboard/USER/UserDashboard";

// ADMIN Dashboard
import AddBlogPage from "../Pages/Dashboard/ADMIN/Blogs/AddBlogPage/AddBlogPage";
import BlogListPage from "../Pages/Dashboard/ADMIN/Blogs/BlogListPage/BlogListPage";
import EditBlogPage from "../Pages/Dashboard/ADMIN/Blogs/EditBlogPage/EditBlogPage";
import AllOrderPage from "../Pages/Dashboard/ADMIN/Order/AllOrderPage/AllOrderPage";
import UsersPage from "../Pages/Dashboard/ADMIN/UsersPage/UsersPage";

// CHEF Dashboard
import AddMenuPage from "../Pages/Dashboard/CHEF/Menu/AddMenuPage/AddMenuPage";
import EditMenuPage from "../Pages/Dashboard/CHEF/Menu/EditMenuPage/EditMenuPage";
import MenuListPage from "../Pages/Dashboard/CHEF/Menu/MenuListPage/MenuListPage";

// USER Dashboard
import MyOrder from "../Pages/Dashboard/USER/MyOrder/MyOrder";
import Profile from "../Pages/Dashboard/USER/Profile/Profile";
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
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      // Dashboard Home Pages
      {
        path: "admin",
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "chef",
        element: (
          <ProtectedRoute allowedRoles={['chef']}>
            <ChefDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "user",
        element: (
          <ProtectedRoute allowedRoles={['user', 'customer']}>
            <UserDashboard />
          </ProtectedRoute>
        ),
      },
      // ADMIN Dashboard Routes
      {
        path: "admin/blogs/add",
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <AddBlogPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/blogs",
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <BlogListPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/blogs/edit/:id",
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <EditBlogPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/orders",
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <AllOrderPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/users",
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <UsersPage />
          </ProtectedRoute>
        ),
      },
      // CHEF Dashboard Routes
      {
        path: "chef/menu/add",
        element: (
          <ProtectedRoute allowedRoles={['chef']}>
            <AddMenuPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "chef/menu/edit/:id",
        element: (
          <ProtectedRoute allowedRoles={['chef']}>
            <EditMenuPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "chef/menu",
        element: (
          <ProtectedRoute allowedRoles={['chef']}>
            <MenuListPage />
          </ProtectedRoute>
        ),
      },
      // USER Dashboard Routes
      {
        path: "user/orders",
        element: (
          <ProtectedRoute allowedRoles={['user', 'customer']}>
            <MyOrder />
          </ProtectedRoute>
        ),
      },
      {
        path: "user/profile",
        element: (
          <ProtectedRoute allowedRoles={['user', 'customer']}>
            <Profile />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
