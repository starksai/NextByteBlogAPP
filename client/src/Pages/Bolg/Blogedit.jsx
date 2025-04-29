import React, { useEffect, useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Link, useNavigate, useParams } from 'react-router-dom'
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
import { Loading } from '@/components/Loading/Loading'

export const Blogedit = () => {

  const [isSubmit, setIsSubmit] = useState(false)
  const { blog_id } = useParams()

  // console.log('hii',blog_id);

  const navigate = useNavigate()
  const { data: categoryData, loading, error } = useFetch(`${getEnv('VITE_API_BASE_URL')}/category/all-category`, {
    method: 'get',
    Credential: 'include'
  })

  const user = useSelector((state) => state.user)
  const [preview, setPreview] = useState()
  const [file, setFile] = useState()


  const { data: blogData, loading: blogLoading } = useFetch(`${getEnv('VITE_API_BASE_URL')}/blog/edit/${blog_id}`, {
    method: 'get',
    Credential: 'include'
  }, [blog_id])




  // console.log(blogData);
  // console.log(blogData.blog.category.name);
  // console.log(blogData.blog.title);



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


  // console.log(blogData.blog.title);


  useEffect(() => {
    if (blogData) {
      setPreview(blogData.blog.featuredImage)
      form.setValue('category', blogData.blog.category._id)
      form.setValue('title', blogData.blog.title)
      form.setValue('slug', blogData.blog.slug)
      form.setValue('blogcontent', blogData.blog.blogContent)
    }

  }, [blogData])


  const blogTitle = form.watch("title")
  useEffect(() => {


    if (blogTitle) {
      const slug = slugify(blogTitle, { lower: true })

      form.setValue("slug", slug)

    }

  }, [blogTitle])




  const handleFileSelection = (files) => {
    // console.log(files); the files are coming as array
    const file = files[0]
    const preview = URL.createObjectURL(file)
    setFile(file)
    setPreview(preview)
  }



  async function onSubmit(values) {
    setIsSubmit(true)
    // console.log(values);

    try {
      // const newData = { ...values, author: user.user._id }
      // console.log(newData);

      const formData = new FormData()
      formData.append("file", file)
      formData.append("data", JSON.stringify(values))


      const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/blog/update/${blog_id}`, {
        method: 'put',
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
    finally{
      setIsSubmit(false)
    }

  }

  if (blogLoading) return <Loading />
  return (
    <div>
      <Card className='p-5  max-w-5xl mx-auto w-full  '>

        <h1 className='text-2xl flex justify-center items-center'>EDIT BLOG</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
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
                    <Input placeholder="Slug name" disabled {...field} />
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


            <Button type="submit" className='w-full cursor-pointer' disabled={isSubmit}>
              {isSubmit ? "Submitting" : "Submit"}
            </Button>

          </form>
        </Form>



      </Card>

    </div>
  )
}
