import API from "../api/axios";

export const getTasksAPI = async (filter, page = 1, limit = 10) => {
    const res = await API.get(`/tasks/${filter}`, {
        params: { page, limit },
    })
    // console.log(res);
    return res.data
}
