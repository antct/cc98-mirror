import { Avatar } from '@mui/material'
import { AvatarProps } from '@mui/material/Avatar'
import React from 'react'


interface FixAvatarProps extends AvatarProps {
    defaultSrc: string
}

const Avatar_Fix: React.FC<FixAvatarProps> = props => (
    <Avatar src={props.src} children={false} imgProps={{ onError: (e: React.SyntheticEvent<HTMLImageElement>) => e.currentTarget.src = props.defaultSrc }} />
)

export default Avatar_Fix
