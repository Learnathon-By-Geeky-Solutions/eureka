import { createContext, ReactNode, useState } from "react"

export type User = {
    userId?: number;
    name?: string;
    email: string;
    role?: string;
    token?: string;
    phone?: string;
    address?:string;
}
interface UserContextType{
    user: User|null;
    setUser: (user:User | null)=>void;

}

export const UserDataContext = createContext<UserContextType | null>(null);

type Props={
    children:ReactNode
}


const UserContext = ({children}:Props) => {
  const [user, setUser] = useState<User|null> (null);
    
  return (
    <div>
        <UserDataContext.Provider value={{user, setUser}}>
            {children}
        </UserDataContext.Provider>
    </div>
  )
}

export default UserContext