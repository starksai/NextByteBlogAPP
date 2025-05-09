import express from 'express'
import { addBlog, deleteBlog, editBlog, getRelatedBlog, getBlog, showAllBlog, updateBlog, getBlogsByCategory, getSearch, showAllBlogHome } from '../controllers/Blog.controller.js'
import upload from '../config/multer.config.js'

const BlogRouter = express.Router()

BlogRouter.post('/add',upload.single('file'), addBlog)
BlogRouter.get('/edit/:blogid', editBlog)
BlogRouter.delete('/delete/:blogid', deleteBlog)
BlogRouter.put('/update/:blogid',upload.single('file'), updateBlog)
BlogRouter.get('/get-all/:userId?/:role?', showAllBlog)
BlogRouter.get('/get-all-home', showAllBlogHome)
BlogRouter.get('/get-related-blog/:category/:blog', getRelatedBlog)
BlogRouter.get('/get-blog/:slug', getBlog)
BlogRouter.get('/get-blogs-by-category/:category', getBlogsByCategory)
BlogRouter.get('/get-search-blogs/:q', getSearch)




export default BlogRouter
