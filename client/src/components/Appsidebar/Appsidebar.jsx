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
import { RouteBlog, RouteBlogByCategory, RouteCategory, RouteCommentsPage, RouteIndex, RouteUsersPage } from '@/Helpers/Routename';
import { useFetch } from '@/hooks/useFetch';
import { getEnv } from '@/Helpers/getEnv';
import { useSelector } from 'react-redux';

export const Appsidebar = () => {

    const user = useSelector((state) => state.user)

    const { data: categoryData } = useFetch(`${getEnv('VITE_API_BASE_URL')}/category/all-category`, {
        method: 'get',
        Credential: 'include'
    })
    // console.log(categoryData);

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
                                <Link to={RouteIndex} >Home</Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>


                        {user && user.isLoggedIn &&
                            <>
                                <SidebarMenuItem>
                                    <SidebarMenuButton>
                                        <GrBlog />
                                        <Link to={RouteBlog} >Blog</Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton>
                                        <FaRegComments />
                                        <Link to={RouteCommentsPage} >Comments</Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </>
                        }

                        {user && user.isLoggedIn && user.user.role === "admin" &&
                            <>
                                <SidebarMenuItem>
                                    <SidebarMenuButton>
                                        <BiCategoryAlt />
                                        <Link to={RouteCategory} >Categories</Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>

                                <SidebarMenuItem>
                                    <SidebarMenuButton>
                                        <FaRegUser />
                                        <Link to={RouteUsersPage} >User</Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>

                            </>
                        }







                    </SidebarMenu>

                </SidebarGroup>

                <SidebarGroup >
                    <SidebarGroupLabel>  Categories

                    </SidebarGroupLabel>
                    <SidebarMenu>
                        {categoryData && categoryData.category.length > 0 && categoryData.category.map(cate => <SidebarMenuItem key={cate._id}>
                            <SidebarMenuButton>
                                <GoDot />
                                <Link to={RouteBlogByCategory(cate.slug)} >{cate.name}</Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>)}

                    </SidebarMenu>


                </SidebarGroup>
            </SidebarContent>

        </Sidebar>
    )
}
