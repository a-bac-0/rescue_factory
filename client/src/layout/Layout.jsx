import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { UserProvider } from '../context/UserContext';
const Layout = () => {
    return (
        <UserProvider>
            <Navbar />
            <main className="bg-[#76816A] min-h-screen">
                <Outlet />
            </main>
            <Footer />
        </UserProvider>
    );
};

export default Layout;
