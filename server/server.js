const express = require("express")
const app = express()
const Pizza = require("./model/pizzaModel")
const db = require("./db.js")
// const app = express()
const pizzasRoute = require('./routes/pizzasRoute')
const userRoute = require("./routes/userRoute")
const ordersRoute = require("./routes/ordersRoute")



app.use(express.json())

const path = require("path")
if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static('client/build'))
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, '/client/build/index.html'))
    })
}

// app.get('/', (req, res) => {
//     res.send("Server working")
// })

app.use('/api/pizzas', pizzasRoute)
app.use("/api/users/", userRoute)
app.use("/api/orders/", ordersRoute)

const port = process.env.PORT || 5000

app.listen(port, () => `server running on port ${port}`)