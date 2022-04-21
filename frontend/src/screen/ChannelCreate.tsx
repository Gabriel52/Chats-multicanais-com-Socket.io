import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useChannelContext } from "../context/useChannelContext"

export const ChannelCreate = () => {
    const [channel, setChannel ] = useState<string>('')
    const { createChannel, userName } = useChannelContext()
    const navigate = useNavigate()

    const onSubmit = (evt: React.FormEvent) => {
        evt.preventDefault()
        createChannel(channel)
        setChannel('')
    }

    useEffect(() => {
        if(!userName){
            navigate('/login')
            return
        }
    },[])

    return (
        <>
            <form onSubmit={onSubmit} >
                <p>Nome do canal</p>
                <input 
                    type="text" 
                    value={channel} 
                    onChange={(evt)=>{setChannel(evt.target.value)}}
                />
                <button type="submit">
                    Criar canal
                </button>
            </form>
        </>    
    ) 
}