const express = require('express');
const connectToDB = require('./config/database')
const path = require('path')
const app = express();

// Connect to database
connectToDB();

// Initialize built in express middleware to parse POST request body. Allows us to call console.log(req.body)
app.use(express.json({ extended: false }));

// // Simple GET request endpoint, res.send(response) returns JSON response to browser
app.get('/', (req, res) => res.send('API Running'));

// Define Routes (app.use() maps first argument to endpoint defined in the second arg)
app.use('/api/users', require('./api/users'));
app.use('/api/auth', require('./api/auth'));

// process.env.PORT searches env variables for PORT variable (used for heroku deployment)
const PORT = process.env.PORT || 5000;

// Upon connection to port 5000, execute callback function
app.listen(PORT, ()=>console.log(`Server started on PORT ${PORT}`));