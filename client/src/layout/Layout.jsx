import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { UserProvider } from '../context/UserContext'
import { FilterProvider } from './FilterContext'
const Layout = () => {
    return (
        <UserProvider>
            <FilterProvider>
                <Navbar />
                <main className="bg-[#76816A] min-h-screen">
                    <Outlet />
                </main>
                <Footer />
            </FilterProvider>
        </UserProvider>
    )
}

export default Layout
