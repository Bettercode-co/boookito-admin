import { NextPage } from 'next'
import React from 'react'
import BarChart from '../../components/Charts/BarChart'
import Plans from '../../components/Plans/Plans'
import Admin from '../../layouts/Admin'

const plans: NextPage = () => {
  return (
    <>
        {/* <Plans /> */}
        <BarChart />
    </>
  )
}

(plans as any).layout = Admin

export default plans