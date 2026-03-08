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

export const resetAPI = async () => { };

export const forgotAPI = async () => { };

export const genOTPAPI = async () => { };

export const verifyAPI = async () => { };

export const registerAPI = async () => { };
