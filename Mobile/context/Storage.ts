import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store"

export async function getStorageItemAsync (key:string): Promise<string | null>{
    if(Platform.OS === "web"){
        try {
            const token = localStorage.getItem(key);
            return token || null;
        } catch (error) {
            console.log(error, "get error key: ", key);
            return null;
        }
    }
    else{
        try {
            return (await SecureStore.getItemAsync(key)) || null
        } catch (error) {
            console.log(error, "get item from storage")
            return null;
        }
    }
}

export async function setStorageItemAsync (key:string, value:string){
    if(Platform.OS === "web"){
        try {
            value === null ? localStorage.removeItem(key): localStorage.setItem(key, value);
        } catch (error) {
            console.log("Error, set item local storage", error)
        }
    }
    else{
        try {
            value === null ? await SecureStore.deleteItemAsync(key): await SecureStore.setItemAsync(key, value);
        } catch (error) {
            console.log("Error, set item secure storage", key, value);
        }
    }
}

export async function deleteStorageItemAsync(key:string){
    if(Platform.OS === 'web'){
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.log("Error, remove item local storage", error)
        }
    }
    else{
        try {
            await SecureStore.deleteItemAsync(key);
        } catch (error) {
            console.log("Error, delete item secure storage", error);
        }
    }
}