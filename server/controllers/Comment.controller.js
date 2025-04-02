import { handleError } from "../Helper/handleErroe.js"
import Comment from "../models/comment.modle.js"

export const addComment = async (req, res, next) => {

    try {

        const { author, blogid, comment } = req.body

        const newComment = new Comment({
            author,
            blogid,
            comment
        })

        await newComment.save()

        res.status(200).json({
            status: true,
            message: "new comment added.",
            comment: newComment
        })



    } catch (error) {
        next(handleError(500, error.message))

    }

}

export const getComments = async (req, res, next) => {

    try {

        const { blogid } = req.params

        const comments = await Comment.find({ blogid }).populate('author', 'name avatar').sort({ createdAt: -1 }).lean().exec()


        res.status(200).json({
            comments
        })



    } catch (error) {
        next(handleError(500, error.message))

    }

}

export const CommentsCount = async (req, res, next) => {

    try {

        const { blogid } = req.params

        const commentsCount = await Comment.countDocuments({ blogid })


        res.status(200).json({
            commentsCount
        })



    } catch (error) {
        next(handleError(500, error.message))

    }

}