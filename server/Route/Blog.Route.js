import express from 'express'
import { addBlog, deleteBlog, editBlog, showAllBlog, updateBlog } from '../controllers/Blog.controller.js'
import upload from '../config/multer.config.js'

const BlogRouter = express.Router()

BlogRouter.post('/add',upload.single('file'), addBlog)
BlogRouter.get('/edit/:blogid', editBlog)
BlogRouter.delete('/delete/:blogid', deleteBlog)
BlogRouter.put('/update/:blogid',upload.single('file'), updateBlog)
BlogRouter.get('/get-all', showAllBlog)



export default BlogRouter
