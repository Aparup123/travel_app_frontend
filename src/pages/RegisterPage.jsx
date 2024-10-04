import { useContext, useEffect, useState } from "react"
import { userContext } from "../contexts/userContext"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import registerImage from '../assets/images/register.jpg'
import { FaGoogle, FaFacebookF } from 'react-icons/fa'

function RegisterPage() {
  const { userData, setUserData } = useContext(userContext)
  console.log("user data:", userData)
  const navigate = useNavigate()
  useEffect(() => {
    if (userData.username) {
      navigate('/profile')
    }
  }, [])

  const [user, setUser] = useState({
    name: "",
    username: "",
    age: "",
    email: "",
    password: ""
  })

  function registerUser(e) {
    e.preventDefault()
    axios.post('http://localhost:3001/api/users/register', user, {
      withCredentials: true
    }).then((res) => {
      console.log(res.data)
      setUserData(res.data)
      navigate('/trips')
    }).catch((err) => {
      console.log(err)
    })
  }
  return (
    <>
      <div className="flex justify-center items-center   h-[88svh] overflow-hidden">
        <div className="flex border rounded sm:h-[90%] lg:h-[30rem]">
          <div className="py-4">
            <div className="mb-4">
              <h2 className="text-center text-2xl">Register and get ready</h2>
            </div>
            <form onSubmit={registerUser} className="flex flex-col px-6 text-sm justify-center">

              <label htmlFor="name" className="mb-1">Name</label>
              <input id="name" className="border p-1 px-2 mb-2 text-sm" name="name" type="text" placeholder="" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
              <label htmlFor="username" className="mb-1">Username</label>
              <input id="username" className="border p-1 px-2 mb-2 text-sm" name="username" type="text" placeholder="" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} />
              <label htmlFor="age" className="mb-1">Age</label>
              <input id="age" className="border p-1 px-2 mb-2 text-sm" name="age" type="number" placeholder="" value={user.age} onChange={(e) => setUser({ ...user, age: e.target.value })} />
              <label htmlFor="age" className="mb-1">Email</label>
              <input className="border p-1 px-2 mb-2 text-sm" name="email" type="email" placeholder="" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
              <label htmlFor="age" className="mb-1">Password</label>
              <input className="border p-1 px-2 mb-2 text-sm" name="password" type="password" placeholder="" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
              <button className="border-2 rounded border-blue-400 bg-blue-500 py-1 text-white mt-2 mb-4" type="submit">Register</button>
              <div className="flex justify-center gap-2">
                <i className="text-xl border-2 p-1 rounded-full inline-block"><FaGoogle /></i>
                <i className="text-xl border-2 p-1 rounded-full inline-block"><FaFacebookF /></i>
              </div>
            </form>
          </div>
          <div className="max-sm:hidden ">
            <img src={registerImage} className="h-full w-auto" />
          </div>
        </div>
      </div>
    </>
  )
}

export default RegisterPage