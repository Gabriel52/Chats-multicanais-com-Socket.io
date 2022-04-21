export type MessageType = {
    userName: string;
    message: string;
}

export type ChannelType = {
    name: string;
    id: string | number
    messages: MessageType[]
}