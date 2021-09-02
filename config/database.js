const mongoose = require('mongoose');
const config = require('config')
const database = config.get('mongoURI')

const connectToDB = async () => {
    try {
        await mongoose.connect(database)
        console.log('MongoDB Connected Successfully...')
    } catch (err) {
        console.error(err.message);
        process.exit(1)
    }
}
module.exports = connectToDB;