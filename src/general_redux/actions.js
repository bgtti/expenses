import APIURL from "../config/api-url";

export const signIn =()=>{
    return{
        type: "SIGN_IN",
        // data: nr
    };
};
export const signOut = () => {
    return {
        type: "SIGN_OUT"
    };
};

export const logIn = async (email, password) =>{
    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "email": email,
            "password": password
        }),
    };
    try{
        const response = await fetch(APIURL.LOGIN, options)
        if (response.status !== 200) {
            console.error("Login error: response status not 200.");
            return {
                type: "LOG_OUT",
                token: undefined
            };
            // return false;
        }
        const data = await response.json();
        sessionStorage.setItem("access_token", data.access_token);
        return {
            type: "LOG_IN",
            token: data.access_token
        };
        // return true;
    }
    catch(error){
        console.error("Login error: there was a problem logging in.");
    }
}