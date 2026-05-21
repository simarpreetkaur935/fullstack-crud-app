import React from 'react'
import MainNavbar from './MainNavbar'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <>
    <MainNavbar />
    <Outlet />
    </>
  )
}

export default RootLayout