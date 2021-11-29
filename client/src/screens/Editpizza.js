import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { editPizza, getPizzaById } from '../actions/pizzaActions'
import Loading from '../components/Loading'
import Error from '../components/Error'
import Success from '../components/Success'

export default function Editpizza({ match }) {

    const dispatch = useDispatch()
    const [name, setName] = useState("")
    const [smallprice, setSmallprice] = useState()
    const [mediumprice, setMediumprice] = useState()
    const [largeprice, setLargeprice] = useState()
    const [image, setImage] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")


    const getpizzabyidstate = useSelector((state) => state.getPizzaByIdReducer)
    const { pizzas, error, loading } = getpizzabyidstate

    const editpizzastate = useSelector((state) => state.editPizzaReducer)
    const { editloading, editsuccess, editerror } = editpizzastate


    useEffect(() => {

        if (pizzas) {
            if (pizzas._id === match.params.pizzaid) {

                setName(pizzas.name)
                setCategory(pizzas.category)
                setDescription(pizzas.description)
                setSmallprice(pizzas.prices[0]["small"])
                setMediumprice(pizzas.prices[0]["medium"])
                setLargeprice(pizzas.prices[0]["large"])
                setImage(pizzas.image)
            } else {
                dispatch(getPizzaById(match.params.pizzaid))
            }
        } else {
            dispatch(getPizzaById(match.params.pizzaid))
        }
    }, [pizzas, dispatch])


    function formHandler(e) {
        e.preventDefault()
        const editedpizza = {
            _id: match.params.pizzaid,
            name,
            image,
            description,
            category,
            prices: {
                small: smallprice,
                medium: mediumprice,
                large: largeprice
            }
        }
        dispatch(editPizza(editedpizza))

    }
    return (
        <div>
            <div className="shadow-lg p-3 mb-5 bg-white rounded" style={{ textAlign: "left" }}>

                <h1>Edit Pizza</h1>
                <h2>{match.params.pizzaid}</h2>
                <div className="text-left">

                    {loading && (<Loading />)}
                    {error && (<Error error="Something went wrong" />)}
                    {editsuccess && (<Success success="Pizza details edited successfully" />)}
                    {editloading && (<Loading />)}
                    <form onSubmit={formHandler}>
                        <input className="form-control" type="text" placeholder="name" value={name} onChange={(e) => { setName(e.target.value) }}></input>
                        <input className="form-control" type="text" placeholder="small varient price" value={smallprice} onChange={(e) => { setSmallprice(e.target.value) }}></input>
                        <input className="form-control" type="text" placeholder="medium varient price" value={mediumprice} onChange={(e) => { setMediumprice(e.target.value) }}></input>
                        <input className="form-control" type="text" placeholder="large varient price" value={largeprice} onChange={(e) => { setLargeprice(e.target.value) }}></input>
                        <input className="form-control" type="text" placeholder="category" value={category} onChange={(e) => { setCategory(e.target.value) }}></input>
                        <input className="form-control" type="text" placeholder="description" value={description} onChange={(e) => { setDescription(e.target.value) }}></input>
                        <input className="form-control" type="text" placeholder="Image url" value={image} onChange={(e) => { setImage(e.target.value) }}></input>
                        <button className="btn mt-3" type="submit"> Edit Pizza</button>
                    </form>
                </div>
            </div>
        </div>
    )
}