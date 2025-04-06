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
import noprofile from '@/assets/images/noprofileimage.jpg'


export const UserPage = () => {

    const userData = useSelector((state) => state.user)

    // console.log(userData);
    const Role = userData.user.role
    const userId = userData.user._id;
    // console.log(userId);



    const [refreshData, setRefreshData] = useState(false)
    // console.log(refreshData);


    const { data, loading, error } = useFetch(`${getEnv('VITE_API_BASE_URL')}/user/get-all-users`, {
        method: 'get',
        Credential: 'include'
    }, [refreshData])

    console.log(data);

    const handleDeleteCategory = async (id) => {
        // console.log(id);

        const response = await handleDelete(`${getEnv('VITE_API_BASE_URL')}/user/delete/${id}`)
        // console.log(response);


        if (response) {
            setRefreshData(!refreshData)
            showToastify('success', "user deleted")
        }
        else {
            showToastify('error', "user  not deleted")

        }


    }

    if (loading) return <Loading />
    return (
        <Card >

            <CardContent>
                <Table>

                    <TableHeader>
                        <TableRow>
                            <TableHead >Role</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Avatar</TableHead>
                            <TableHead>Dated</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data && data.users.length > 0 ?


                            data.users.map((user) => {
                                return (
                                    <TableRow key={user._id}>
                                        <TableCell>{user.role}</TableCell>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell><img className='rounded w-15' src={user.avatar || noprofile}/></TableCell>
                                        <TableCell>{moment(user.createdAt).format('DD-MM-YYYY')}</TableCell>
                                        <TableCell className='flex gap-3'>

                                            <Button asChild variant="outline" className='hover:bg-black hover:text-white' onClick={() => {
                                                handleDeleteCategory(user._id)
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
