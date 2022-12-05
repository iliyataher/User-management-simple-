import axios from "axios";

export const JpAxios = axios.create({
    baseURL:"https://jsonplaceholder.typicode.com",
    // headers:{
    //     Authorization: "",
    //     "Content-Type":""
    // }
    timeout:5000,
    timeoutErrorMessage:"با خطا مواجه شد"
})
