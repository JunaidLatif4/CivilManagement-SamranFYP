import axios from "../AxiosInstance";





const LoginAPI = async ({ email, password }) => {
    let resolved = {
        error: null,
        data: null
    }

    try {
        let res = await axios({
            url: "/auth/login",
            method: "POST",
            data: {
                email,
                password
            }
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

const RegisterAPI = async ({ firstName, lastName, email, phone, role, password }) => {
    let resolved = {
        error: null,
        data: null
    }

    try {
        let res = await axios({
            url: "/auth/signup",
            method: "POST",
            data: {
                firstName,
                lastName,
                email,
                phone,
                role,
                password,
            }
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

export { LoginAPI, RegisterAPI }