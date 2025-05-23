import React, { useState } from 'react'
import { FaComments } from "react-icons/fa6";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from '@/components/ui/button'
import { Textarea } from '../ui/textarea';
import { getEnv } from '@/Helpers/getEnv';
import { showToastify } from '@/Helpers/showToastify';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RouteSignIn } from '@/Helpers/Routename';
import { CommentsList } from '../CommentsList/CommentsList';

export const Comment = ({ props }) => {

    const [newComment, setNewComment] = useState()

    const user = useSelector((state) => state.user)

    const formSchema = z.object({
        comment: z.string(),
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            comment: "",
        },
    })

    async function onSubmit(values) {

        // console.log(values);

        try {
            let newValues = { ...values, blogid: props.blogid, author: user.user._id }
            const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/comment/add`, {
                method: 'post',
                credentials : 'include',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newValues)
            })

            const data = await response.json()
            // console.log(data);

            if (!response.ok) {
                return showToastify("error", data.message)
            }
            setNewComment(data.comment)

            form.reset()
            showToastify("success", data.message)

        } catch (error) {
            // console.log(error.message);
            showToastify("error", error.message)
        }

    }

    const handleCommentWheneLoggedOff = () => {
        showToastify('error', "login for comment")
    }


    return (
        <div >
            <div className='flex items-center gap-2 text-2xl font-blod '>
                <FaComments /> <span>Comments</span>
            </div>

            {user && user.isLoggedIn
                ?
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="comment"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Comment</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Enter your comment here.." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" >Submit</Button>
                    </form>
                </Form>
                :
                // <>
                // <Textarea onClick={handleCommentWheneLoggedOff} />
                // </>
                <Button asChild >
                    <Link to={RouteSignIn} >
                        Sign In
                    </Link>
                </Button>

            }

            <div className='border-t mt-5 pt-5' >
                <CommentsList props={{ blogid: props.blogid, newComment }} />

            </div>


        </div>
    )
}
