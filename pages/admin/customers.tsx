import { NextPage } from 'next'
import React from 'react'
import BasicTable from '../../components/basicTable/BasicTable'
import { COLUMNS } from "../../components/basicTable/columns"
import { DATA } from "../../components/basicTable/dataRow";
import Sidebar from '../../components/Sidebar/Sidebar';



import Admin from '../../layouts/Admin'

const costumers : NextPage = () => {
  return (
    <div>
      {/* <Sidebar /> */}
        <BasicTable rowsdata={DATA} columnsData={COLUMNS} />
    </div>
  )
}

(costumers as any).layout = Admin;

export default costumers