import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Dropdown } from 'react-bootstrap';
import 'bootstrap'
import { logoutUser } from '../actions/userActions';

export default function Navbacartr() {
    const cartstate = useSelector(state => state.cartReducer)
    const userstate = useSelector(state => state.loginUserReducer)//inoreder to get user login state  
    const { currentUser } = userstate
    const dispatch = useDispatch()
    return (
        <div>
            <nav className="navbar navbar-expand-lg shadow-lg p-3 mb-5 bg-white rounded">
                <a className="navbar-brand" href="/">SINA PIZZA</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"><i style={{ color: 'black' }} className="fas fa-bars"></i></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">

                        {currentUser ?

                            // (<li>{currentUser.name}</li>)


                            // <div className="dropdown">
                            //     <a className="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            //         {currentUser.name}
                            //     </a>
                            //     <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            //         <a className="dropdown-item" href="#">Orders</a>
                            //         <a className="dropdown-item" href="#">Logout</a>
                            //     </div>
                            // </div>


                            <div className="dropdown">
                                <Dropdown>
                                    <Dropdown.Toggle
                                    >
                                        <a>{currentUser.name}</a>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu >
                                        <Dropdown.Item href="/orders" >Order</Dropdown.Item>
                                        <Dropdown.Item href="#" onClick={() => { dispatch(logoutUser()) }}><li>Logout</li></Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>


                            : (
                                <li className="nav-item active">
                                    <a className="nav-link" href="/login">Login </a>
                                </li>
                            )}

                        <li className="nav-item">
                            <a className="nav-link" href="/cart">Cart {cartstate.cartItems.length}</a>
                        </li>

                    </ul>
                </div>
            </nav>
        </div>
    )
}