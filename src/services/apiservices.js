import axios from "axios";

let BaseUrl = "http://localhost:4002/";
const post = async (url, data) => {
    console.log(url,"==url")
    const response = await axios.post(BaseUrl+url, data);
    return response.data;
};
const get = async (url) => {
    const response = await axios.get(BaseUrl+url);
    return response.data;
}
const put = async (url, data) => {
    const response = await axios.put(BaseUrl+url, data);
    return response.data;
}
const deleteReq = async (url) => {
    const response = await axios.delete(BaseUrl+url);
    return response.data;
}

export { post, get, put, deleteReq };