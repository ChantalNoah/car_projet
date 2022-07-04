const jwt = require('jsonwebtoken')
const primaryKey = require("../auth/private_key")

module.exports = (req, res, next) => {
    const authorizationHeader = req.headers.authorization
    
    if (!authorizationHeader) {
        const message = `You did not provide an authentication token. Add one in the request header.`
        return res.status(401).json({message, headers: req.headers})
    }

    const token = authorizationHeader.split(' ')[1]
    const decodedToken = jwt.verify(token, primaryKey, (error, decodedToken) => {
        if (error) {
            const message = `The user is not authorized to access this resource.`
            return res.status(401).json({message, data: error})
        }
        
        const userId = decodedToken.userId
        if (req.body.UserId && req.body.UserId !== userId) {
            const message = `User ID is invalid.`
            res.status(401).json({message})            
        } else {
            next()
        }
    })
}