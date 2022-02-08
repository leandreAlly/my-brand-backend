const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const {registerValidation,loginValidation} = require("../validation");


class UserController{
    
    static signup = async (req, res, next) => {

        // LETS VALIDATE A DATE BEFORE WE MAKE A USER
        const {error}= registerValidation(req.body);
        if(error){
            return res.status(400).send(error.details[0].message);
        }
       // check if the email is already exists
       const emailExists = await User.findOne({email: req.body.email});
       if(emailExists){
           return res.status(400).send('Email already exists');
    
       }
    
       bcrypt.hash(req.body.password, 10).then(
        (hash) => {
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: hash
            });
            user.save().then(
                () => {
                    res.status(201).json({
                        message: 'User added successfully',
                    });
                }
            ).catch(
                (error) => {
                    res.status(500).json({
                        error: error
                    });
                }
            );
        }
    );
    
    };
    
    static login = async (req,res,next) => {
    
         // LETS VALIDATE A DATE BEFORE WE MAKE A USER

         const {error}= loginValidation(req.body);
         if(error){
             return res.status(400).send(error.details[0].message);
         }
    
         User.findOne({ email: req.body.email }).then(
            (user) => {
                if (!user){
                    return res.status(401).json({
                        error: new Error('User not found!')
                    });
                }

                bcrypt.compare(req.body.password, user.password).then(
                    (valid) => {
                        if (!valid){
                            return res.status(401).json({
                                error: new Error('Incorect password!')
                            });
                        }
                        const token = jwt.sign({ userId: user._id }, 
                            'RANDOM_TOKEN_SECRET');
                        res.status(200).json({
                            userId: user._id,
                            token: token
                        });
                    }
                ).catch(
                    (error) => {
                        res.status(500).json({
                            error: error
                        });
                    }
                );
    
            }
        ).catch(
            (error) => {
                res.status(500).json({
                    error:error
                });
            }
            );

        }
}


export default UserController;














