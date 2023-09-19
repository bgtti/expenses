//authorization header for http requests

//Post requests only
export const getAuthHeader = () => {
    let token = sessionStorage.getItem("access_token");
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
}