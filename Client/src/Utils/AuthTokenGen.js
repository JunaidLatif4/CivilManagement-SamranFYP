const useToken = () => {
    let token = localStorage.getItem("civilToken")
    let AuthToken = token ?? null

    return {
        Authorization: `Bearer ${AuthToken}`
    }
}

export default useToken;