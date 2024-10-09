import { useContext } from "react"
import { NavLink } from "react-router-dom"
import { userContext } from "../contexts/userContext"

function Header() {
  const {userData}=useContext(userContext)
  return (
    <div className="flex justify-center gap-4 border-b-2 p-4 text-xl ">

      <NavLink to='/' className={({isActive})=>isActive?"text-blue-500":''}>Home</NavLink>
      <NavLink to='/trips' className={({isActive})=>isActive?"text-blue-500":''}>Trips</NavLink>
      {userData.username && <NavLink to='/profile' className={({isActive})=>isActive?'text-blue-500':''}>Profile</NavLink>}
      {!userData.username && <NavLink to='/login' className={({isActive})=>isActive?'text-blue-500':''}>login</NavLink>}
      {!userData.username && <NavLink to='/register' className={({isActive})=>isActive?'text-blue-500':''}>Register</NavLink>}
      {userData.role=="seller" && <NavLink to='/create_trip' className={({isActive})=>isActive?'text-blue-500':''}>Create trip</NavLink>}
      {userData.role=="seller" && <NavLink to='/seller_dashboard' className={({isActive})=>isActive?'text-blue-500':''}>Dashboard</NavLink>}
    </div>
  )
}

export default Header