import LayoutCenter, { PCLayoutCenter } from '@/components/LayoutCenter'
import { IS_PC } from '@/config'
import useModel from '@/hooks/useModel'
import stateModel from '@/models/state'
import React from 'react'
import LogInForm from './LogInForm'

const LogIn: React.FC = () => {
  const { isDrawerOpen } = useModel(stateModel, ['isDrawerOpen'])
  return (
    IS_PC ? <PCLayoutCenter open={isDrawerOpen}>
      <LogInForm />
    </PCLayoutCenter>
      : <LayoutCenter>
        <LogInForm />
      </LayoutCenter>
  )
}

export default LogIn
