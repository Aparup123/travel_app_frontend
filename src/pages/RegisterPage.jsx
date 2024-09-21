import { useContext, useEffect, useState } from "react"
import { userContext } from "../contexts/userContext"
import { useNavigate } from "react-router-dom"
import axios from "axios"

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
      <div className="flex justify-center items-center h-[88vh]">
        
        <form onSubmit={registerUser} className="border flex flex-col gap-3 sm:w-12/12 md:w-4/12 xl:w-[25rem] p-6">
          <h2 className="text-center">Register</h2>
          <input className="border p-1 px-2" name="name" type="text" placeholder="name" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
          <input className="border p-1 px-2" name="username" type="text" placeholder="username" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} />
          <input className="border p-1 px-2" name="age" type="number" placeholder="age" value={user.age} onChange={(e) => setUser({ ...user, age: e.target.value })} />
          <input className="border p-1 px-2" name="email" type="email" placeholder="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
          <input className="border p-1 px-2" name="password" type="password" placeholder="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
          <button className="border-2 border-blue-600 bg-blue-400 py-1 text-white" type="submit">Register</button>
        </form>
      </div>
    </>
  )
}

export default RegisterPage