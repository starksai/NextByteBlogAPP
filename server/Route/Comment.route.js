import express from 'express'
import { addComment } from '../controllers/Comment.controller.js'

const CommentRouter = express.Router()


CommentRouter.post('/add', addComment)



export default CommentRouter
