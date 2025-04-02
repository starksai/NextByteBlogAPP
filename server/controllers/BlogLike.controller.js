import { handleError } from "../Helper/handleErroe.js"
import BlogLike from "../models/bloglike.modle.js"


export const doLike = async (req, res, next) => {

    try {
        const { userid, blogid } = req.body
        let like;
        like = await BlogLike.findOne({ userid, blogid })

        if (!like) {
            let saveLike = new BlogLike({
                userid,
                blogid
            })

            like = await saveLike.save()

        }
        else {
            like = await BlogLike.findByIdAndDelete(like._id)

        }

        const likeCounts = await BlogLike.countDocuments({ blogid })

        res.status(200).json({
            likeCounts
        })

    } catch (error) {
        next(handleError(500, error.message))
    }

}



export const blogLikesCount = async (req, res, next) => {

    try {

        const { blogid } = req.params

        const likeCounts = await BlogLike.countDocuments({ blogid })

        res.status(200).json({
            likeCounts
        })



    } catch (error) {
        next(handleError(500, error.message))

    }

}