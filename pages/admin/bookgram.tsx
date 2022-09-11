import { NextPage } from 'next'
import React from 'react'
import Plans from '../../components/Plans/Plans'
import Admin from '../../layouts/Admin'

const bookgram: NextPage = () => {
  return (
    <>
        <Plans />
    </>
  )
}

(bookgram as any).layout = Admin

export default bookgram