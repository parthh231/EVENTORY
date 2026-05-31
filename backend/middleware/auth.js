const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

const protect = async (req, res, next) => {
    let token = req.headers.authorization && req.headers.authorization.startsWith('Bearer') ? req.headers.authorization.split(' ')[1] : null;
    if(token){
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");
            if(!req.user){
                return res.status(401).json({ message: 'Not authorized, User not found'});
            }
            next();
        }
        catch(error){
            return res.status(401).json({message : 'Not authorized, token failed'});
        }
    }
    else {
        return res.status(401).json({message : 'Not authorized, no token'});
    }
}