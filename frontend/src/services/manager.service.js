import API from "../api/axios"

export const createTaskAPI = async (data) => {
    const res = await API.post("/manager/tasks", data)
    // console.log(res);
    return res.data
}

export const getEmployeesAPI = async (search) => {
    const res = await API.get("/manager/employees", { params: search ? { search } : {} })
    // console.log(res);
    return res.data
}
