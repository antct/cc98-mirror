import useModel from '@/hooks/useModel'
import userModel from '@/models/user'
import muiStyled from '@/muiStyled'
import { modifyMyAvatar, modifyMyInfo } from '@/services/user'
import { goback } from '@/utils/history'
import snackbar from '@/utils/snackbar'
import { Button, IconButton, TextField, Typography } from '@mui/material'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import EditAvatar from './EditAvatar'


const HeaderDiv = styled.div`
  display: flex;
  align-items: center;
  margin: 8px 0;
`

const GobackIcon = muiStyled(IconButton)({
  marginLeft: 4,
  marginRight: 5,
})

const FormHeader = () => (
  <HeaderDiv>
    <GobackIcon onClick={goback}>
      <KeyboardBackspaceIcon />
    </GobackIcon>
    <Typography variant="subtitle2">编辑个人信息</Typography>
  </HeaderDiv>
)

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 16px;
`

const FormItem = muiStyled(TextField).attrs({
  fullWidth: true,
  variant: 'outlined',
})({
  marginBottom: 20,
})

const SubmitButton = muiStyled(Button).attrs({
  variant: 'contained',
  color: 'primary',
})({
  margin: 8,
})

const FormBody = () => {
  const { myInfo } = useModel(userModel, ['myInfo'])

  const [info, setInfo] = useState(myInfo)
  useEffect(() => {
    setInfo(myInfo)
  }, [myInfo])

  if (info === null) {
    return null
  }

  const handleChange = (name: keyof typeof info) => (
    evt: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const updatedInfo = {
      ...info,
      [name]: evt.target.value,
    }
    setInfo(updatedInfo)
  }

  const handleSubmit = () => {
    modifyMyInfo(info).then(res =>
      res.fail().succeed(_ => {
        snackbar.success('修改成功')
        userModel.FRESH_INFO()
      })
    )
  }
  const handleAvatarSubmit = (AvatarSrc: string) => {
    modifyMyAvatar(AvatarSrc).then(res =>
      res.fail().succeed(_ => {
        snackbar.success('修改成功')
        userModel.FRESH_INFO()
      })
    )
  }
  if (myInfo) {
    return (
      <>
        <EditAvatar info={myInfo} handleAvatarSubmit={handleAvatarSubmit} />
        <FormWrapper noValidate autoComplete="off">
          <FormItem
            label="性别"
            select
            SelectProps={{
              native: true,
            }}
            value={info.gender}
            onChange={handleChange('gender')}
          >
            <option value={1}>男</option>
            <option value={0}>女</option>
          </FormItem>
          <FormItem
            label="生日"
            type="date"
            defaultValue={info.birthday && dayjs(info.birthday).format('YYYY-MM-DD')}
            onChange={handleChange('birthday')}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <FormItem label="QQ" value={info.qq} onChange={handleChange('qq')} />
          <FormItem
            label="邮箱"
            value={info.emailAddress || ''}
            onChange={handleChange('emailAddress')}
          />
          <FormItem
            label="介绍"
            multiline
            value={info.introduction}
            onChange={handleChange('introduction')}
          />
          <FormItem
            label="签名档"
            multiline
            value={info.signatureCode}
            onChange={handleChange('signatureCode')}
          />

          <SubmitButton onClick={handleSubmit}>提交修改</SubmitButton>
        </FormWrapper>
      </>
    )
  }

  return null
}

export default () => (
  <>
    <FormHeader />
    <FormBody />
  </>
)
