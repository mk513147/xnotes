const express = require('express');
const User = require('../Models/User')
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser')
const router = express.Router();
const { body, validationResult } = require('express-validator');

const JWT_SECRET = "Adapadakaunpada";// Should be on the secret location

//ROUTE: 1 Creating a user using: POST "/api/auth/createuser"

router.post('/createuser', [
    body('name', 'Enter more tha 2 Words').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password should be more than 5 letters').isLength({ min: 6 })
], async (req, res) => {
    //Return bad requests and errors
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }

    //Check wether the user with same email already exists

    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({success, error: "Sorry a user with this email already exists." })
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
            user: {
                id: user.id
            }
        }
        //Creating an authentication token for the user
        const authData = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, authData });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
})

//ROUTE: 2 Authenticate a user using: POST "/api/auth/login" : No login required

router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password should not be empty!').exists(),
], async (req, res) => {
    //Return bad requests and errors
    
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            success = false;
            return res.status(400).json({ error: "Please login with correct credentials." })
        }

        const passCompare = await bcrypt.compare(password, user.password);

        if (!passCompare) {
            success = false;
            return res.status(400).json({success, error: "Please login with correct credentials." })
        }

        const data = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authToken });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

//ROUTE: 2 Get loggedin user details using: POST "/api/auth/getuser" :login required

router.post('/getuser', fetchuser, async (req, res) => {
    //Return bad requests and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})
module.exports = router;