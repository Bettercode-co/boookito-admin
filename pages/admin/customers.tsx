import { NextPage } from 'next'
import React from 'react'
import BasicTable from '../../components/basicTable/BasicTable'
import {  FA_COLUMNS } from "../../components/basicTable/columns"
import {  FA_DATA } from "../../components/basicTable/dataRow";
import Sidebar from '../../components/Sidebar/Sidebar';



import Admin from '../../layouts/Admin'

const costumers : NextPage = () => {
  return (
    <div>
      {/* <Sidebar /> */}
        <BasicTable rowsdata={FA_DATA} columnsData={FA_COLUMNS} />
    </div>
  )
}

(costumers as any).layout = Admin;

export default costumers
