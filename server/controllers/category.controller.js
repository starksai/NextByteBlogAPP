
import { handleError } from "../Helper/handleErroe.js"
import Category from "../models/category.model.js"


export const addCategory = async (req, res, next) => {
    try {
        const { name, slug } = req.body

        const category = new Category({
            name, slug
        })

        await category.save()

        res.status(200).json({
            statuscode: true,
            message: "Added new category successfully"
        })

    } catch (error) {
        next(handleError(500, error.message))
    }
}

export const showCategory = async (req, res, next) => {
    try {

        const {categoryid} = req.params;
        // console.log(categoryid, 'from controller');
        const category = await Category.findById(categoryid)

        // console.log(category,"i am the one");
        
        if(!category){
            handleError(404,"data not found")
        }
        
        res.status(200).json({
            category
        })
    } catch (error) {
        next(handleError(500, error.message))
    }
}

export const updateCategory = async (req, res, next) => {
    try {
        const {name, slug} = req.body

        // console.log(name, slug, "data from rez.body");

        const {categoryid}= req.params
        // console.log(categoryid,"dsata from req.params");
        

        const category = await Category.findByIdAndUpdate(categoryid,{
            name,slug
        })

        // console.log(category, "data from mangog db");

        res.status(200).json({
            success : true,
            message : "data updated successfully",
            category,
        })


        
        

    } catch (error) {
        next(handleError(500, error.message))
    }
}

export const deleteCategory = async (req, res, next) => {
    try {
        const {categoryid} = req.params
        
        await Category.findByIdAndDelete(categoryid)
        

        res.status(200).json({
            success : true,
            message : "Category Deleted successfully.",
        })

    } catch (error) {
        next(handleError(500, error.message))
    }
}

export const getAllCategory = async (req, res, next) => {
    try {
        const category = await Category.find().sort({ name: 1 }).lean().exec()
        //    console.log(category)

        res.status(200).json({
            category
        })

    } catch (error) {
        next(handleError(500, error.message))
    }
}

