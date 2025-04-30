

import { ImagePickerAsset } from 'expo-image-picker'; // Adjust the import path if necessary
import type {ImageKitUploadResponse, uploadToImageKitProps} from "@/types"

export const uploadToImageKit = async ({file, authParams, fileAddition}:uploadToImageKitProps):Promise<ImageKitUploadResponse>=>{
    const formData = new FormData();

   
    formData.append("file",{
        uri:file.uri,
        name: file.fileName || "image.jpg",
        type: file.type || "image/jpeg"
    } as any)
    // const timeStamp = Math.floor(Date.now()/1000);
    // const expireTime = timeStamp + (60*30);
    formData.append('fileName', `self_courier_image_${fileAddition}`);
    formData.append("publicKey", authParams.publicKey);
    formData.append("signature", authParams.signature);
    formData.append("expire", authParams.expire);
    formData.append("token", authParams.token);
    console.log("Form data from image kit helper. ", formData)
    const response = await fetch("https://upload.imagekit.io/api/v1/files/upload",{
        method:"POST",
        body:formData,
    })

    console.log("Response from image kit helper. ", response)
    if(!response.ok){
        const error = await response.text();
        throw new Error(`Image kit upload image failed: ${error}`);
    }
    const data = await response.json();

    console.log("Image image kit helper, reponse", data);
    return data;
}