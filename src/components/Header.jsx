import { useContext, useState } from "react"
import { NavLink } from "react-router-dom"
import { userContext } from "../contexts/userContext"
import { GiHamburgerMenu } from "react-icons/gi"


function Header() {
  const [isMenuOpen, setIsMenuOpen]=useState(false)
  const { userData } = useContext(userContext)
  return (
    <nav className="p-2 bg-zinc-200 sticky top-0 z-[100]">
      <div className="flex justify-between">
        <div>Travel-x</div>
        {/* <div className="w-10 text-center rounded-full mr-2">
      <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" className="rounded-full"/>
    </div>     */}



        {/* <div role="tablist" className="tabs tabs-lifted navbar-center hidden lg:flex"> */}
        <div className="hidden md:flex ">
          <NavLink to='/' className={({ isActive }) => isActive ? "text-blue-500 tab tab-active text-lg" : 'tab text-lg'}>Home</NavLink>
          <NavLink to='/trips' className={({ isActive }) => isActive ? "text-blue-500 tab tab-active text-lg" : 'tab text-lg'}>Trips</NavLink>
          {userData.username && <NavLink to='/profile' className={({ isActive }) => isActive ? 'text-blue-500 tab tab-active text-lg' : 'tab text-lg'}>Profile</NavLink>}
          {!userData.username && <NavLink to='/login' className={({ isActive }) => isActive ? 'text-blue-500 tab tab-active text-lg' : 'tab text-lg'}>login</NavLink>}
          {!userData.username && <NavLink to='/register' className={({ isActive }) => isActive ? 'text-blue-500 tab tab-active text-lg' : 'tab text-lg'}>Register</NavLink>}
          {userData.username && userData.role == "user" && <NavLink to='/my_trips' className={({ isActive }) => isActive ? 'text-blue-500 tab tab-active text-lg' : 'tab text-lg'}>My trips</NavLink>}
          {userData.role == "seller" && <NavLink to='/create_trip' className={({ isActive }) => isActive ? 'text-blue-500 tab tab-active text-lg' : 'tab text-lg'}>Create trip</NavLink>}
          {userData.role == "seller" && <NavLink to='/seller_dashboard' className={({ isActive }) => isActive ? 'text-blue-500 tab tab-active text-lg' : 'tab text-lg'}>Dashboard</NavLink>}
        </div>
        {/* </div> */}

        <div className="text-2xl md:hidden">
          <button className="btn btn-sm btn-neutral" onClick={()=>setIsMenuOpen(!isMenuOpen)}><GiHamburgerMenu /></button> 
        </div>
      </div>

      {isMenuOpen&&<ul className="p-y-4 md:hidden ">
        <li className="border-b border-black"><NavLink to='/' className={({ isActive }) => isActive ? "text-blue-500 tab tab-active text-lg block text-left" : 'tab text-lg block text-left'}>Home</NavLink></li>
        <li className="border-b border-black"><NavLink to='/trips' className={({ isActive }) => isActive ? "text-blue-500 tab tab-active text-lg block text-left block text-left" : 'tab text-lg block text-left block text-left'}>Trips</NavLink></li>
        {userData.username && <li className="border-b border-black"><NavLink to='/profile' className={({ isActive }) => isActive ? 'text-blue-500 tab tab-active text-lg block text-left' : 'tab text-lg block text-left'}>Profile</NavLink></li>}
        {!userData.username && <li className="border-b border-black"><NavLink to='/login' className={({ isActive }) => isActive ? 'text-blue-500 tab tab-active text-lg block text-left' : 'tab text-lg block text-left'}>login</NavLink></li>}
        {!userData.username && <li className=""><NavLink to='/register' className={({ isActive }) => isActive ? 'text-blue-500 tab tab-active text-lg block text-left' : 'tab text-lg block text-left'}>Register</NavLink></li>}
        {userData.username && userData.role == "user" && <li><NavLink to='/my_trips' className={({ isActive }) => isActive ? 'text-blue-500 tab tab-active text-lg block text-left' : 'tab text-lg block text-left'}>My trips</NavLink></li>}
        {userData.role == "seller" && <li className="border-b border-black"><NavLink to='/create_trip' className={({ isActive }) => isActive ? 'text-blue-500 tab tab-active text-lg block text-left' : 'tab text-lg block text-left'}>Create trip</NavLink></li>}
        {userData.role == "seller" && <li className=""><NavLink to='/seller_dashboard' className={({ isActive }) => isActive ? 'text-blue-500 tab tab-active text-lg block text-left' : 'tab text-lg block text-left'}>Dashboard</NavLink></li>}
      </ul>}

    </nav>
  )
}

export default Header