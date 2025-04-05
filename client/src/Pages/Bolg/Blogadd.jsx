import React, { useEffect, useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Link, useNavigate } from 'react-router-dom'
import slugify from 'slug'
import { showToastify } from '@/Helpers/showToastify'
import { getEnv } from '@/Helpers/getEnv'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useFetch } from '@/hooks/useFetch'
import Dropzone from 'react-dropzone'
import { Textarea } from "@/components/ui/textarea"
import { useSelector } from 'react-redux'
import { RouteBlog } from '@/Helpers/Routename'



export const Blogadd = () => {

    const navigate = useNavigate()

    const user = useSelector((state) => state.user)
    const [preview, setPreview] = useState()
    const [file, setFile] = useState()


    // console.log(content);


    const { data: categoryData, loading, error } = useFetch(`${getEnv('VITE_API_BASE_URL')}/category/all-category`, {
        method: 'get',
        Credential: 'include'
    })

    // console.log(categoryData);


    const formSchema = z.object({
        category: z.string(),
        title: z.string().min(3, "title name must be 3 characters long."),
        slug: z.string().min(3, "slug name must be 3 characters long."),
        blogcontent: z.string().min(3, "editor content must be 3 characters long."),

    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            category: "",
            title: "",
            slug: "",
            blogcontent: "",

        },
    })



    const blogTitle = form.watch("title")
    useEffect(() => {
        

        if (blogTitle) {
            const slug = slugify(blogTitle, { lower: true })

            form.setValue("slug", slug)

        }

    },[blogTitle])




    const handleFileSelection = (files) => {
        // console.log(files); the files are coming as array
        const file = files[0]
        const preview = URL.createObjectURL(file)
        setFile(file)
        setPreview(preview)
    }



    async function onSubmit(values) {
        // console.log(values);

        try {
            const newData = {...values, author: user.user._id}
            // console.log(newData);

            if(!file){
                showToastify("error",'feature image is required.')
            }
            const formData = new FormData()
            formData.append("file", file)
            formData.append("data", JSON.stringify(newData))


            const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/blog/add`, {
                method: 'post',
                credentials: 'include',
                body: formData
            })

            const data = await response.json()
            // console.log(data);


            if (!response.ok) {
                return showToastify("error", data.message)
            }
            form.reset()
            setFile()
            setPreview()
           

            navigate(RouteBlog)
            showToastify("success", data.message)

        } catch (error) {
            showToastify("error", error.message)
        }

    }


    return (
        <div>
            <Card className='p-5  max-w-5xl mx-auto w-full  '>

                <h1 className='text-2xl flex justify-center items-center'>ADD NEW BLOG</h1>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger className='w-full'>
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categoryData && categoryData.category.length > 0 &&
                                                    categoryData.category.map(category =>
                                                        <SelectItem key={category._id} value={category._id} >{category.name}</SelectItem>)
                                                }
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter title"  {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="slug"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Slug</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Slug name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className='mb-3'>
                            <span className='mb-3 block '>Featured Image</span>
                            <Dropzone onDrop={acceptedFiles => handleFileSelection(acceptedFiles)}>
                                {({ getRootProps, getInputProps }) => (

                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <div className='flex justify-center items-center w-36 h-36 border-2 border-dashed cursor-pointer'>
                                            <img src={preview} />
                                        </div>

                                    </div>
                                )}
                            </Dropzone>

                        </div>

                        <div className='mb-3'>
                            <FormField
                                control={form.control}
                                name="blogcontent"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Blog Content</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder='write something...' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>


                        <Button type="submit" className='w-full cursor-pointer'>Submit</Button>

                    </form>
                </Form>



            </Card>

        </div>
    )
}
