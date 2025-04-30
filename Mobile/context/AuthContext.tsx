import { createContext, useContext, useEffect, useState } from "react";
import {
    deleteStorageItemAsync,
    getStorageItemAsync,
    setStorageItemAsync,
} from "./Storage";
import axios from "axios";
import jwt_Decode from "jwt-decode";

interface AuthProps {
    authState?: { token: string | null; authentication: boolean | null };
    onRegister?: (
        name: string,
        email: string,
        phone: string,
        password: string,
        address: string
    ) => Promise<any>;
    onLogin?: (email: string, password: string) => Promise<any>;
    onLogout?: () => void;
    user?: any;
}

const AuthContext = createContext<AuthProps>({});
export function useAuth() {
    return useContext(AuthContext);
}

const token_key = process.env.EXPO_PUBLIC_API_KEY;
const baseURL =
    process.env.EXPO_PUBLIC_API_URL || "https://default-api-url.com";
console.log("Auth context base url", baseURL);

type AuthProviderProps = {
    children: React.ReactNode;
};
export default function AuthProvider({ children }: AuthProviderProps) {
    const [authState, setAuthState] = useState<{
        token: string | null;
        authentication: boolean | null;
    }>({
        token: null,
        authentication: null,
    });

    const [user, setUser] = useState(null);
    // auth loader
    useEffect(() => {
        const loadToken = async () => {
            const Token = token_key ? await getStorageItemAsync(token_key) : null;
            console.log("Auth token loadToken", Token);
            // check vaildation time
            if (Token) {
                // const decodeToken = jwt_Decode<>(Token);
                setAuthState({
                    token: Token,
                    authentication: true,
                });
                axios.defaults.headers.common["Authorization"] = `Bearer ${Token}`;
            }
        };
        loadToken();
    }, []);

    // registration function
    const Register = async (
        name: string,
        email: string,
        phone: string,
        password: string,
        address: string
    ) => {
        try {
            const requestBody = {
                name,
                email,
                phone,
                password,
                address,
            };

            // axios headers deleted
            delete axios.defaults.headers.common["Authorization"];
            const response = await axios.post(
                `${baseURL}/api/v1/auth/register`,
                requestBody,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 201) {
                return { success: true };
            }
            return { success: false, msg: "Response status", response };
        } catch (error) {
            console.error("Register error", error);
            return { error, msg: (error as any).response.data.msg };
        }
    };

    const Login = async (email: string, password: string) => {
        console.log(
            "Authorization header before API call:",
            axios.defaults.headers.common["Authorization"]
        );

        try {
            const requestBody = {
                email,
                password,
            };
            console.log("Log in request body", requestBody);
            console.log(
                "Authorization header before API call:",
                axios.defaults.headers.common["Authorization"]
            );
            delete axios.defaults.headers.common["Authorization"];
            console.log(
                "Authorization header after API call:",
                axios.defaults.headers.common["Authorization"]
            );
            const response = await axios.post(
                `${baseURL}/api/v1/auth/login`,
                requestBody,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

           
            const token = response.data.token; 
            console.log("auth respone for log in ", token);
            if (token) {
                setAuthState({
                    token: response.data.token,
                    authentication: true,
                });
                setUser(response.data);

                axios.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${response.data.token}`;

                token_key
                    ? await setStorageItemAsync(token_key, response.data.token)
                    : null;
                console.log(response);
                return { success: true, response };
            } else {
                return { success: false, response, msg: "Log in method error" };
            }
        } catch (error) {
            const errorMsg =
                (error as any)?.response?.data?.msg || "An unexpected error occurred";
            console.log("log in error", errorMsg, error);
            return { error, msg: errorMsg };
        }
    };

    const Logout = async () => {
        token_key ? await deleteStorageItemAsync(token_key) : null;

        // axios.defaults.headers.common["Authorization"] = "";
        delete axios.defaults.headers.common["Authorization"];

        setAuthState({
            token: null,
            authentication: null,
        });
    };
    const value = {
        authState,
        onRegister: Register,
        onLogin: Login,
        onLogout: Logout,
        user,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
