import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Link, useNavigate } from 'react-router-dom'
import { RouteSignUp, RouteIndex } from '@/Helpers/Routename'
import { showToastify } from '@/Helpers/showToastify'
import { getEnv } from '@/Helpers/getEnv'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '@/Redux/slices/user.slice'
import { GoogleLogin } from '@/components/GoogleLogin/GoogleLogin'
import logo from '@/assets/images/logo.png'
import { GrUserAdmin } from "react-icons/gr";


export const Signin = () => {

    // const [login, setLogin] = useState({
    //     email: "guest@gmail.com",
    //     password: "Guest@123"
    // })

    // console.log(login);



    const navigate = useNavigate()
    const dispatch = useDispatch()
    // const user =  useSelector((state)=>{})

    const formSchema = z.object({
        email: z.string().email(),
        password: z.string().min(3, "Password required."),
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "guest@gmail.com",
            password: "Guest@123",
        },
    })


    async function onSubmit(values) {
        // console.log(values);

        // console.log(`${getEnv('VITE_API_BASE_URL')}/auth/register`);

        try {
            const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/auth/login`, {
                method: 'post',
                headers: { "Content-Type": "application/json" },
                credentials: 'include',
                body: JSON.stringify(values)
            })

            const data = await response.json()
            // console.log(data);


            if (!response.ok) {
                return showToastify("error", data.message)
            }
            dispatch(setUser(data.user))

            navigate(RouteIndex)
            showToastify("success", data.message)

        } catch (error) {
            showToastify("error", error.message)
        }
    }

    async function handleAdminLogin() {

        // setLogin({
        //     email: "admin@gmail.com",
        //     password: "Guest@123"

        // })

        form.reset({
            email: "admin@gmail.com",
            password: "Admin@123",
        });


    }

    return (
        <div className='flex justify-center items-center h-screen w-screen'>

            <Card className='p-5 w-[400px] '>
                <div className='flex justify-center items-center'>
                    <Link to={RouteIndex} >
                        <img src={logo} width={100} />
                    </Link>
                </div>
                <h2 className='text-center text-2xl'>SIGNIN INTO ACCOUNT</h2>
                <div>
                    <GoogleLogin />
                    <div className='flex justify-center items-center border mt-5 '>
                        <span className='absolute' >or</span>
                    </div>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        <Button type="submit" className='w-full cursor-pointer'>Signin</Button>

                    </form>
                </Form>

                <Button className='cursor-pointer' onClick={handleAdminLogin} >
                    <span><GrUserAdmin /></span>
                    Login as Admin
                </Button>


                <div className='flex justify-center gap-2'>
                    <p>Don't have an account? </p>
                    <Link to={RouteSignUp} className='text-sky-500 underline'>SignUp</Link>
                </div>


            </Card>

        </div>

    )
}
