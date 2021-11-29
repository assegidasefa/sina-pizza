import { Route, Switch } from "react-router"
import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import Addpizza from './Addpizza'
import Orderslist from './Orderslist'
import Pizzaslist from './Pizzaslist'
import Userslist from './Userslist'
import { Link } from "react-router-dom";
import Editpizza from "./Editpizza";


export default function Adminscreen() {
    const userstate = useSelector(state => state.loginUserReducer)//inoreder to get user login state  
    const { currentUser } = userstate

    useEffect(() => {
        if (!currentUser.isAdmin) {
            window.location.href = "/"
        }
    }, [])

    return (
        <div>
            <div className="row justify-content-center p-3">
                <div className="col-md-10">
                    <h2 style={{ fontSize: "35px" }}>Admin Panel</h2>
                    <ul className="adminfunction">
                        <li><Link to={"/admin/userslist"}>Users List</Link></li>
                        <li><Link to={"/admin/pizzaslist"}>Pizzas List</Link></li>
                        <li><Link to={"/admin/addpizza"}>Add New Pizza</Link></li>
                        <li><Link to={"/admin/orderslist"}>Orders List</Link></li>
                    </ul>

                    <Switch>
                        <Route path="/admin" component={Userslist} exact />
                        <Route path="/admin/userslist" component={Userslist} exact />
                        <Route path="/admin/orderslist" component={Orderslist} exact />
                        <Route path="/admin/pizzaslist" component={Pizzaslist} exact />
                        <Route path="/admin/addpizza" component={Addpizza} exact />
                        <Route path="/admin/editpizza/:pizzaid" component={Editpizza} exact />

                    </Switch>
                </div>
            </div>

        </div>
    )
}