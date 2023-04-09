const useToken = () => {
    let token = localStorage.getItem("madrasaToken")
    let AuthToken = token ?? null

    return {
        Authorization: `Bearer ${AuthToken}`
    }
}

export default useToken;