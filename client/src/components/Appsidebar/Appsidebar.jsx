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

export const Appsidebar = () => {
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
                                <Link to="" >categories</Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton>
                                <GrBlog />
                                <Link to="" >Blog</Link>
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
                        <SidebarMenuItem>
                            <SidebarMenuButton>
                                <GoDot />
                                <Link to="" >Categories1</Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>


                </SidebarGroup>
            </SidebarContent>

        </Sidebar>
    )
}
