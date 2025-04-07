import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Link } from 'react-router-dom'
import { RouteAddCategory, RouteEditCategory } from '@/Helpers/Routename'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useFetch } from '@/hooks/useFetch'
import { getEnv } from '@/Helpers/getEnv'
import { FaRegEdit } from "react-icons/fa";
import { BsFillTrash3Fill } from "react-icons/bs";
import { Loading } from '@/components/Loading/Loading'
import { handleDelete } from '@/Helpers/handleDelete'
import { showToastify } from '@/Helpers/showToastify'
import { useSelector } from 'react-redux'
import moment from 'moment'


export const CommentsPage = () => {

    const userData = useSelector((state) => state.user)

    // console.log(userData);
    const Role = userData.user.role
    const userId = userData.user._id;
    // console.log(userId);



    const [refreshData, setRefreshData] = useState(false)
    // console.log(refreshData);


    const { data, loading, error } = useFetch(`${getEnv('VITE_API_BASE_URL')}/comment/get-all-comments/${Role}/${userId}`, {
        method: 'get',
        Credential: 'include'
    }, [refreshData])

    // console.log(data);

    const handleDeleteCategory = async (id) => {
        // console.log(id);
        
        const response = await handleDelete(`${getEnv('VITE_API_BASE_URL')}/comment/delete/${id}`)
        // console.log(response);


        if (response) {
            setRefreshData(!refreshData)
            showToastify('success', "comment deleted")
        }
        else {
            showToastify('error', "comment  not deleted")

        }


    }

    if (loading) return <Loading />
    return (
        <Card >
            
            <CardContent>
                <Table>

                    <TableHeader>
                        <TableRow>
                            <TableHead >Blog</TableHead>
                            <TableHead>Commented By</TableHead>
                            <TableHead>Comment</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data && data.comments.length > 0 ?


                            data.comments.map((comment) => {
                                return (
                                    <TableRow key={comment._id}>
                                        <TableCell>{comment.blogid.title}</TableCell>
                                        <TableCell>{comment.author.name}</TableCell>
                                        <TableCell>{comment.comment}</TableCell>
                                        <TableCell>{moment(comment.createdAt).fromNow()}</TableCell>
                                        <TableCell className='flex gap-3'>
                                           
                                            <Button variant="outline" className='hover:bg-black hover:text-white' onClick={() => {
                                                handleDeleteCategory(comment._id)
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
