import { useState } from "react"
import { useAuth } from "../authentication/AuthProvider"

export const Login = () => {

    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")

    const { login } = useAuth()

    return (
        <form method="POST" action="/api/user/loginExternal?provider=Google&returnUrl=/protected/transformer">
            <label>Login</label>
            <input type="text" title="User Name" id="userName" value={userName} onChange={(e) => setUserName(e.target.value)} />
            <label>Password</label>
            <input type="password" title="Password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button
                type="button"
                onClick={() => {
                    console.log(`trying to login ${userName}:${password}`)
                    login(userName, password)
                }
                }>Login</button>
            <div>
                <button type="reset" onClick={() => { setUserName(""); setPassword("") }}>Reset</button>
            </div>
            <div>
                <button type="submit">Login via google</button>
            </div>
        </form>
    )
}