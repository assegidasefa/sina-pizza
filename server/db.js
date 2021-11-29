const mongoose = require('mongoose')
require("dotenv").config()

var url = process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/shey-pizza'
console.log(url)

mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true })

var db = mongoose.connection

db.on('connected', () => {
    console.log('Mongo Database connected:', url)
})

db.on('error', err => {
    console.error('connection error:', err)
})

module.exports.mongoose