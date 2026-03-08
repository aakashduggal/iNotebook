import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

const Signup = (props) => {

    const [credentials, setCredentials] = useState({name: "", email: "", password: ""})
    
    let navigate = useNavigate()
    const handleSubmit = async (e)=>{
      e.preventDefault()
      const response = await fetch('http://localhost:5000/api/auth/create', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({name: credentials.name, email: credentials.email, password: credentials.password})
      })
     const json = await response.json()
     
     if(json.success){
        localStorage.setItem('token', json.authToken)
        navigate('/login')
        props.showAlert("Account Created Successfully", "success")
     }
     else{
        navigate('/signup')
         props.showAlert("User Already Exists", "danger")
     }
    }

    const onChange = (e)=>{
     setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="my-5 mb-3">
                    <h2>Signup to Create an Account</h2>
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={onChange} minLength={5} required name="email" />
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" onChange={onChange} name="name" minLength={3} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" onChange={onChange} name="password" minLength={4} required/>
                </div>
                <button type="submit"  className="btn btn-primary">Submit</button>
            </form>
        </>
    )
}

export default Signup