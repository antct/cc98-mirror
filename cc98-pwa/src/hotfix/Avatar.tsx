import { RCDN } from '@/config'
import { Avatar } from '@mui/material'
import { AvatarProps } from '@mui/material/Avatar'
import React from 'react'

const Avatar_Fix: React.FC<AvatarProps> = props => (
    <Avatar
        src={props.src}
        children={false}
        imgProps={{
            onError: (e: React.SyntheticEvent<HTMLImageElement>) => e.currentTarget.src = RCDN(e.currentTarget.src, true)
        }}
    />
)

export default Avatar_Fix