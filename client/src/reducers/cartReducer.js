export const cartReducer = (state = { cartItems: [] }, action) => {

    switch (action.type) {
        case "ADD_TO_CART":
            //To check wheither the item is new or already exist item
            const alreadyExists = state.cartItems.find(item => item._id === action.payload._id)
            if (alreadyExists) {
                return{
                    ...state,
                    cartItems:state.cartItems.map(item=>item._id===action.payload._id?
                        action.payload:item)
                }
            }
            else {

                return {
                    ...state,
                    cartItems: [...state.cartItems, action.payload]
                }
            }
            case 'DELETE_FROM_CART' : return{
                ...state,
                cartItems:state.cartItems.filter(item=>item._id!==action.payload._id)
                // item will  be deleted and the new array will assigned
            }


        default: return state
    }
}