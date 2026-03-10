import API, { setAccessToken } from "../api/axios";

export const loginAPI = async (data) => {
    const res = await API.post("/auth/login", data);

    // Save access token in memory
    setAccessToken(res.data.accessToken);

    return res.data;
};

export const logoutAPI = async () => {
    await API.post("/auth/logout");
    setAccessToken(null);
};

export const getMeAPI = async () => {
    const res = await API.get("/auth/me");
    return res.data;
};

export const genOTPAPI = async (email) => {
    const res = await API.post("/auth/generate-otp", { email })
    return res.data;
};

export const verifyAPI = async (email, otp) => {
    const res = await API.post("/auth/verify", { email, otp })
    return res.data;
};

export const registerAPI = async (formData) => {
    const res = await API.post("/auth/register", formData)
    return res.data;
};

export const forgotPasswordAPI = async (email) => {
    const res = await API.post("/auth/forgot-password", { email })
    return res.data;
};

export const resetForgotPasswordAPI = async (email, password) => {
    const res = await API.post("/auth/forgot-password/reset", { email, password })
    return res.data;
};
