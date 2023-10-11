import axios from "axios";
import { ReactNode, createContext, useCallback, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom"
import { useLocalStorage } from "../../app/hooks";

export type UserData = {
    userName: string,
    id: string
}

type LoginResponse = UserData & {
    success: boolean
}

type AuthContextType = {
    user?: UserData
    login: (user: string, password: string) => Promise<boolean>,
    logout: () => Promise<boolean>,
}

const AuthContext = createContext<AuthContextType>({ login: async () => false, logout: async () => false })

export const AuthProvider = ({ children }: { children?: ReactNode }) => {
    const [user, setUser] = useLocalStorage("user", undefined)
    const navigate = useNavigate()
    const login = useCallback(async (user: string, password: string): Promise<boolean> => {
        try {
            const response = await axios.post<LoginResponse>(
                "http://localhost:5157/api/user/login",
                { userName: user, password: password },
                {
                    withCredentials: true
                }
            )
            if (response.status != 200)
                return false

            setUser(response.data)
            navigate("/protected/transformer", { replace: true });
            return true
        } catch (err) {
            console.log(err)
            return false
        }

    }, [navigate, setUser])

    const logout = useCallback(async (): Promise<boolean> => {
        const response = await axios.post<LoginResponse>("http://localhost:5157/api/user/logout")
        if (response.status != 200)
            return false

        setUser(undefined)
        navigate("/login", { replace: true });
        return true
    }, [navigate, setUser])

    const value = useMemo(
        () => ({
            user,
            login,
            logout
        }),
        [user, logout, login]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
    return useContext(AuthContext);
};
