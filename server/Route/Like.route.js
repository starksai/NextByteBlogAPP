import express from 'express'
import { blogLikesCount, doLike } from '../controllers/BlogLike.controller.js'

const LikeRoute = express.Router()


LikeRoute.post('/do-like', doLike)
LikeRoute.get('/get-like/:blogid', blogLikesCount)



export default LikeRoute
