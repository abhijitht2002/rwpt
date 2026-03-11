import API from "../api/axios";

export const searchTasksAPI = async (search) => {
    const res = await API.get("/tasks/search", { params: search ? { search } : {} })
    // console.log(res);
    return res.data
}

export const getTasksAPI = async (filter, page = 1, limit = 10) => {
    const res = await API.get(`/tasks/filter/${filter}`, {
        params: { page, limit },
    })
    // console.log(res);
    return res.data
}

export const getTaskByIdAPI = async (id) => {
    const res = await API.get(`/tasks/${id}`)
    // console.log(res);
    return res.data
}

export const startTaskAPI = async (id) => {
    const res = await API.post(`/tasks/${id}/start`)
    // console.log(res);
    return res.data
}

export const endTaskAPI = async (id, t, comment) => {
    const res = await API.post(`/tasks/${id}/stop`,
        { comment },
        { params: { t } }
    )
    // console.log(res);
    return res.data
}
