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

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
      </Route>

      <Route path="/account" element={<AuthLayout />}>
        <Route path="verify" element={<Verification />} />
        <Route path="register" element={<CreateAccount />} />
        <Route path="login" element={<Login />} />
        <Route path="register-success" element={<Success />} />
        
        <Route path="forgot-password" element={<Forgot />} />
      </Route>

      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="summary" element={<Summary />} />
        <Route path="managers" element={<Managers />} />
        <Route path="managers/:id" element={<Manager />} />
        <Route path="employees" element={<Employees />} />
        <Route path="employees/:id" element={<Employee />} />

        <Route path="tasks/:filter" element={<TasksPage />} />

        <Route path="notes" element={<Notes />} />

        <Route path="account">
          <Route index element={<Profile />} />
          <Route path="reset-password" element={<Reset />} />
        </Route>

      </Route>
    </Routes>
  );
}

export default App;
