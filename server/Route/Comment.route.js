import express from 'express'
import { addComment, CommentsCount, getComments } from '../controllers/Comment.controller.js'

const CommentRouter = express.Router()


CommentRouter.post('/add', addComment)
CommentRouter.get('/get/:blogid', getComments)
CommentRouter.get('/get-comments-count/:blogid', CommentsCount)



export default CommentRouter
