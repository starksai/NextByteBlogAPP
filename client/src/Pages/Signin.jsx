import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React from 'react'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Link, useNavigate } from 'react-router-dom'
import { RouteSignIn, RouteSignUp, RouteIndex } from '@/Helpers/Routename'
import { showToastify } from '@/Helpers/showToastify'
import { getEnv } from '@/Helpers/getEnv'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '@/Redux/slices/user.slice'
import { GoogleLogin } from '@/components/GoogleLogin/GoogleLogin'


export const Signin = () => {


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
            email: "",
            password: "",
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





    return (
        <div className='flex justify-center items-center h-screen w-screen'>

            <Card className='p-5 w-[400px] '>
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


                        <Button type="submit" className='w-full'>Signin</Button>
                        <div className='flex justify-center gap-2'>
                            <p>Don't have an account? </p>
                            <Link to={RouteSignUp} className='text-sky-500 underline'>SignUp</Link>
                        </div>
                    </form>
                </Form>



            </Card>




        </div>

    )
}
