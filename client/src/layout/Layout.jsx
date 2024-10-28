import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { FilterProvider } from '../layout/FilterContext'

const Layout = () => {
    return (
        <>
            <FilterProvider>
                <Navbar />
                <Outlet />
                <Footer />
            </FilterProvider>
        </>
    )
}

export default Layout
