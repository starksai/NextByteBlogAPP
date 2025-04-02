import { getEnv } from '@/Helpers/getEnv'
import { useFetch } from '@/hooks/useFetch'
import React from 'react'
import { Avatar, AvatarImage } from '../ui/avatar'
import noprofile from "../../assets/images/noprofileimage.jpg"
import moment from 'moment'
import { useSelector } from 'react-redux'


export const CommentsList = ({ props }) => {
  const user = useSelector((state) => state.user)
  const blogid = props.blogid
  const { data, loading, error } = useFetch(`${getEnv("VITE_API_BASE_URL")}/comment/get/${blogid}`, {
    method: 'get',
    credentials: 'include'
  });

  // console.log(data);


  if (loading) return <h1>Loading...</h1>
  return (
    <div>

      <h4 className='flex gap-2 text-2xl'>
        {
          props.newComment ?
            <span>{data && data.comments.length + 1}</span>
            :
            <span>{data && data.comments.length}</span>

        }
        Comments
      </h4>

      {props.newComment &&
        <div className=' py-3 border-b-1 '>
          <div className='flex items-center'>
            <Avatar  >
              <AvatarImage src={user?.user?.avatar || noprofile} />
            </Avatar>

            <div>
              <p className='font-blod'>{user?.user?.name}</p>
              <p className='text-xs'>{moment(props?.newComment?.createdAt).fromNow()}</p>
            </div>
          </div>

          <div className='pt-2 text-base'>
            {props.newComment?.comment}
          </div>

        </div>}


      {data && data.comments.length > 0 && data.comments.map((comment) => {
        return (
          <div key={comment._id} className=' py-3 border-b-1 '>

            <div className='flex items-center'>
              <Avatar  >
                <AvatarImage src={comment.author.avatar || noprofile} />
              </Avatar>

              <div>
                <p className='font-blod'>{comment.author.name}</p>
                <p className='text-xs'>{moment(comment.createdAt).fromNow()}</p>
              </div>
            </div>

            <div className='pt-2 text-base'>
              {comment?.comment}
            </div>

          </div>
        )
      })}




    </div>
  )
}
