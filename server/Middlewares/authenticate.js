import jwt from 'jsonwebtoken'

export const authenticate = async (req, res, next) => {
    try {
        const  token  = req.cookies.access_token
        if (!token) {
            return next(403, 'Unathorized')
        }
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET_KEY)

        req.user = decodeToken
        next()

    } catch (error) {
        return next(500, error.message)
    }
}