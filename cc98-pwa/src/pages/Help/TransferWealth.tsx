import React, { useRef } from 'react'
import styled from 'styled-components'

import Transferer, { WealthModel } from './Transferer'

import snackbar from '@/utils/snackbar'
import userModel from '@/models/user'
import { transferWealth } from '@/services/user'

const WrapperDiv = styled.div`
  margin: 8px 12px;
`

export interface Props {
}

export default (props: Props) => {

  const isModelInit = useRef(false)

  const transferer = useRef<WealthModel | null>(null)
  const userInfo = userModel.state.myInfo

  if (!isModelInit.current) {
    transferer.current = new WealthModel()
    if (userInfo) transferer.current.setOwnWealth(userInfo.wealth)
    isModelInit.current = true
  }

  const onSendCallback = chooseSendCallback(
    transferer.current!,
    props,
  )

  return (
    <WrapperDiv>
      <Transferer transferer={transferer.current!} onSendCallback={onSendCallback} />
    </WrapperDiv>
  )
}

/**
 * 选择合适的回调
 */
function chooseSendCallback(
  transferer: WealthModel,
  props: Props
): () => void {

  const failCallback = () => {
    transferer.setState({ isSending: false })
  }

  const successCallback = () => {
    transferer.setState({ isSending: false })
  }

  return () => {
    const value = transferer.state.wealth
    const userNames = transferer.state.userNames
    const reason = transferer.state.reason

    if (userNames === '' || reason === '') {
      snackbar.error(`转账信息不全`)
      failCallback()
      return
    }
    if (value.match(/[^\d\.]/)) {
      snackbar.error(`转账金额应为数值`)
      return
    }
    const wealth = Number.parseFloat(value)
    if (wealth < 10) {
      snackbar.error(`转账的最小金额不能小于10`)
      failCallback()
      return
    }
    //以空白字符打断用户名信息
    let names = userNames.split(/\s+/)
    //处理掉最后一项的空字符串
    if(names[names.length -1] === '')  names.pop()
    //去重
    names = Array.from(new Set(names))

    const needWealth = names.length * wealth
    const realWealth = `${wealth - Math.max(Math.floor(wealth * 0.1), 10)}`
    // FIX: 因为不像PC端会获取/me，用户信息中的财富值可能不准
    if (needWealth > transferer.state.ownWealth) {
      snackbar.error(`财富值不足，当前拥有${transferer.state.ownWealth}财富值`)
      failCallback()
      return
    }
    transferWealth(names, reason, wealth).then(res =>
      res
        .fail((data) => {
          if (data.msg === 'no_invalid_usernames') snackbar.error('转账失败，无有效用户')
          if (data.msg === 'no_enough_wealth') snackbar.error('财富值不足')
          failCallback()
        })
        .succeed((data) => {
          snackbar.success(`成功给用户${data.join('|')}转账了总计${wealth*data.length}财富值，每人将收到${realWealth}财富值`)
          successCallback()
        })
    )
  }
}
