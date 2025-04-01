import { Comment } from '@/components/Comment/Comment'
import { Loading } from '@/components/Loading/Loading'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { getEnv } from '@/Helpers/getEnv'
import { useFetch } from '@/hooks/useFetch'
import React from 'react'
import { useParams } from 'react-router-dom'

export const SingleBlogDetails = () => {
  const { category, blog } = useParams()

  // console.log(blog);

  const { data, loading, error } = useFetch(`${getEnv('VITE_API_BASE_URL')}/blog/get-blog/${blog}`, {
    method: 'get',
    Credential: 'include'
  })

  // console.log(data);


  if (loading) return <Loading />
  return (
    <div className='flex justify-between gap-10 '>
      {data &&
        <>
          <div className='border rounded w-[70%] p-5'>
            <h1 className='text-2xl font-bold mb-3'>{data.blog.title}</h1>
            <div className='flex justify-between items-center mb-3'>
              <div className='flex justify-between items-center'>
                <Avatar >
                  <AvatarImage src={data.blog.author.avatar} />
                </Avatar>
                <span> {data.blog.author.name}</span>
              </div>
            </div>
            <div className='mb-5 rounded'>
              <img src={data.blog.featuredImage} className='rounded' />
            </div>
            <div>
              {data.blog.blogContent}
            </div>
            <div className='border-t mt-5 pt-5'>
              <Comment props={{blogid : data.blog._id} }/>
            </div>
          </div>


        </>
      }

      <div className='border rounded w-[30%]'></div>
    </div>
  )
}
