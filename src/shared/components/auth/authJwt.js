import axios from "axios";

/**
 * Set auth header for all request
 */
export default function setAuthHeader() {
    if(sessionStorage.getItem("accessToken"))
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem("accessToken");

}