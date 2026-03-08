import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

const Signup = () => {

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
     }
     else{
        navigate('/signup')
     }
    }

    const onChange = (e)=>{
     setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={onChange} name="email" />
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" onChange={onChange} name="name" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" onChange={onChange} name="password"/>
                </div>
                <button type="submit"  className="btn btn-primary">Submit</button>
            </form>
        </>
    )
}

export default Signup