
import { handleError } from "../Helper/handleErroe.js"
import Category from "../models/category.model.js"


export const addCategory = async (req, res, next)=>{
    try {
        const {name, slug} = req.body
        
        const category = new Category({
            name,slug
        })

        await category.save()

        res.status(200).json({
            statuscode : true,
            message : "Added new category successfully"
        })
        
    } catch (error) {
        next(handleError(500, error.message))
    }
}

export const showCategory = async (req, res, next)=>{
    try {
        
    } catch (error) {
        next(handleError(500, error.message))
    }
}

export const updateCategory = async (req, res, next)=>{
    try {
        
    } catch (error) {
        next(handleError(500, error.message))
    }
}

export const deleteCategory = async (req, res, next)=>{
    try {
        
    } catch (error) {
        next(handleError(500, error.message))
    }
}

export const getAllCategory = async (req, res, next)=>{
    try {
       const category = await  Category.find().sort({name:1}).lean().exec()
    //    console.log(category)
       
       res.status(200).json({
        category
       })
        
    } catch (error) {
        next(handleError(500, error.message))
    }
}

