const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, UnauthenticatedError} = require('../errors')

const register = async (req,res) => {
    
    //COMMENTed OUT, because handled in mongoose schema 'pre' save

    //const {name,email,password} = req.body
    // tempUser with encrypted password, 
    //salt is random bites, higher the number the safer, but more processing, 10 is secure
    
    //const salt = await bcrypt.genSalt(10);
    //const hashedPassword = await bcrypt.hash(password, salt);

    //const tempUser = {name,email,password:hashedPassword}

    const user = await User.create({...req.body})
    const token = user.createJWT()
    //const token = jwt.sign({userId:user._id,name: user.name},process.env.JWT_SECRET,{
    //    expiresIn: '30d'
    //    })
    res
    .status(StatusCodes.CREATED)
    .json({user: {name:user.name}, token})
}

const login = async (req,res) => {
    const {email,password} = req.body
    if (!email || !password) {
        throw new BadRequestError('Please provide email and password')
    }
    const user = await User.findOne({email})
    if (!user) {
        throw new UnauthenticatedError('Invalid Credentials')
    }
    const isPasswordCorrect = await user.comparePasswords(password)
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Password is wrong, man')
    }
    const token = user.createJWT()
    res.status(StatusCodes.OK).json({user: {name:user.name}, token})
}

module.exports = {login,register}