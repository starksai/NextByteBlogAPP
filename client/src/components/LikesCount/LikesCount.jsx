import { getEnv } from '@/Helpers/getEnv';
import { showToastify } from '@/Helpers/showToastify';
import { useFetch } from '@/hooks/useFetch';
import React, { useEffect, useState } from 'react'
import { FaRegHeart } from "react-icons/fa";
import { useSelector } from 'react-redux';

export const LikesCount = ({ props }) => {

    const [likeCount, setLikeCount] = useState(0)

    const user = useSelector((state) => state.user)

    const { data: blogLikeCount, loading, error } = useFetch(`${getEnv("VITE_API_BASE_URL")}/blog-like/get-like/${props.blogid}`, {
        method: 'get',
        credentials: 'include'
    })
    // console.log(data);


    useEffect(() => {
        if (blogLikeCount) {
            setLikeCount(blogLikeCount.likeCounts)
        }
    }, [blogLikeCount])



    const handleLike = async () => {

        try {
            if (!user.isLoggedIn) {
                return showToastify('error', 'please login to your account.')
            }

            const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/blog-like/do-like`,
                {
                    method: "POST",
                    credentials: 'include',
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify({ blogid: props.blogid, userid: user.user._id })

                })

            if (!response.ok) {
                showToastify('error', response.statusText)

            }

            const responseData = await response.json()
            setLikeCount(responseData.likeCounts)

        } catch (error) {
            showToastify("error", error)


        }



    }

    return (
        <button onClick={handleLike} type='button' className='flex justift-center items-center gap-1 cursor-pointer'>
            <FaRegHeart />
            <span>{likeCount}</span>
        </button>
    )
}
