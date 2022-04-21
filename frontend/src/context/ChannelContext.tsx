import { createContext, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client'

import { ROUTE_SERVER } from '../const';
import { ChannelType } from '../types';



type ChannelContextType = {
    channels: ChannelType[]
    channel: ChannelType | undefined
    userName: string

    createChannel: (channel:string) => void
    createMessage: (message:string) => void
    login: (userName:string) => void
    joinChannel: (channelId:string) => void

}

export const ChannelContext = createContext({} as ChannelContextType)

export const ChannelContextProvider = ({children}:{children: React.ReactNode})=>{
    const socket = useRef<Socket>();
    const [userName, setUserName] = useState("");
    const [channels, setChannels] = useState<ChannelType[]>([]) 
    const [channel, setChannel] = useState<ChannelType>() 

    useEffect(() => {
        socket.current = io(ROUTE_SERVER);
        socket.current.on("channels:get", (data) => {
            setChannels(data)
        })
        socket.current.on("channel:get", (channel) => {
            setChannel(channel)
        })
    }, []);

    const login = (userName: string) => {
        socket.current?.emit("user:login", userName);
        setUserName(userName);
    };

    const createChannel = (channel: string) => {
        socket.current?.emit("channel:create", channel);
    }

    const joinChannel = (channelId: string) => {
        socket.current?.emit('channel:join', channelId)
    }

    const createMessage = (message: string) => {
        socket.current?.emit('message:create', {
            message,
            channelId: channel?.id,
            userName,
        })
    }

    return(
        <ChannelContext.Provider 
            value={{
                channel,
                channels,
                userName,
                login,
                createChannel,
                createMessage,
                joinChannel,
            }}
        >
            {children}
        </ChannelContext.Provider>

    )
} 