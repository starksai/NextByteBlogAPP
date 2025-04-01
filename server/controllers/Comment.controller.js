import { handleError } from "../Helper/handleErroe.js"
import Comment from "../models/comment.modle.js"

export const addComment = async (req, res, next)=>{

    try {

        const {author, blogid, comment } = req.body

        const newComment = new Comment({
            author,
            blogid,
            comment
        })

        await newComment.save()

        res.status(200).json({
            status : true,
            message : "new comment added.",
            comment : newComment
        })


        
    } catch (error) {
          next(handleError(500, error.message))
        
    }

}