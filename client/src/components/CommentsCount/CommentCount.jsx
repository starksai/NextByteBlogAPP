import { getEnv } from '@/Helpers/getEnv';
import { useFetch } from '@/hooks/useFetch';
import React from 'react'
import { FaRegComment } from "react-icons/fa";

export const CommentCount = ({ props }) => {
    const blogid = props.blogid
    // console.log(blogid);

    const { data, loading, error } = useFetch(`${getEnv("VITE_API_BASE_URL")}/comment/get-comments-count/${blogid}`,{
        method : 'get',
        credential : 'include'
    })

    // console.log(data);
    

    return (
        <button type='button' className='flex justift-center items-center gap-1'>
            <FaRegComment />
            <span>{data && data.commentsCount}</span>
        </button>
    )
}
