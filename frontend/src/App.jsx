import React from "react";
import HomePage from "./pages/home/HomePage";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import Verification from "./pages/register/Verification";
import CreateAccount from "./pages/register/CreateAccount";
import Layout from "./layout/Layout";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
      </Route>

      <Route path="/account" element={<AuthLayout />}>
        <Route path="verify" element={<Verification />} />
        <Route path="register" element={<CreateAccount />} />
      </Route>
    </Routes>
  );
}

export default App;
