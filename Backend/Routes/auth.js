const express = require('express')
const User = require('../Models/User')
const router = express.Router();
const {body, validationResult} = require('express-validator');

//Creating a user using: POST "/api/auth"

router.post('/', [
    body('name', 'Enter more tha 2 Words').isLength({min: 3}),
    body('email','Enter a valid email').isEmail(),
    body('password', 'Password should be more than 5 letters').isLength({min: 6})
], (req, res)=>{
const errors = validationResult(req);
if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()});
}
User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  }).then(user => res.json(user));
})

module.exports = router;