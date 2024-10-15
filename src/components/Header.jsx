import { useContext } from "react"
import { NavLink } from "react-router-dom"
import { userContext } from "../contexts/userContext"
import {Navbar } from "flowbite-react"

function Header() {
  const {userData}=useContext(userContext)
  return (
    <Navbar fluid rounded style={{position:"sticky", borderBottom:"1px solid slate"}}>
    <Navbar.Brand>Travel-x</Navbar.Brand>
    <div  className="flex md:order-2">
    <div className="w-10 text-center rounded-full mr-2">
      <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" className="rounded-full"/>
    </div>    

      <Navbar.Toggle/>
      </div>
    <Navbar.Collapse>
      {/* <div role="tablist" className="tabs tabs-lifted navbar-center hidden lg:flex"> */}
        <Navbar.Link><NavLink to='/' className={({isActive})=>isActive?"text-blue-500 tab tab-active text-lg":'tab text-lg'}>Home</NavLink></Navbar.Link>
        <Navbar.Link><NavLink to='/trips' className={({isActive})=>isActive?"text-blue-500 tab tab-active text-lg":'tab text-lg'}>Trips</NavLink></Navbar.Link>
        {userData.username && <Navbar.Link><NavLink to='/profile' className={({isActive})=>isActive?'text-blue-500 tab tab-active text-lg':'tab text-lg'}>Profile</NavLink></Navbar.Link>}
        {!userData.username && <Navbar.Link><NavLink to='/login' className={({isActive})=>isActive?'text-blue-500 tab tab-active text-lg':'tab text-lg'}>login</NavLink></Navbar.Link>}
        {!userData.username && <Navbar.Link><NavLink to='/register' className={({isActive})=>isActive?'text-blue-500 tab tab-active text-lg':'tab text-lg'}>Register</NavLink></Navbar.Link>}
        {userData.username&&userData.role=="user" && <Navbar.Link><NavLink to='/my_trips' className={({isActive})=>isActive?'text-blue-500 tab tab-active text-lg':'tab text-lg'}>My trips</NavLink></Navbar.Link>}
        {userData.role=="seller" && <Navbar.Link><NavLink to='/create_trip' className={({isActive})=>isActive?'text-blue-500 tab tab-active text-lg':'tab text-lg'}>Create trip</NavLink></Navbar.Link>}
        {userData.role=="seller" && <Navbar.Link><NavLink to='/seller_dashboard' className={({isActive})=>isActive?'text-blue-500 tab tab-active text-lg':'tab text-lg'}>Dashboard</NavLink></Navbar.Link>}
      {/* </div> */}
    </Navbar.Collapse>
      
    
    </Navbar>
  )
}

export default Header