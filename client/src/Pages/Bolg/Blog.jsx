import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Link } from 'react-router-dom'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { RouteAddBlog, RouteEditBlog } from '@/Helpers/Routename'
import { Loading } from '@/components/Loading/Loading'
import { getEnv } from '@/Helpers/getEnv'
import { useFetch } from '@/hooks/useFetch'
import { showToastify } from '@/Helpers/showToastify'
import { handleDelete } from '@/Helpers/handleDelete'
import { FaRegEdit } from "react-icons/fa";
import { BsFillTrash3Fill } from "react-icons/bs";
import moment from 'moment/moment'

export const Blog = () => {

    const [refreshData, setRefreshData] = useState(false)
    // console.log(refreshData, "outside function, state below");


    const { data: blogData, loading, error } = useFetch(`${getEnv('VITE_API_BASE_URL')}/blog/get-all`, {
        method: 'get',
        Credential: 'include'
    }, [refreshData])

    // console.log(categoryData);

    const handleDeleteCategory = async (id) => {

        const response = await handleDelete(`${getEnv('VITE_API_BASE_URL')}/blog/delete/${id}`)

        // console.log(response);


        if (response) {
            setRefreshData(!refreshData)
            // console.log(refreshData, "inside function");

            showToastify('success', "Data deleted")
        }
        else {
            showToastify('error', "Data not deleted")

        }


    }

    // console.log(blogData);


    if (loading) return <Loading />
    return (
        <Card >
            <CardHeader>
                <div>
                    <Button asChild>
                        <Link to={RouteAddBlog} >Add Blog</Link>
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead >Author</TableHead>
                            <TableHead >Category Name</TableHead>
                            <TableHead >Title</TableHead>
                            <TableHead>Slug</TableHead>
                            <TableHead>Dated</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {blogData && blogData.blog.length > 0 ?


                            blogData.blog.map((blog) => {
                                return (
                                    <TableRow key={blog._id}>
                                        <TableCell>{blog.author.name}</TableCell>
                                        <TableCell>{blog.category.name}</TableCell>
                                        <TableCell>{blog.title}</TableCell>
                                        <TableCell>{blog.slug}</TableCell>
                                        <TableCell>{moment(blog.createdAt).format('DD-MM-YYYY')}</TableCell>
                                        <TableCell className='flex gap-3'>


                                            <Button className='hover:bg-black hover:text-white' variant="outline">
                                                <Link to={RouteEditBlog(blog._id)}>
                                                    <FaRegEdit />
                                                </Link>
                                            </Button>

                                            
                                            <Button variant="outline" className='hover:bg-black hover:text-white' onClick={() => {
                                                handleDeleteCategory(blog._id)
                                            }}>
                                                <Link>
                                                    <BsFillTrash3Fill />
                                                </Link>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )

                            })
                            :
                            <TableRow>
                                <TableCell colSpan={3} >No data fount</TableCell>
                            </TableRow>



                        }

                    </TableBody>
                </Table>


            </CardContent>
        </Card>
    )
}
