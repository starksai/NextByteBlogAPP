import React from 'react'
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar'
import { Link } from 'react-router-dom'
import logo from "../../assets/images/logo.png"
import { IoHomeOutline } from "react-icons/io5";
import { GrBlog } from "react-icons/gr";
import { BiCategoryAlt } from "react-icons/bi";
import { FaRegComments } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { GoDot } from "react-icons/go";
import { RouteBlog, RouteCategory } from '@/Helpers/Routename';
import { useFetch } from '@/hooks/useFetch';
import { getEnv } from '@/Helpers/getEnv';

export const Appsidebar = () => {

    const { data: categoryData } = useFetch(`${getEnv('VITE_API_BASE_URL')}/category/all-category`, {
        method: 'get',
        Credential: 'include'
    })
    return (
        <Sidebar className='pt-16'>
            {/* <SidebarHeader >
                <img src={logo} width={75} height={50} />
            </SidebarHeader> */}

            <SidebarContent>

                <SidebarGroup >
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton>
                                <IoHomeOutline />
                                <Link to="" >Home</Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton>
                                <BiCategoryAlt />
                                <Link to={RouteCategory} >Categories</Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton>
                                <GrBlog />
                                <Link to={RouteBlog} >Blog</Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton>
                                <FaRegComments />
                                <Link to="" >Comments</Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton>
                                <FaRegUser />
                                <Link to="" >User</Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>

                    </SidebarMenu>

                </SidebarGroup>

                <SidebarGroup >
                    <SidebarGroupLabel>  Categories

                    </SidebarGroupLabel>
                    <SidebarMenu>
                        {categoryData && categoryData.category.length > 0 && categoryData.category.map(cate => <SidebarMenuItem key={cate._id}>
                            <SidebarMenuButton>
                                <GoDot />
                                <Link to="" >{cate.name}</Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>)}

                    </SidebarMenu>


                </SidebarGroup>
            </SidebarContent>

        </Sidebar>
    )
}
