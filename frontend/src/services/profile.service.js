import API from "../api/axios";

export const getProfileAPI = async () => {
    const res = await API.get("/profile/");
    return res.data;
};

export const changeAvatarAPI = async (avatar) => {
    const res = await API.patch("/profile/avatar", { avatar });
    return res.data;
};

export const changePasswordAPI = async (oldPassword, newPassword) => {
    const res = await API.patch("/profile/password", { oldPassword, newPassword });
    return res.data;
};
