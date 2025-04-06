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


export const getAllComments = async (req, res, next) => {

    try {

        // const { userId } = req.params

        const comments = await Comment.find().populate('blogid', 'title slug').populate('author', 'name role').sort({ createdAt: -1 }).lean().exec()


        res.status(200).json({
            comments
        })



    } catch (error) {
        next(handleError(500, error.message))

    }

}

export const deleteComment = async (req, res, next) => {

    try {

        const { commentid } = req.params

        // console.log(commentid);

        if (!commentid) {
            return next(handleError('404', "commentid is undifine"))
        }


        const response = await Comment.findByIdAndDelete( commentid )

        if (response.ok) {
            return next(handleError('404', "data not found - null"))

        }
        res.status(200).json({
            success : true,
            message: 'data deleted'
        })



    } catch (error) {
        next(handleError(500, error.message))

    }

}