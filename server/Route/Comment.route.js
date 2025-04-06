import express from 'express'
import { addComment, CommentsCount, deleteComment, getAllComments, getComments } from '../controllers/Comment.controller.js'

const CommentRouter = express.Router()


CommentRouter.post('/add', addComment)
CommentRouter.get('/get/:blogid', getComments)
CommentRouter.get('/get-comments-count/:blogid', CommentsCount)
CommentRouter.get('/get-all-comments', getAllComments)
CommentRouter.delete('/delete/:commentid', deleteComment)   




export default CommentRouter
