const express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const User = require('../Models/User')
const router = express.Router();
const { body, validationResult } = require('express-validator');

const JWT_SECRET = "Adapadakaunpada";// Should be on the secret location

//Creating a user using: POST "/api/auth/createuser"

router.post('/createuser', [
    body('name', 'Enter more tha 2 Words').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password should be more than 5 letters').isLength({ min: 6 })
], async (req, res) => {
    //Return bad requests and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    //Check wether the user with same email already exists

    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "Sorry a user with this email already exists." })
        }
        const salt = await bcrypt.genSalt(10);
        let securePass = await bcrypt.hash(req.body.password, salt);
        
        //Creating a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securePass,
        });

        //Getting the id of the user
        const data = {
           user:  {
            id: user.id
        }}
        //Creating an authentication token for the user
        const authData = jwt.sign(data, JWT_SECRET);
        res.json({authData});

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
})

module.exports = router;