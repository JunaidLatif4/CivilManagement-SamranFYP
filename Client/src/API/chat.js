import axios from "../AxiosInstance";

// Helper :
import AuthTokenGen from "../Utils/AuthTokenGen"





const GetChannelByProjectAPI = async (projectId) => {
    let resolved = {
        error: null,
        data: null
    }

    try {
        let res = await axios({
            url: `/chat/channel/${projectId}`,
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

const GetAllMessagesByChannelAPI = async (channelId , page) => {
    let resolved = {
        error: null,
        data: null
    }

    try {
        let res = await axios({
            url: `/chat/message/${channelId}/${page}`,
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

const CreateMessageAPI = async ({ message, type, channel_id, receiver_id }) => {
    let resolved = {
        error: null,
        data: null
    }

    try {
        let res = await axios({
            url: "/chat/message",
            method: "POST",
            data: {
                message,
                type,
                channel_id,
                receiver_id
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


export { GetChannelByProjectAPI, GetAllMessagesByChannelAPI, CreateMessageAPI };