import { Appsidebar } from '@/components/Appsidebar/Appsidebar'
import { Footer } from '@/components/Footer/Footer'
import { Topbar } from '@/components/Topbar/Topbar'
import { SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'
import { Outlet } from 'react-router-dom'

export const Layout = () => {
    return (

        <SidebarProvider>
            <Topbar />
            <Appsidebar />
            <main className='w-full border '>
                <div className='w-full min-h-[calc(100vh-40px)] py-30 px-10'>
                    <Outlet />
                </div>
                <Footer />
            </main>

        </SidebarProvider>

    )
}
