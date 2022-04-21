import { useContext } from 'react'
import { ChannelContext } from './ChannelContext'

export const useChannelContext = () => {
    const context = useContext(ChannelContext)

    return context
}