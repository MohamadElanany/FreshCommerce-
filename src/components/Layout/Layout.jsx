import React from 'react'
import style from "./Layout.module.css"
import Navbar from './../Navbar/Navbar';
import Footer from './../Footer/Footer';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
        <Navbar />

        <div className="container w-[80%] mx-auto my-5 py-20 lg:py-12">
          <Outlet />
        </div>

        <Footer />
    </>
  )
}
