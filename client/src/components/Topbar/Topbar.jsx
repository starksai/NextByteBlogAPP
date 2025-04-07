import React from 'react'
import logo from "../../assets/images/logo.png"
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { GrLogin } from "react-icons/gr";
import { Searchbar } from '../Searchbar/Searchbar';
import { RouteAddBlog, RouteIndex, RouteProfile, RouteSignIn } from '@/Helpers/Routename';
import { useDispatch, useSelector } from 'react-redux';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import npprofileimage from "@/assets/images/noprofileimage.jpg"
import { FaRegUser } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { MdAddCircle } from "react-icons/md";
import { removeUser } from '@/Redux/slices/user.slice';
import { showToastify } from '@/Helpers/showToastify';
import { getEnv } from '@/Helpers/getEnv';
import { FaSearch } from "react-icons/fa";
import { useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { useSidebar } from '../ui/sidebar';

export const Topbar = () => {

    const [showSearch, setShowSearch] = useState(false)
    const { toggleSidebar } = useSidebar()


    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)

    // console.log(user, 'user');
    // console.log(user.user.avatar, "profile url");

    const handleLogout = async () => {

        try {
            const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/auth/logout`, {
                method: 'get',
                credentials: 'include'
            })

            const data = await response.json()
            // console.log(data);

            if (!response.ok) {
                return showToastify("error", data.message)
            }
            dispatch(removeUser())
            navigate(RouteIndex)
            showToastify("success", data.message)

        } catch (error) {
            showToastify("error", error.message)
        }


    }

    const toggleSearch = () => {
        setShowSearch(!showSearch)
    }
    return (
        <div className='flex justify-between items-center h-16 fixed w-full z-20 border-b bg-gray-50 pl-5 px-5  '>

            <div className='flex items-center gap-3  justify-center'>
                <button onClick={toggleSidebar} className='md:hidden' type='button'>
                    <GiHamburgerMenu className='' />
                </button>
                <Link to={RouteIndex}>
                    <img src={logo} className='w-40 md:w-17' />
                </Link>

            </div>

            <div className='w-100 bg-white-500 '>
                <div className={`md:relative md:block  absolute left-0 w-full top-17 md:top-0 ${showSearch ? 'block' : 'hidden'}`}>

                    <Searchbar />
                </div>

            </div>

            <div className='flex items-center gap-5'>



                <div onClick={toggleSearch} type='button' className='md:hidden block' >
                    <FaSearch />
                </div>

                {!user.isLoggedIn ?
                    <Button asChild className='rounded-full'>
                        <Link to={RouteSignIn} >
                            <GrLogin /> LogIn
                        </Link>
                    </Button>
                    :
                    <DropdownMenu  >
                        <DropdownMenuTrigger className="cursor-pointer" >
                            <Avatar>
                                <AvatarImage src={user.user.avatar || npprofileimage} />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>
                                <p>{user.user.name}</p>
                                <p className='text-sm'>{user.user.email}</p>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild className='cursor-pointer'>
                                <Link to={RouteProfile}>
                                    <FaRegUser color='green' />
                                    Profile
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild className="cursor-pointer">
                                <Link to={RouteAddBlog}>
                                    <MdAddCircle color='orange' />
                                    Add Blog
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                                <HiOutlineLogout color='red' />
                                Logout

                            </DropdownMenuItem>

                        </DropdownMenuContent>
                    </DropdownMenu>

                }




            </div>

        </div>
    )
}
