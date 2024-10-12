import { useContext } from "react"
import { NavLink } from "react-router-dom"
import { userContext } from "../contexts/userContext"

function Header() {
  const {userData}=useContext(userContext)
  return (
    <div className="flex justify-center gap-4 border-b-2 p-4 text-xl ">
    <div role="tablist" className="tabs tabs-lifted">
 
 
      <NavLink to='/' className={({isActive})=>isActive?"text-blue-500 tab tab-active":'tab'}>Home</NavLink>
      <NavLink to='/trips' className={({isActive})=>isActive?"text-blue-500 tab tab-active":'tab'}>Trips</NavLink>
      {userData.username && <NavLink to='/profile' className={({isActive})=>isActive?'text-blue-500 tab tab-active':'tab'}>Profile</NavLink>}
      {!userData.username && <NavLink to='/login' className={({isActive})=>isActive?'text-blue-500 tab tab-active':'tab'}>login</NavLink>}
      {!userData.username && <NavLink to='/register' className={({isActive})=>isActive?'text-blue-500 tab tab-active':'tab'}>Register</NavLink>}
      {userData.role=="seller" && <NavLink to='/create_trip' className={({isActive})=>isActive?'text-blue-500 tab tab-active':'tab'}>Create trip</NavLink>}
      {userData.role=="seller" && <NavLink to='/seller_dashboard' className={({isActive})=>isActive?'text-blue-500 tab tab-active':'tab'}>Dashboard</NavLink>}
      </div>
    </div>
  )
}

export default Header