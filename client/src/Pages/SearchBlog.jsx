import { BlogCard } from '@/components/BlogCard/BlogCard'
import { getEnv } from '@/Helpers/getEnv'
import { useFetch } from '@/hooks/useFetch'
import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { FaSearch } from "react-icons/fa";
import { Loading } from '@/components/Loading/Loading'

export const SearchBlog = () => {
    const [searchParams] = useSearchParams()
    const q = searchParams.get('q')
    // console.log(q);


    const { data: searchBlogs, loading, error } = useFetch(`${getEnv('VITE_API_BASE_URL')}/blog/get-search-blogs/${q}`, {
        method: 'get',
        Credential: 'include'
    }, [q])
    console.log(searchBlogs);


    if (loading) return <Loading />
    return (
        <div>
            <h1 className='text-2xl pb-4 border-b flex items-center gap-2'> <FaSearch /> Search results by: {q}</h1>
            <div className='grid sm:grid-cols-1 md:grid-cols-1  lg:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-4 grid-cols-1 gap-5 m-3'>
                {searchBlogs && searchBlogs.searchBlogs.length > 0 ?
                    searchBlogs.searchBlogs.map(blog => <BlogCard key={blog._id} props={blog} />)

                    :
                    <h1 className='font-blod text-2xl font-Nunito'>blogs not found</h1>
                }
            </div>
        </div>
    )
}
