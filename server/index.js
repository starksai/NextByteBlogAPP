import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import mongoose from "mongoose"
import AuthRouter from "./Route/Auth.route.js"
import UserRouter from "./Route/User.route.js"
import CategoryRoute from "./Route/category.rout.js"
import BlogRouter from "./Route/Blog.Route.js"
import CommentRouter from "./Route/Comment.route.js"
import LikeRoute from "./Route/Like.route.js"

dotenv.config() // loading environment variables from .env module


const app = express()
const port = process.env.PORT  // getting port variable from .env module


app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin: "*",  // Allow frontend URL
    credentials: true,  // Allow cookies, auth headers
}))

app.use('/api/auth', AuthRouter)
app.use('/api/user', UserRouter)
app.use('/api/category', CategoryRoute)
app.use('/api/blog', BlogRouter)
app.use('/api/comment', CommentRouter)
app.use('/api/blog-like', LikeRoute)

mongoose.connect(process.env.MONGODB_CONNECT, { dbName: "NextByteBlog" })
    .then(() => console.log("database is connected"))
    .catch(err => console.log("database connection failed", err))


app.listen(port, () => {
    console.log(`server is running in ${port}`);

})

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "internal error";
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})