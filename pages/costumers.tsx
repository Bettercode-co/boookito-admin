import { NextPage } from 'next'
import React from 'react'
import BasicTable from '../components/basicTable/BasicTable'



import Admin from '../layouts/Admin'

const costumers : NextPage = () => {
  return (
    <div>
        <BasicTable />
    </div>
  )
}

(costumers as any).layout = Admin;

export default costumers
