const mongoose = require('mongoose')

var url = 'mongodb://127.0.0.1:27017/shey-pizza'

mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true })

var db = mongoose.connection

db.on('connected',() => {
    console.log('Mongo Database connected:', url)
})

db.on('error', err => {
    console.error('connection error:', err)
})

module.exports.mongoose