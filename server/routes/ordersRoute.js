const express = require("express")
const router = express.Router()
const { v4: uuidv4 } = require('uuid');
const stripe = require("stripe")("sk_test_51Juc0cAlw1rQYjU6OCFnY6dq4jy48921zIDjw8FDJsodfkXgPn5yvgG4rFbf9UwDiJFgPdgb1nekYw6p3yE9K3lT00WjZW2ZC6")
const Order = require("../model/orderModel")


router.post("/placeorder", async (req, res) => {
    const { token, subtotal, currentUser, cartItems } = req.body

    try {
        // first create customer 
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        })

        //then create the payment
        const payment = await stripe.charges.create({
            amount: subtotal * 100,
            currency: "inr",

            customer: customer.id, //we create the customer in above then create automatically userid
            receipt_email: token.email
        }, {
            idempotencyKey: uuidv4() //the same user shouldnot be charged for the same action
        })

        if (payment) {


            const neworder = new Order({
                name: currentUser.name,    //account holder name
                email: currentUser.email,
                userid: currentUser._id,
                orderItems: cartItems,
                orderAmount: subtotal,
                shippingAddress: {
                    // we get from token object
                    street: token.card.address_line1,
                    city: token.card.address_city,
                    country: token.card.address_country,
                    pincode: token.card.address_zip
                },
                transactionId: payment.source.id //this sourceid create above
            })

            neworder.save()  //this is used for saving the order

            res.send("Order Placed Successfully")
        } else {
            res.send("Payement failed")
        }
    } catch (error) {
        return res.status(400).json({ message: "Something went wrong" + error })
    }
})

router.post("/getuserorders", async (req, res) => {
    // const { userid } = req.body
    const { userid } = req.body
    try {
        const orders = await Order.find({ userid: userid }).sort({ _id: -1 })
        res.send(orders)
    } catch (error) {
        return res.status(400).json({ message: "Something went wrong" })
    }
})

router.get("/getallorders", async (req, res) => {
    try {
        const orders = await Order.find({})
        res.send(orders)
    } catch (error) {
        return res.status(400).json({ message: error })
    }
})

router.post("/deliverorder", async (req, res) => {
    const orderid = req.body.orderid
    try {
        // const order = await Order.findOne({ _id: orderid })
        const order = await Order.findOne({ _id: orderid })
        order.isDelivered = true
        await order.save()
        res.send("Order delivered Successfully")
    } catch (error) {
        return res.status(400).json({ message: "Somethind went wrong" })
    }
})

module.exports = router