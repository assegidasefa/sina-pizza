import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../actions/userActions";
import Error from "../components/Error";
import Loading from "../components/Loading";

export default function Loginscreen() {


    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    
    // to get the state of login component
    const loginstate = useSelector(state=>state.loginUserReducer)
    // distructure the component
    const {loading,error} = loginstate

    useEffect(() => {
        if (localStorage.getItem("currentUser")) {
            window.location.href = "/"
        }
    }, [])

    function login() {
        const user = { email, password }
        dispatch(loginUser(user))
    }

    return (
        <div>
            <div className='row justify-content-center mt-5'>
                <div className="col-md-5 mt-5 text-left shadow-lg p-3 mb-5 bg-white rounded">
                    <h2 style={{ fontSize: "35px" }}>Login </h2>

                    {loading&&(<Loading/>)}
                    {error&&(<Error error="Invalid Credentials"/>)}
                    <div className="text-center">

                        <input type="text" placeholder="email" className="form-control"
                            value={email}
                            required
                            onChange={(e) => { setEmail(e.target.value) }}
                        />
                        <input type="text" placeholder="password" className="form-control"
                            value={password}
                            required
                            onChange={(e) => { setPassword(e.target.value) }}
                        />
                        <button onClick={login} className='btn mt-3 mb-3'>Login</button>
                        <br />
                        <a style={{ color: 'black' }} href="/register">Click Here To Register</a>
                    </div>
                </div>
            </div>
        </div>
    )
}