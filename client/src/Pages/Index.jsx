import { BlogCard } from '@/components/BlogCard/BlogCard'
import { Loading } from '@/components/Loading/Loading'
import { getEnv } from '@/Helpers/getEnv'
import { useFetch } from '@/hooks/useFetch'
import React from 'react'
import { FaHome } from "react-icons/fa";

export const Index = () => {

  const { data: blogData, loading, error } = useFetch(`${getEnv('VITE_API_BASE_URL')}/blog/get-all-home`, {
    method: 'get',
    Credential: 'include'
  })

  // console.log(blogData);

  if (loading) return <Loading />
  return (
    <>
      <div className='text-2xl pb-4 border-b flex items-center gap-2  font-blod'>
        <FaHome />
        <h1 > Home</h1>
      </div>

      <div className='grid sm:grid-cols-1 md:grid-cols-1  lg:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-4 grid-cols-1 gap-5 my-5'>
        {blogData && blogData.blog.length > 0 ?
          blogData.blog.map(blog => <BlogCard key={blog._id} props={blog} />)

          :
          <h1>No Data found...</h1>
        }
      </div>
    </>

  )
}
