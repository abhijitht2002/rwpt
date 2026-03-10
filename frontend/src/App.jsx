import React from "react";
import HomePage from "./pages/home/HomePage";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import Verification from "./pages/register/Verification";
import CreateAccount from "./pages/register/CreateAccount";
import Layout from "./layout/Layout";
import Login from "./pages/login/Login";
import Success from "./pages/register/Success";
import Dashboard from "./layout/Dashboard";
import Summary from "./pages/summary/Summary";
import Profile from "./pages/account/Profile";
import Notes from "./pages/notes/Notes";
import Managers from "./pages/admin/Managers";
import Employees from "./pages/admin/Employees";
import Manager from "./pages/admin/Manager";
import Employee from "./pages/admin/Employee";
import TasksPage from "./pages/task/TasksPage";
import Reset from "./pages/account/Reset";
import Forgot from "./pages/account/Forgot";
import Task from "./pages/task/Task";
import OAuthSuccess from "./pages/oauth/OAuthSuccess";
import OAuthFailure from "./pages/oauth/OAuthFailure";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
      </Route>

      <Route path="/account" element={<PublicRoute><AuthLayout /></PublicRoute>}>
        <Route path="verify" element={<Verification />} />
        <Route path="register" element={<CreateAccount />} />
        <Route path="login" element={<Login />} />
        <Route path="register-success" element={<Success />} />

        <Route path="oauth-failure" element={<OAuthFailure />} />
        <Route path="oauth-success" element={<OAuthSuccess />} />

        <Route path="forgot-password" element={<Forgot />} />
      </Route>

      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
        <Route index element={<Summary />} />
        <Route path="managers" element={<ProtectedRoute roles={["ADMIN"]}><Managers /></ProtectedRoute>} />
        <Route path="managers/:id" element={<ProtectedRoute roles={["ADMIN"]}><Manager /></ProtectedRoute>} />
        <Route path="employees" element={<ProtectedRoute roles={["ADMIN"]}><Employees /></ProtectedRoute>} />
        <Route path="employees/:id" element={<ProtectedRoute roles={["ADMIN"]}><Employee /></ProtectedRoute>} />

        <Route path="tasks/:filter" element={<ProtectedRoute roles={["MANAGER", "EMPLOYEE"]}><TasksPage /></ProtectedRoute>} />
        <Route path="task/:id" element={<ProtectedRoute roles={["MANAGER", "EMPLOYEE"]}><Task /></ProtectedRoute>} />

        <Route path="notes" element={<ProtectedRoute><Notes /></ProtectedRoute>} />

        <Route path="account">
          <Route index element={<Profile />} />
          <Route path="reset-password" element={<Reset />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
