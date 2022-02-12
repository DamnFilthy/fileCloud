import axios from "./axios";

const path = (credentials, url) => {
    console.log('credentials ', credentials, 'url ', url)
    return axios.post(url, credentials)
}

export default {
    path
}