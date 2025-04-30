import axios from "axios"

const baseURL = process.env.EXPO_PUBLIC_API_URL
export const getImageKitAuthParams = async()=>{
    console.log("get image kit auth params hit ", baseURL);
    const response = await axios.post(`${baseURL}/api/v1/imagekit/auth`);
    // remove before push
    console.log("Response auth params from image kit get auth", response.data);
    return response.data;
}