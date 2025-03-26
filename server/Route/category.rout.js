import express from 'express'
import { addCategory, deleteCategory, getAllCategory, showCategory, updateCategory } from '../controllers/category.controller.js'

const CategoryRoute = express.Router()

CategoryRoute.post('/add', addCategory)
CategoryRoute.get('/show/:categoryid', showCategory)
CategoryRoute.put('/update/:categoryid', updateCategory)
CategoryRoute.delete('/delete/:categoryid', deleteCategory)
CategoryRoute.get('/all-category', getAllCategory)


export default CategoryRoute




