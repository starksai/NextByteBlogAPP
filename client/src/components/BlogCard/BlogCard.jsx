import React from 'react'
import { Card, CardContent } from '../ui/card'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Badge } from '../ui/badge'
import { FaRegCalendarAlt } from "react-icons/fa";
import { useSelector } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { RouteSingleBlog } from '@/Helpers/Routename';

export const BlogCard = ({ props }) => {

    // console.log(props);

    const title = props.title
    const CapTitle = title[0].toUpperCase()+title.slice(1)

    // console.log(CapTitle);
    


    const user = useSelector((state) => state.user)


    return (
        <Link to={RouteSingleBlog(props.category.slug, props.slug)}>
            <Card className='pt-5 w-full h-90 '>
                <CardContent>
                    <div className='flex justify-between items-center'>
                        <div className='flex justify-between items-center gap-2'>
                            <Avatar>
                                <AvatarImage src={props.author.avatar}  />
                            </Avatar>
                            <span>{props.author.name}</span>
                        </div>
                        {props.author.role === 'admin' && <Badge>Admin</Badge>}

                    </div>
                    <div className='my-2'>
                        <img src={props.featuredImage} className='rounded w-full h-50 ' />
                    </div>
                    <div >
                        <p className='flex items-center gap-2 mb-2'>
                            <FaRegCalendarAlt />
                            <span>{moment(props.createdAt).fromNow()}</span>
                        </p>
                        <h2 className='text-xl font-bold line-clamp-2'>{CapTitle}</h2>
                    </div>

                </CardContent>
            </Card>
        </Link>


    )
}
