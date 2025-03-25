import React from 'react'
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


export const Category = () => {

  const { data: categoryData, loading, error } = useFetch(`${getEnv('VITE_API_BASE_URL')}/category/all-category`, {
    method: 'get',
    Credential: 'include'
  })

  // console.log(categoryData);

  if(loading) return <Loading />
  return (
    <Card >
      <CardHeader>
        <div>
          <Button asChild>
            <Link to={RouteAddCategory} >Add category</Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>A list of our categories.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead >Name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categoryData && categoryData.category.length > 0 ?


              categoryData.category.map((category) => {
                return (
                  <TableRow key={category._id}>
                    <TableCell>{category.name}</TableCell>
                    <TableCell>{category.slug}</TableCell>
                    <TableCell className='flex gap-3'>
                      <Button>
                        <Link to={RouteEditCategory(category._id)}>
                          <FaRegEdit />
                        </Link>
                      </Button>
                      <Button>
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
