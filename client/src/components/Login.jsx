import React, { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";


const LoginAndReg = props => {
    const [registerState, setRegisterState] = useState({
        firstName: "", 
        lastName: "", 
        email: "", 
        password: "", 
        confirmPassword: ""
    });
    const [errorState, setErrorState] = useState({});
    const navigate = useNavigate();

    const [loginState, setLoginState] = useState({
        email: "", 
        password: ""
    });
    
    const registerChangeHandler = e => {
        setRegisterState({
            ...registerState, [e.target.name]: e.target.value
        })
    }

    const loginChangeHandler = e => {
        setLoginState({
            ...loginState, [e.target.name]: e.target.value
        })
    }

    const loginSubmitHandler = (e) => {
        e.preventDefault()
        axios.post("http://localhost:8000/api/users/login", loginState, { withCredentials: true})
        .then(res => {
            console.log(res)
            navigate("/chatrooms");
        })
        .catch(err => console.log(err))
    }

    const registerSubmitHandler = (e) => {
        e.preventDefault()
        axios.post("http://localhost:8000/api/users/register", registerState, {withCredentials: true})
        .then(res => {
            console.log(res); 
            setRegisterState({
                firstName: "", 
                lastName: "", 
                email: "", 
                password: "", 
                confirmPassword: ""
            })
        })
        .catch(err => {
            console.log(err.response.data);
            const {errors} = err.response.data;
            console.log(errors); 
            const errObj = {}

            for (const[key, value] of Object.entries(errors)) {
                console.log(errors[key])
                errObj[key] = value;
            }
            setErrorState(errObj); 
        })
    }


    return(
        <div className="title">
            <h1>ChitChat</h1>
            <div style={{display: 'flex', marginTop: '15px'}}>
                <div className="container" style={{marginLeft: '15px', marginRight: '15px'}}>
                    <form onSubmit={registerSubmitHandler} className="form-control" id="loginback">
                        <h1 id="CC">Register</h1>
                        <label htmlFor="firstName">First Name:</label>
                        <input type="text" name="firstName" className="form-control" onChange={registerChangeHandler} value={registerState.firstName}/>
                        {(errorState.firstName) ? <p> {errorState.firstName.message}</p> : ""}

                        <label htmlFor="lastName">Last Name:</label>
                        <input type="text" name="lastName" className="form-control" onChange={registerChangeHandler} value={registerState.lastName}/>
                        {(errorState.lastName) ? <p> {errorState.lastName.message}</p> : ""}

                        <label htmlFor="email">Email:</label>
                        <input type="text" name="email" className="form-control" onChange={registerChangeHandler} value={registerState.email}/>
                        {(errorState.email) ? <p> {errorState.email.message}</p> : ""}
                        {(errorState.duplicate) ? <p> {errorState.duplicate.message}</p> : ""}


                        <label htmlFor="password">Password:</label>
                        <input type="text" name="password" className="form-control" onChange={registerChangeHandler} value={registerState.password}/>
                        {(errorState.password) ? <p> {errorState.password.message}</p> : ""}

                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <input type="text" name="confirmPassword" className="form-control" onChange={registerChangeHandler} value={registerState.confirmPassword}/>
                        

                        <input type="submit" value="Register User" />
                    </form>
                </div>
                <div className="container" style={{marginLeft: '15px', marginRight: '15px'}} >
                    <form onSubmit={loginSubmitHandler} className="form-control" id="loginback">
                        <h1 id="CC">Login</h1>
                        <label htmlFor="email">Email:</label>
                        <input type="text" name="email" className="form-control" onChange={loginChangeHandler}/>

                        <label htmlFor="password">Password:</label>
                        <input type="text" name="password" className="form-control" onChange={loginChangeHandler}/>
                        <input type="submit" value="Login" />
                    </form>

                </div>

            </div>

        </div>
    )
}

export default LoginAndReg;