import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import StripeCheckout from 'react-stripe-checkout'
import { placeOrder } from '../actions/orderActions'
import Error from "../components/Error";
import Loading from "../components/Loading";
import Success from "../components/Success";

export default function Checkout({ subtotal }) {

    //inorder tocheck out the state
    const orderstate = useSelector((state) => state.placeOrderReducer)
    const { loading, error, success } = orderstate

    const dispatch = useDispatch()
    function tokenHandler(token) {
        console.log(token)
        dispatch(placeOrder(token, subtotal))
    }
    return (
        <div>
            {loading&&(<Loading/>)}
            {error&&(<Error error="something went wrong"/>)}
            {success&&(<Success success="Your Order Placed Successfully"/>)}
            <StripeCheckout
                amount={subtotal * 100}
                shippingAddress
                token={tokenHandler}
                stripeKey='pk_test_51Juc0cAlw1rQYjU6qDJSlIIu63m6ElQCnFmJVLgckgISJjRWoF9b376Z3fpx8MYdLyus3eYq1S5yP3hQukiQ9aNW00x8v5lfmZ'
                currency="INR"
            >
                <button className="btn">Pay Now</button>
            </StripeCheckout>
        </div>
    )
}