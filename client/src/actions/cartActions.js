export const addTocart = (pizza, quantity, varient) => (dispatch, getState) => {
    var cartItem = {
        name: pizza.name,
        _id: pizza._id,
        image: pizza.image,
        varient: varient,
        // quantity: quantity,
        quantity: Number(quantity),
        prices: pizza.prices,
        price: pizza.prices[0][varient] * quantity
    }

    if (cartItem.quantity > 10) {
        // we only add 10 quantity
        alert("you cannot add more than 10 quantities")
    } else {
        if (cartItem.quantity < 1) {
            dispatch({ type: 'DELETE_FROM_CART', payload: pizza })
        } else {

            dispatch({ type: "ADD_TO_CART", payload: cartItem })
        }
    }
    const cartItems = getState().cartReducer.cartItems
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
    //getState able to get all variable and all reduceers
}

export const deleteFromCart = (pizza) => (dispatch, getState) => {
    dispatch({ type: 'DELETE_FROM_CART', payload: pizza })
    const cartItems = getState().cartReducer.cartItems
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
}