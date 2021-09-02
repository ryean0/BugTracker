// Use express router to have routes in different folders
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../schema/User');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');

/*  
    @route GET api/auth
    @descr Test route (make sure auth middleware is working)
    @access Public ()
*/
// Everytime user accesses a route with auth middleware, token will be grabbed from req.header, and user id will be added to req.user
router.get('/', auth, async (req, res) => {
    try {
        // search for user in mongodb 
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

/*  @route POST api/auth
    @descr Authenticate registered user & get token
    @access Public ()
*/
router.post('/', [

    // check if email is of the email format
    check('email', 'Error: Please include a valid email!').isEmail(),
    // check password
    check('password', 'Error: Please enter a password with 8 or more characters!').isLength({ min: 8 })
    
], async (req, res) => {

    // req is the data that is being sent from client to this route
    const errors = validationResult(req);
    // if there are errors, return the error messages specified in array above
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    // ******** Authenticating User (Assigning Token) *************
    const { email, password } = req.body;

    try {
        // Read Mongoose Documentation for database queries (below is querying by email)
        let user = await User.findOne({ email:email });
        // Check if user exists, if not send back error
        if (!user) {
            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials!' }] });
        }

        // Check if the entered password is correct (bcrypt compare())

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials!' }] });
        }

        const payload = {
            user: {
                id: user.id
            }
        }
        // Sign jwt (one of its args is a secret, so we keep in default.json file so its hidden), expiry time is when the token expires
        jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 36000000 }, (err, token) => {
            if (err) throw err;
            // send token back to client if no error (token will be sent to the frontend which will handle it)
            res.json({ token });
        });

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;