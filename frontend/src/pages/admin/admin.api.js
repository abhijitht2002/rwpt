import API from "../../api/axios";

export const createManager = async (data) => {
    const res = await API.post("/admin/managers", data)
    console.log(res);
    return res.data
}

export const listEmployees = async (page = 1, limit = 10) => {
    const res = await API.get("/admin/employees", {
        params: { page, limit },
    })
    console.log(res);
    return res.data
}

export const getEmployeeById = async (id) => {
    const res = await API.get(`/admin/employees/${id}`)
    console.log(res);
    return res.data
}

export const listManagers = async (page = 1, limit = 10) => {
    const res = await API.get("/admin/managers", {
        params: { page, limit },
    })
    console.log(res);
    return res.data
}

export const getManagerById = async (id) => {
    const res = await API.get(`/admin/managers/${id}`)
    console.log(res);
    return res.data
}


