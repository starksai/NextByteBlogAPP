import React, { useEffect, useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { getEnv } from '@/Helpers/getEnv'
import { showToastify } from '@/Helpers/showToastify'
import { useDispatch, useSelector } from 'react-redux'
import { Textarea } from '@/components/ui/textarea'
import { useFetch } from '@/hooks/useFetch'
import { Loading } from '@/components/Loading/Loading'
import { IoCameraReverse } from "react-icons/io5";
import Dropzone from 'react-dropzone'
import { setUser } from '@/Redux/slices/user.slice'
import noprofile from "@/assets/images/noprofileimage.jpg"
import { Badge } from '@/components/ui/badge'


export const Profile = () => {

    const [disable , setDisable] = useState(false)

    const [preview, setPreview] = useState()
    const [file, setFile] = useState()
    // console.log(file,"from use sataet");
    const user = useSelector((state) => state.user)

    const { data: userData, loading, error } = useFetch(`${getEnv('VITE_API_BASE_URL')}/user/get-user/${user.user._id}`,
        { method: 'get', credentials: 'include' }
    )

    // console.log(user);

    const dispatch = useDispatch()

    const formSchema = z.object({
        name: z.string().min(3, "name must be 3 or more characters long."),
        email: z.string().email(),
        bio: z.string().min(3, "more than 3 chares"),
        password: z.string().optional()
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            bio: "",
            password: "",
        },
    })

    useEffect(() => {
        if (userData && userData.success) {
            form.reset({
                name: userData.user.name,
                email: userData.user.email,
                bio: userData.user.bio,

            })
        }

    }, [userData])



    async function onSubmit(values) {

        setDisable(true)
        // console.log(values);

        // console.log(`${getEnv('VITE_API_BASE_URL')}/auth/register`);

        try {

            const formData = new FormData()
            formData.append("file", file)
            formData.append("data", JSON.stringify(values))


            const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/user/update-user/${userData.user._id}`, {
                method: 'put',
                credentials: 'include',
                body: formData
            })

            const data = await response.json()
            // console.log(data);


            if (!response.ok) {
                return showToastify("error", data.message)
            }
            dispatch(setUser(data.user))


            showToastify("success", data.message)

        } catch (error) {
            showToastify("error", error.message)
        }
        finally{
            setDisable(false)
        }
    }

    const handleFileSelection = (files) => {
        // console.log(files); the files are coming as array
        const file = files[0]
        const preview = URL.createObjectURL(file)
        setFile(file)
        setPreview(preview)
    }

    if (loading) return <Loading /> // Loading animation while fetching the data


    return (
        <Card className='max-w-screen-md mx-auto'>

            <CardContent>

                <div className='flex justify-center items-center mt-10 pb-10'>

                    <Dropzone onDrop={acceptedFiles => handleFileSelection(acceptedFiles)}>
                        {({ getRootProps, getInputProps }) => (

                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <Avatar className='w-28 h-28 relative group' >
                                    <AvatarImage src={preview ? preview : userData?.user?.avatar || noprofile} />
                                    <div className='absolute z-10 w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center  border-2 rounded-full group-hover:flex hidden cursor-pointer' >
                                        <IoCameraReverse color='#7c3aed' width={100} height={100} />

                                    </div>
                                </Avatar>
                            </div>
                        )}
                    </Dropzone>

                    {user && user.isLoggedIn && user.user.role === "admin" &&

                        <Badge className='relative  top-18 right-20'>Admin</Badge>
                    }

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
                                        <Input placeholder="Enter your name" {...field} />
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
                                        <Input placeholder="email" disabled {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="bio"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Bio</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder='Enter your bio..' {...field} />

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


                        <Button type="submit" disabled={disable} className='w-full cursor-pointer'>
                            {disable ? "Saving..." : "save changes"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
