import cloudinary from "../config/cloudinary.js";
import { handleError } from "../Helper/handleErroe.js";
import Blog from "../models/blog.model.js";

export const addBlog = async (req, res, next) => {
    try {
        const data = JSON.parse(req.body.data)
        let featuredImage = ''

        if (req.file) {
            try {
                const uploadResult = await cloudinary.uploader.upload(req.file.path, {
                    folder: "nextbyteblog",
                    resource_type: "auto",
                }).catch((err => {
                    next(handleError(500, err.message))
                }));

                featuredImage = uploadResult.secure_url;
            } catch (cloudinaryError) {
                return next(handleError(500, "Cloudinary upload failed: " + cloudinaryError.message));
            }
        }
        const blog = new Blog({
            author: data.author,
            category: data.category,
            title: data.title,
            slug: data.slug,
            featuredImage: featuredImage,
            blogContent: data.blogcontent,
        })

        await blog.save()

        res.status(200).json({
            success: true,
            message: 'Blog successfully added.'
        })

    } catch (error) {
        next(handleError(500, error.message))

    }
}

export const editBlog = async (req, res, next) => {
    try {
        const { blogid } = req.params
        const blog = await Blog.findById(blogid).populate('category', 'name')
        if (!blog) {
            next(handleError(404, 'Data not found.'))
        }
        res.status(200).json({
            blog
        })
        

    } catch (error) {
        next(handleError(500, error.message))

    }
}

export const updateBlog = async (req, res, next) => {
    try {
        const {blogid} = req.params
        const data = JSON.parse(req.body.data)

        // console.log(data);
        
        const blog = await Blog.findById(blogid)

        blog.category =data.category
        blog.slug = data.slug
        blog.title = data.title
        blog.blogContent = data.blogcontent
        let featuredImage = blog.featuredImage

        if (req.file) {
            try {
                const uploadResult = await cloudinary.uploader.upload(req.file.path, {
                    folder: "nextbyteblog",
                    resource_type: "auto",
                }).catch((err => {
                    next(handleError(500, err.message))
                }));

                featuredImage = uploadResult.secure_url;
            } catch (cloudinaryError) {
                return next(handleError(500, "Cloudinary upload failed: " + cloudinaryError.message));
            }
        }

        blog.featuredImage = featuredImage

        await blog.save()
      


        res.status(200).json({
            success: true,
            message: 'Blog updated successfully added.'
        })

    } catch (error) {
        next(handleError(500, error.message))

    }
}

export const deleteBlog = async (req, res, next) => {
    try {
        const { blogid } = req.params

        // console.log(blogid);


        await Blog.findByIdAndDelete(blogid)


        res.status(200).json({
            success: true,
            message: "Blog Deleted successfully.",
        })

    } catch (error) {
        next(handleError(500, error.message))
    }
}

export const showAllBlog = async (req, res, next) => {
    try {
        let blog = await Blog.find().populate('author', 'name avatar role').populate('category', 'name slug').sort({ createdAt: -1 }).lean().exec()

        res.status(200).json({
            blog
        })


    } catch (error) {
        next(handleError(500, error.message))

    }
}

export const getBlog = async (req, res, next) => {
    const {slug} = req.params
    try {
        let blog = await Blog.findOne({slug}).populate('author', 'name avatar role').populate('category', 'name slug').lean().exec()

        res.status(200).json({
            blog
        })


    } catch (error) {
        next(handleError(500, error.message))

    }
}
