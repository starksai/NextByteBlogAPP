import React, { useEffect } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Link } from 'react-router-dom'
import slugify from 'slug'
import { showToastify } from '@/Helpers/showToastify'
import { getEnv } from '@/Helpers/getEnv'

export const Addcategory = () => {
  const formSchema = z.object({
    name: z.string().min(3, "category name must be 3 characters long."),
    slug: z.string().min(3, "slug name must be 3 characters long."),

  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      slug: "",

    },
  })

  useEffect(() => {
    const categoryName = form.watch("name")

    if(categoryName){
      const slug = slugify(categoryName,{lower:true })

      form.setValue("slug",slug)

    }
    
  })


  async function onSubmit(values) {

    // console.log(values);



    try {
      const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/category/add`, {
        method: 'post',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      })

      const data = await response.json()
      // console.log(data);


      if (!response.ok) {
        return showToastify("error", data.message)

      }

      form.reset()
      showToastify("success", data.message)

    } catch (error) {
      console.log(error.message);

      showToastify("error", error.message)

    }

  }
  return (

    <div>
      <Card className='p-5  max-w-screen-md mx-auto '>

        <h1 className='text-2xl flex justify-center items-center'>ADD NEW CATEGORY</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter category name" {...field} />
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




            <Button type="submit" className='w-full'>Submit</Button>

          </form>
        </Form>



      </Card>

    </div>

  )
}
