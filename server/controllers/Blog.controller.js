import cloudinary from "../config/cloudinary.js";
import { handleError } from "../Helper/handleErroe.js";
import Blog from "../models/blog.model.js";
import Category from "../models/category.model.js";

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
        const { blogid } = req.params
        const data = JSON.parse(req.body.data)

        // console.log(data);

        const blog = await Blog.findById(blogid)

        blog.category = data.category
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
        const { userId, role } = req.params

        // console.log(userId);
        // console.log(role);

        let blog;

        if (role === "admin") {
            blog = await Blog.find().populate('author', 'name avatar role').populate('category', 'name slug').sort({ createdAt: -1 }).lean().exec()
        }
        else {
            blog = await Blog.find({author : userId}).populate('author', 'name avatar role').populate('category', 'name slug').sort({ createdAt: -1 }).lean().exec()
        }




        res.status(200).json({
            blog
        })


    } catch (error) {
        next(handleError(500, error.message))

    }
}

export const showAllBlogHome = async (req, res, next) => {
    try {

        let blog =  await Blog.find().populate('author', 'name avatar role').populate('category', 'name slug').sort({ createdAt: -1 }).lean().exec()

        



        res.status(200).json({
            blog
        })


    } catch (error) {
        next(handleError(500, error.message))

    }
}

export const getBlog = async (req, res, next) => {
    const { slug } = req.params
    try {
        let blog = await Blog.findOne({ slug }).populate('author', 'name avatar role').populate('category', 'name slug').lean().exec()

        res.status(200).json({
            blog
        })


    } catch (error) {
        next(handleError(500, error.message))

    }
}


export const getRelatedBlog = async (req, res, next) => {

    try {
        const { category, blog } = req.params

        // console.log(category);
        // console.log(blog);

        const categoryData = await Category.findOne({ slug: category })

        // console.log(categoryData);

        if (!categoryData) {
            return next(handleError(404, "category data not found."))
        }
        const categoryId = categoryData._id

        let relatedBlog = await Blog.find({ category: categoryId, slug: { $ne: blog } }).lean().exec()

        res.status(200).json({
            relatedBlog
        })


    } catch (error) {
        next(handleError(500, error.message))

    }
}


export const getBlogsByCategory = async (req, res, next) => {
    const { category } = req.params

    try {
        const categoryData = await Category.findOne({ slug: category }).lean().exec()

        // console.log(categoryData._id);

        const categoryId = categoryData._id

        if (!categoryId) {
            return next(handleError('404', "categoryId not found"))

        }

        const BlogsData = await Blog.find({ category: categoryId }).populate('author', 'avatar name role email').populate('category', 'name slug').lean().exec()

        // console.log(BlogsData);

        res.status(200).json({
            BlogsData
        })

    } catch (error) {
        next(handleError('500', error.message))
    }
}


export const getSearch = async (req, res, next) => {
    const { q } = req.params

    // console.log(q);


    try {

        if (!q) {
            return next(handleError("404", "quer data not found."))
        }
        const searchBlogs = await Blog.find({ title: { $regex: q, $options: 'i' } }).populate('author', 'avatar name role email').populate('category', 'name slug').lean().exec()

        // console.log(searchBlogs);

        res.status(200).json({
            searchBlogs
        })

    } catch (error) {
        next(handleError('500', error.message))
    }
}