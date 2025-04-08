import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React from 'react'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Link } from 'react-router-dom'
import { RouteSignIn } from '@/Helpers/Routename'
import { getEnv } from '@/Helpers/getEnv'
import { useNavigate } from 'react-router-dom'
import { showToastify } from '@/Helpers/showToastify'
import { GoogleLogin } from '@/components/GoogleLogin/GoogleLogin'


export const Signup = () => {

    const navigate = useNavigate()

    const formSchema = z.object({
        name: z.string().min(3, "name must be 3 characters long."),
        email: z.string().email(),
        password: z.string().min(8, "Password must be 8 characters long."),
        confirmPassword: z.string()
    }).refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match.",
        path: ["confirmPassword"], // This ensures the error appears under confirmPassword field
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
    })


    async function onSubmit(values) {
        // console.log(values);
        // console.log(`${getEnv('VITE_API_BASE_URL')}`);
        // console.log(`${getEnv('VITE_API_BASE_URL')}/auth/register`);

        try {
            const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/auth/register`, {
                method: 'post',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values)
            })

            const data = await response.json()
            // console.log(data);


            if (!response.ok) {
                return showToastify("error", data.message)

            }

            navigate(RouteSignIn)
            showToastify("success", data.message)

        } catch (error) {
            console.log(error.message);

            showToastify("error", error.message)

        }

    }

    return (
        <div className='flex justify-center items-center h-screen w-screen'>

            <Card className='p-5 w-[400px] '>
                <h2 className='text-center text-2xl'>CREATE NEW ACCOUNT</h2>

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
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter email" {...field} />
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
                                        <Input type='password' placeholder="Enter password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input type='password' placeholder="Enter password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className='w-full'>Signup</Button>
                        <div className='flex justify-center gap-2'>
                            <p>Already existing user</p>
                            <Link to={RouteSignIn} className='text-sky-500 underline'>SignIn</Link>
                        </div>
                    </form>
                </Form>



            </Card>




        </div>

    )
}
