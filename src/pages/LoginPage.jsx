import {useContext, useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { userContext } from '../contexts/userContext'
import FormValidationError from '../components/FormValidationError'
function LoginPage() {
    const {userData, setUserData}=useContext(userContext)
    const [email, setEmail]=useState('')
    const [password, setPassword]=useState('')
    const [validationError, setValidationError]=useState({emailError:"", passwordError:""})
    const navigate=useNavigate()

    function validate(email, password){
        const errorObject={
            emailError:"",
            passwordError:"",
            error:false
        }
        
        if(!email.includes('@')) errorObject.emailError="Not a valid email"
        if (email.length == 0) errorObject.emailError = "Email can't be empty"

        if(password.length==0) errorObject.passwordError="Password can't be empty"
        if(errorObject.emailError||errorObject.passwordError) errorObject.error=true
        return errorObject
    }

    useEffect(()=>{
        if(userData.username){
            navigate('/profile')
        }
    },[userData, navigate])
    function handleLogin(e){
        e.preventDefault()
        const body={
            email,
            password
        }
        const errorObj=validate(email, password)
        setValidationError(errorObj)
        if(errorObj.error){
            console.log(errorObj)
            return 
        }
        axios.post('http://localhost:3001/api/users/login', body,{withCredentials:true})
        .then((res)=>{
            console.log(res.data)
            setUserData(res.data)
            navigate(-1)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
  return (
    <div className='w-full h-[90vh] bg-slate-200 flex justify-center items-center font-mono text-2xl'>
        <div className='bg-slate-400 w-72 rounded p-4 flex justify-center items-center'> 
            <form onSubmit={handleLogin} className=''>
                <h2 className='text-3xl font-bold mb-4 text-center'>Login</h2>
                <label className='ml-2' htmlFor="email">Email</label>
                {validationError.emailError&& <FormValidationError errorMessage={validationError.emailError}/>}
                <input className='mx-auto block text-xl px-1 py-0.5 mb-2 border-2 border-slate-800 rounded w-11/12' name="email" type='email' placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <label className='ml-2' htmlFor="password">Password</label>
                {validationError.passwordError&& <FormValidationError errorMessage={validationError.passwordError}/>}
                <input className='mx-auto block text-xl px-1 py-0.5 mb-5 border-2 border-slate-800 rounded w-11/12' name="password" type='password' placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <button className='mt-3 text-xl mx-auto block bg-zinc-700 text-zinc-200 px-2 py-1 rounded  ' type="submit">Login</button>
            </form>
        </div>

        
    </div>

  )
}

export default LoginPage