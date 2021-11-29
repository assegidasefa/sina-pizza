import axios from "axios"
import Pizza from "../components/Pizza"
import Axios from "./axios"
export const getAllPizzas = () => async dispatch => {
    dispatch({ type: "GET_PIZZAS_REQUEST" })
    try {
        const response = await Axios.get('/pizzas/getallpizzas')
        console.log(response)
        dispatch({ type: "GET_PIZZAS_SUCCESS", payload: response.data })
    } catch (error) {
        dispatch({ type: "GET_PIZZAS_FAILED", payload: error })
    }
}

export const filterPizzas = (searchkey, category) => async dispatch => {

    var filteredPizzas
    dispatch({ type: "GET_PIZZAS_REQUEST" })
    try {
        const response = await Axios.get('/pizzas/getallpizzas')
        // console.log(response)
        // filteredPizzas = response.data.filter(pizza => pizza.name.toLowerCase().includes(searchkey)) //this is searching process only
        filteredPizzas = response.data.filter(Pizza => Pizza.name.toLowerCase().includes(searchkey))//this is searching process only

        if (category != "all") {
            filteredPizzas = response.data.filter(Pizza => Pizza.category.toLowerCase() == category)//this is searching process only

        }

        dispatch({ type: "GET_PIZZAS_SUCCESS", payload: filteredPizzas })
    } catch (error) {
        dispatch({ type: "GET_PIZZAS_FAILED", payload: error })
    }
}

export const addPizza = (pizza) => async dispatch => {
    dispatch({ type: 'ADD_PIZZA_REQUEST' })

    try {
        const response = await Axios.post("/pizzas/addpizza", { pizza })
        console.log(response)
        dispatch({ type: 'ADD_PIZZA_SUCCESS' })
    } catch (error) {
        dispatch({ type: 'ADD_PIZZA_FAILED', payload: error })
    }
}

export const getPizzaById = (pizzaid) => async dispatch => {
    dispatch({ type: "GET_PIZZABYID_REQUEST" })
    try {
        const response = await Axios.post('/pizzas/getpizzabyid', { pizzaid })
        console.log(response)
        dispatch({ type: "GET_PIZZABYID_SUCCESS", payload: response.data })
    } catch (error) {
        dispatch({ type: "GET_PIZZABYID_FAILED", payload: error })
    }
}


export const editPizza = (editedpizza) => async dispatch => {
    dispatch({ type: 'EDIT_PIZZA_REQUEST' })

    try {
        const response = await Axios.post("/pizzas/editpizza", { editedpizza })
        console.log(response)
        dispatch({ type: 'EDIT_PIZZA_SUCCESS' })
        window.location.href = "/admin/pizzaslist"
    } catch (error) {
        dispatch({ type: 'EDIT_PIZZA_FAILED', payload: error })
    }
}

export const deletePizza = (pizzaid) => async dispatch => {
    try {
        const response = await Axios.post("/pizzas/deletepizza", { pizzaid })
        alert("Pizza Deleted Successfully")
        console.log(response)
        window.location.reload()
    } catch (error) {
        alert("Something went wrong")
        console.log(error)
    }
}