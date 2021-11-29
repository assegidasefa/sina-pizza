import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { registerUser } from "../actions/userActions";
import Error from "../components/Error";
import Loading from "../components/Loading";
import Success from "../components/Success";

export default function Registerscreen() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [cpassword, setCpassword] = useState("")

    //in order to know whether the registration is success or fail
    const registerstate = useSelector(state => state.registerUserReducer)
    const { error, loading, success } = registerstate //dispatch from register state tocheck the success

    const dispatch = useDispatch()

    function register() {
        if (password != cpassword) {
            alert("passwords not matched")
        } else {
            const user = {
                name,
                email,
                password
            }
            console.log(user)
            dispatch(registerUser(user))
        }
    }
    return (
        <div>
            <div className='row justify-content-center mt-5'>
                <div className="col-md-5 mt-5 text-left shadow-lg p-3 mb-5 bg-white rounded">

                    {loading && (<Loading />)}
                    {success && (<Success success="User Redistered Successfully" />)}
                    {error && (<Error error="Email already registred" />)}
                    <h2 style={{ fontSize: "35px" }}>Register </h2>
                    <div className="text-center">
                        <input type="text" placeholder="name" className="form-control"
                            value={name}
                            required
                            onChange={(e) => { setName(e.target.value) }}
                        />
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
                        <input type="text" placeholder="comfirm password" className="form-control"
                            value={cpassword}
                            required
                            onChange={(e) => { setCpassword(e.target.value) }}
                        />
                        <button onClick={register} className='btn mt-3 mb-3'>REGISTER</button>
                        <br />
                        <a style={{ color: 'black' }} href="/login" className="mt-2">Click Here To Login</a>
                    </div>
                </div>
            </div>
        </div>
    )
}