import { BlogCard } from '@/components/BlogCard/BlogCard'
import { Loading } from '@/components/Loading/Loading'
import { Card } from '@/components/ui/card'
import { getEnv } from '@/Helpers/getEnv'
import { useFetch } from '@/hooks/useFetch'
import React from 'react'
import { useParams } from 'react-router-dom'

export const BlogsByCategory = () => {
    const { category } = useParams()
    // console.log(category);

    const { data: blogData, loading, error } = useFetch(`${getEnv('VITE_API_BASE_URL')}/blog/get-blogs-by-category/${category}`, {
        method: 'get',
        Credential: 'include'
    },[category])

    console.log(blogData);

    if (loading) return <Loading />
    return (
        <div className='grid sm:grid-cols-1 md:grid-cols-1  lg:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-4 grid-cols-1 gap-5'>
            {blogData && blogData.BlogsData.length > 0 ?
                blogData.BlogsData.map(blog => <BlogCard key={blog._id} props={blog} />)

                :
                <h1 className='font-blod text-2xl font-Nunito'>{category} blogs not found</h1>
            }
        </div>
    )
}
