const User = require("../models/user.models");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

// Register: 
module.exports.register = (req,res) => {
    User.exists({email: req.body.email})
        .then(userExists => {
            if (userExists){
                return Promise.reject({
                    errors: {"duplicate": "Email already Taken"}
                })
            }
            else{
                const user = new User(req.body)
                return user.save()
            }
        })
        .then(user => res.json(user))
        .catch(err => res.status(400).json(err))
}

// Login: 
module.exports.login = (req, res ) => {
    User.findOne({email: req.body.email})
    .then(user => {
        if (user === null){
            res.status(400).json({msg: "invalid login"})
        }
        else{
            bcrypt.compare(req.body.password, user.password)
                .then(passwordIsInvalid => {
                    if(passwordIsInvalid){
                        const newJWT = jwt.sign({
                            _id: user._id
                        }, "SECRET_KEY")
                        res.cookie("usertoken", newJWT, {httpOnly: true}).json("success")
                    }
                    else{
                        res.status(400).json({msg: "INVALID ATTEMPT"})
                    }
                })
        }
    })
}

module.exports.getAllUsers = (req, res) => {
    User.find()
    .then(findAll => res.json(findAll))
    .catch(err => res.json({message: "Error finding all Users", error: err}))

}

