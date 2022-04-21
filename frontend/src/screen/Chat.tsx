import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { v4 as uuidV4 } from 'uuid'

import { useChannelContext } from "../context/useChannelContext"

export const Chat = ():JSX.Element => {
    const [message, setMessage] = useState('')
    const { channel, joinChannel, createMessage, userName } = useChannelContext()
    const { channelId } = useParams<{channelId: string}>()
    const navigate = useNavigate()
    useEffect(()=>{
        if(!channelId){
            navigate('/channels')
            return
        }
        if(!userName){
            navigate('/login')
            return
        }
        joinChannel(channelId)
    },[])

    const onSubmit = (evt: React.FormEvent) =>{
        evt.preventDefault()
        createMessage(message)
        setMessage('')
    }
    const styleContainerMessage = {
        maxHeight: '400px',
        overFlowY: 'auto',
    }
    return (
        <>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <h5># {channel?.name}</h5>
                <Link 
                    to="/channels" 
                >
                    Voltar
                </Link>
            </div>
            <div>
                {channel?.messages.map(message=>(
                    <div 
                        style={{
                            maxHeight: '400px',
                            overflowY: 'auto',
                        }} 
                        key={uuidV4()}
                    >
                        <strong>{message.userName}</strong>: {message.message}
                    </div>
                ))}
            </div>
            <form onSubmit={onSubmit}>
                <input 
                    placeholder="Digite sua mensagem"
                    type="text" 
                    value={message} 
                    onChange={(evt)=>{setMessage(evt.target.value)}}
                />
                <button type="submit">Enviar</button>
            </form>
        </>
    )
}