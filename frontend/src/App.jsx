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
import Profile from "./pages/profile/Profile";
import Notes from "./pages/notes/Notes";
import Managers from "./pages/admin/Managers";
import Employees from "./pages/admin/Employees";
import Manager from "./pages/admin/Manager";
import Employee from "./pages/admin/Employee";

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
      </Route>

      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="summary" element={<Summary />} />
        <Route path="managers" element={<Managers />} />
        <Route path="manager" element={<Manager />} />
        <Route path="employees" element={<Employees />} />
        <Route path="employee" element={<Employee />} />
        <Route path="profile" element={<Profile />} />
        <Route path="notes" element={<Notes />} />
      </Route>
    </Routes>
  );
}

export default App;
