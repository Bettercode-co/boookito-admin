import { NextPage } from 'next'
import React from 'react'
import Plans from '../../components/Plans/Plans'
import Admin from '../../layouts/Admin'

const plans: NextPage = () => {
  return (
    <>
        <Plans />
    </>
  )
}

(plans as any).layout = Admin

export default plans