import { UserDataContext } from "@/contexts/UserContext";
import axios from "axios";

import { ReactNode, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

type Props = {
    children: ReactNode;
}

const UserProtectWrapper = ({ children }: Props) => {
    const token = localStorage.getItem("auth-token");
    const [isLoading, setIsLoading] = useState<Boolean>(true);
    const userContext = useContext(UserDataContext);
    // check this work!
    const navigate = useNavigate();


    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }
        const storeUser = localStorage.getItem("user");

        if (!storeUser) {
            navigate("/login")
            return;
        }

        const userData = JSON.parse(storeUser);

        const emailFindUserContext = userData.email;
        console.log("From context", emailFindUserContext);
        console.log("Token from context: ", userData.token);


        // get user information
        axios.get(`http://localhost:8080/api/v1/auth/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            console.log("call for profile", response.data, response.status)
            if (response.status === 200) {
                const { email, name, role, user_id, phone, address } = response.data;
                const userData = { email, name, role, user_id, phone, address };

                localStorage.setItem("auth-token", token);
                localStorage.setItem("user", JSON.stringify(userData));

                userContext?.setUser(userData);
                console.log("From protection wrapper. ", userContext?.user);
                
            }
        }).catch(error => {
            console.log("Profile find effect", error);
            localStorage.removeItem("auth-token");
            navigate("/login");

        }).finally(() => {
            setIsLoading(false);
        })
    }, [token, navigate, userContext?.setUser])


    if (isLoading) {
        return <div className="flex justify-center items-center h-screen w-full">IsLoading....</div>
    }
    return (
        <div>{children}</div>
    )
}

export default UserProtectWrapper