const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
// bring in our User model schema
const User = require('../schema/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

/* 
    @route: api/users (POST)
    @description: Registering a new user
        - req: name, email, password;
        - res: token
    @access: Public
*/

router.post('/', [
    check('name', 'Please enter your name.').not().isEmpty(),
    check('email', 'Please enter a valid email.').isEmail(),
    check('password', 'Please enter a password with > 8 characters').isLength({ min: 8 }),
    // check('password2', 'Password does not match!').isLength({ min: 8 })
    //     .custom(( value, { req, location, path }) => {
    //         // access request body to compare password2 with password
    //         if (value !== req.body.password) {
    //             throw new Error('Passwords do not match');
    //         } else {
    //             return value;
    //         }
    //     })
    ], 
    async (req, res) => {
        console.log(req.body);
        // error validation
        const errors = validationResult(req);
        
        // if there are errors, return the error messages specified in array above
        if (!errors.isEmpty()) {
            console.log("error")
            return res.status(400).json({ errors: errors.array() })
        }
        
        // Registering the user (adding to 'users' collection)
        const { name, email, password } = req.body

        try {
            // use email as its unique
            let user = await User.findOne({ email: email });
            if (user) {
                return res.status(400).json({ errors: [{ msg: 'User with the current email already exists' }]})
            }
            // Get users gravatar
            const avatar = gravatar.url(email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            })

            // Creating a User object
            user = new User({
                name, 
                email, 
                avatar, 
                password
            })

            // Encrypt password (so actual password is not saved in db)
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            // Saves user to db
            await user.save()
            
            // Sign jsonwebtoken for current user
            const payload = {
                user: {
                    id: user.id
                }
            }
            jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 36000000 }, (err, token) => {
                if (err) throw err;
                // send token back to client if no error
                res.json({ token });
            });

        } catch (err) {
            console.error(err.message)
            res.status(500).send('Server Error, Registration Failed.')
        }

})

module.exports = router;