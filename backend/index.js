const mongoose = require('mongoose')
const app = require('./app')
require('dotenv').config({ path: 'config.env' })

//connect with mongodb database
const url = process.env.CONNECTION
try {
    mongoose.connect(url)
    console.log('Connection established successfully...')
} catch (error) {
    console.log(error)
}

//start server
app.listen(4000, () => {
    console.log('Server is running...')
})

