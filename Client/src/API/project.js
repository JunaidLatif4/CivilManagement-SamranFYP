import axios from "../AxiosInstance";

// Helper :
import AuthTokenGen from "../Utils/AuthTokenGen"





const GetAllProjectsAPI = async () => {
    let resolved = {
        error: null,
        data: null
    }

    try {
        let res = await axios({
            url: "/project",
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

const GetProjectsAPI = async (id) => {
    let resolved = {
        error: null,
        data: null
    }

    try {
        let res = await axios({
            url: `/project/${id}`,
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

const CreatProjectAPI = async (formData) => {
    let resolved = {
        error: null,
        data: null
    }

    try {
        let res = await axios({
            url: "/project",
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

const CreatProjectStepAPI = async (id, { name, description, type, reviewer }) => {
    let resolved = {
        error: null,
        data: null
    }

    try {
        let res = await axios({
            url: `/project/step/${id}`,
            method: "POST",
            data: {
                name,
                description,
                type,
                reviewer
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


export { GetAllProjectsAPI, CreatProjectAPI, CreatProjectStepAPI, GetProjectsAPI };