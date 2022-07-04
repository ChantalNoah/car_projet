const models = require('../models');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const primaryKey = require('../auth/private_key')

module.exports.signIn = (req, res) => {
   
    models.User.findOne({where: {email: req.body.email}}).then((user) => {
        if(!user){
            const message = `The requested user does not exist.`
            return res.status(404).json({message}) 
        }

        bcrypt.compare(req.body.password, user.password)
        .then(isPasswordValid => {
            
            if (!isPasswordValid) {
                const message = `The password is incorrect.`
                return res.status(401).json({message}) 
            }
            
            // JWT
            const token = jwt.sign(
                {userId: user.id},
                primaryKey,
                {expiresIn: '24h'}
            )
            const message = `User has been successfully logged in`
            return res.status(200).json({message, data: user, token})
        })
        .catch((error) => {
            const message = `The user could not be logged in. Try again in a few moments`
            res.json({message, data: error})
        })
    })
}