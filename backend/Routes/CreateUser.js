const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtSecret = "HelloMyNameIsPalakIHopeYouAreWell";

router.post("/createuser", [
    body('email', 'Invalid Email Syntax').isEmail(),
    body('password', 'Password must be at least 5 characters long and contain at least one uppercase or lowercase letter, and one special character ')
        .isLength({ min: 5 })
        .matches(/^(?=.*[a-z])(?=.)(?=.*\W).*$/)
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password, salt);

    try {
        await User.create({
            name: req.body.name,
            password: secPassword,
            email: req.body.email,
            location: req.body.location
        });

        res.json({ success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false });
    }
});



//login 

router.post("/loginuser", [
    body('email', 'Invalid Email Syntax').isEmail(),
    body('password', 'Password must be at least 5 characters long and contain at least one uppercase or lowercase letter, and one special character')
        .isLength({ min: 5 })
        .matches(/^(?=.*[a-z])(?=.)(?=.*\W).*$/)
    ], 
    async (req, res) => {
           
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({ errors: errors.array() });
    }

    let email = req.body.email;
        try{
            let userdata = await User.findOne({email});
            if(!userdata)
                {
                    return res.status(400).json({errors: " Try logging with correct credentials"})
                }

                //security
                const pwdCompare = await bcrypt.compare(req.body.password, userdata.password)

                if(!pwdCompare)
                    {
                        return res.status(400).json({errors: " Try logging with correct credentials"})
                    }

                    const data = {
                        user: { 
                            id: userdata.id
                        }
                    }

                    const authToken = jwt.sign(data, jwtSecret);
                    return res.json({success:true, authToken:authToken}); 

        } catch (error) {
            console.log(error)
            res.json({success:false});
        }
    })

module.exports = router;