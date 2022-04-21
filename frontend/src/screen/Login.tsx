import { useState } from "react"
import navigate, { useNavigate } from "react-router-dom"
import { useChannelContext } from "../context/useChannelContext"

export const Login = ():JSX.Element =>{
    const [userName, setUserName]= useState<string>('')
    const { login } = useChannelContext()
    const navigate = useNavigate()

    const onSubmit = (evt: React.FormEvent)=>{
        evt.preventDefault()
        login(userName)
        navigate('/channels')
    }

    return(
        <div>
            <h1>Login</h1>
            <form onSubmit={onSubmit}>
                <p>Username</p>
                <input 
                    value={userName}
                    type="text" 
                    placeholder="Seu usuário"
                    onChange={(evt) => setUserName(evt.target.value)}
                />
                <button type="submit">Entrar</button>
            </form>
        </div>
    )
}