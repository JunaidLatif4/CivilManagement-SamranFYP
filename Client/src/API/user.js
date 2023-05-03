import axios from "../AxiosInstance";

// Helper :
import AuthTokenGen from "../Utils/AuthTokenGen"





const GetAllUsersAPI = async () => {
    let resolved = {
        error: null,
        data: null
    }

    try {
        let res = await axios({
            url: "/users",
            method: "GET",
            headers: AuthTokenGen()
        })
        resolved.data = res.data
    } catch (err) {
        if (err && err.response && err?.response?.data?.message) {
            resolved.error = err.response.data.message
        } else {
            resolved.error = "Something went Wrong"
        }
    }
    return resolved;
}
const GetAllClientsAPI = async () => {
    let resolved = {
        error: null,
        data: null
    }

    try {
        let res = await axios({
            url: "/users/getAll/clients",
            method: "GET",
            headers: AuthTokenGen()
        })
        resolved.data = res.data
    } catch (err) {
        if (err && err.response && err?.response?.data?.message) {
            resolved.error = err.response.data.message
        } else {
            resolved.error = "Something went Wrong"
        }
    }
    return resolved;
}
const GetAllContractorsAPI = async () => {
    let resolved = {
        error: null,
        data: null
    }

    try {
        let res = await axios({
            url: "/users/getAll/contractors",
            method: "GET",
            headers: AuthTokenGen()
        })
        resolved.data = res.data
    } catch (err) {
        if (err && err.response && err?.response?.data?.message) {
            resolved.error = err.response.data.message
        } else {
            resolved.error = "Something went Wrong"
        }
    }
    return resolved;
}
const GetAllEnginnersAPI = async () => {
    let resolved = {
        error: null,
        data: null
    }

    try {
        let res = await axios({
            url: "/users/getAll/engineers",
            method: "GET",
            headers: AuthTokenGen()
        })
        resolved.data = res.data
    } catch (err) {
        if (err && err.response && err?.response?.data?.message) {
            resolved.error = err.response.data.message
        } else {
            resolved.error = "Something went Wrong"
        }
    }
    return resolved;
}

const CreateUserAPI = async (formData) => {
    let resolved = {
        error: null,
        data: null
    }

    try {
        let res = await axios({
            url: "/users",
            method: "POST",
            data: formData,
            headers: AuthTokenGen()
        })
        resolved.data = res.data
    } catch (err) {
        if (err && err.response && err?.response?.data?.message) {
            resolved.error = err.response.data.message
        } else {
            resolved.error = "Something went Wrong"
        }
    }
    return resolved;
}

const GetProfileAPI = async () => {
    let resolved = {
        error: null,
        data: null
    }

    try {
        let res = await axios({
            url: `/users`,
            method: "GET",
            headers: AuthTokenGen()
        })
        resolved.data = res.data
    } catch (err) {
        if (err && err.response && err?.response?.data?.message) {
            resolved.error = err.response.data.message
        } else {
            resolved.error = "Something went Wrong"
        }
    }
    return resolved;
}

const UpdateProfileAPI = async (data) => {
    let resolved = {
        error: null,
        data: null
    }

    try {
        let res = await axios({
            url: `/users`,
            method: "PATCH",
            data,
            headers: AuthTokenGen()
        })
        resolved.data = res.data
    } catch (err) {
        if (err && err.response && err?.response?.data?.message) {
            resolved.error = err.response.data.message
        } else {
            resolved.error = "Something went Wrong"
        }
    }
    return resolved;
}

const UpdateUserAPI = async ({ id, data }) => {
    let resolved = {
        error: null,
        data: null
    }

    try {
        let res = await axios({
            url: `/users/${id}`,
            method: "PATCH",
            data,
            headers: AuthTokenGen()
        })
        resolved.data = res.data
    } catch (err) {
        if (err && err.response && err?.response?.data?.message) {
            resolved.error = err.response.data.message
        } else {
            resolved.error = "Something went Wrong"
        }
    }
    return resolved;
}


const GetAllRolesAPI = async () => {
    let resolved = {
        error: null,
        data: null
    }

    try {
        let res = await axios({
            url: "/roles",
            method: "GET",
            headers: AuthTokenGen()
        })
        resolved.data = res.data
    } catch (err) {
        if (err && err.response && err?.response?.data?.message) {
            resolved.error = err.response.data.message
        } else {
            resolved.error = "Something went Wrong"
        }
    }
    return resolved;
}

const CreateRoleAPI = async ({ name, permissions }) => {
    let resolved = {
        error: null,
        data: null
    }

    try {
        let res = await axios({
            url: "/roles",
            method: "POST",
            data: {
                name,
                permissions
            },
            headers: AuthTokenGen()
        })
        resolved.data = res.data
    } catch (err) {
        if (err && err.response && err?.response?.data?.message) {
            resolved.error = err.response.data.message
        } else {
            resolved.error = "Something went Wrong"
        }
    }
    return resolved;
}

const UpdateRoleAPI = async ({ id, name, permissions }) => {
    let resolved = {
        error: null,
        data: null
    }

    try {
        let res = await axios({
            url: `/roles/${id}`,
            method: "PUT",
            data: {
                name,
                permissions
            },
            headers: AuthTokenGen()
        })
        resolved.data = res.data
    } catch (err) {
        if (err && err.response && err?.response?.data?.message) {
            resolved.error = err.response.data.message
        } else {
            resolved.error = "Something went Wrong"
        }
    }
    return resolved;
}


const GetAllPermissionsAPI = async () => {
    let resolved = {
        error: null,
        data: null
    }

    try {
        let res = await axios({
            url: "/permissions",
            method: "GET",
            headers: AuthTokenGen()
        })
        resolved.data = res.data
    } catch (err) {
        if (err && err.response && err?.response?.data?.message) {
            resolved.error = err.response.data.message
        } else {
            resolved.error = "Something went Wrong"
        }
    }
    return resolved;
}


export { GetAllUsersAPI, GetAllRolesAPI, CreateRoleAPI, GetProfileAPI, UpdateRoleAPI, GetAllPermissionsAPI, CreateUserAPI, UpdateProfileAPI, UpdateUserAPI, GetAllClientsAPI, GetAllContractorsAPI, GetAllEnginnersAPI };