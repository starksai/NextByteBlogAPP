import { getEnv } from '@/Helpers/getEnv';
import { RouteSingleBlog } from '@/Helpers/Routename';
import { useFetch } from '@/hooks/useFetch';
import React from 'react'
import { Link } from 'react-router-dom';

export const RelatedBlog = ({ props }) => {



    // console.log(props);



    const { data: blogData, loading, error } = useFetch(`${getEnv('VITE_API_BASE_URL')}/blog/get-related-blog/${props.category}/${props.blog}`, {
        method: 'get',
        credential: 'include'
    })

    // console.log(blogData);



    return (
        <div>
            <h1 className='text-2xl font-blod p-3 '>Related Blogs</h1>
            {blogData && blogData.relatedBlog.length > 0
                ?
                blogData.relatedBlog.map((rb) => {
                    return (
                        <Link key={rb._id} to={RouteSingleBlog(props.category,rb.slug)} >
                            <div  className='flex p-2 gap-3 items-center '>

                                <img src={rb.featuredImage} className='w-20 rounded' />

                                <h4 className='line-clamp-2'>{rb.title}</h4>
                            </div>
                        </Link>
                    )
                })
                :
                <h3 className='  p-3 '>No Related Blogs</h3>

            }



        </div>
    )
}
