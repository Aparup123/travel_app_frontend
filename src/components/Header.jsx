import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { userContext } from "../contexts/userContext";
import { GiHamburgerMenu } from "react-icons/gi";
import profilePlaceholder from '../assets/images/profilePlaceHolder.jpg'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { userData } = useContext(userContext);

  return (
    <nav className="sticky top-0 z-[100] h-[3rem]">
      {/* Navbar container with glass effect */}
      <div className="  py-2 px-4 md:px-6 bg-gray-900 backdrop-filter backdrop-blur-lg bg-opacity-50 flex justify-between items-center">
        <div>Travel-x</div>

        <div className="hidden md:flex md:items-center ">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-blue-500 tab tab-active text-lg" : "tab text-lg"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/trips"
            className={({ isActive }) =>
              isActive ? "text-blue-500 tab tab-active text-lg" : "tab text-lg"
            }
          >
            Trips
          </NavLink>
          {!userData.username && (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "text-blue-500 tab tab-active text-lg" : "tab text-lg"
              }
            >
              login
            </NavLink>
          )}
          {!userData.username && (
            <NavLink
              to="/register"
              className={({ isActive }) =>
                isActive ? "text-blue-500 tab tab-active text-lg" : "tab text-lg"
              }
            >
              Register
            </NavLink>
          )}
          {userData.username && userData.role === "user" && (
            <NavLink
              to="/my_trips"
              className={({ isActive }) =>
                isActive ? "text-blue-500 tab tab-active text-lg" : "tab text-lg"
              }
            >
              My trips
            </NavLink>
          )}
          {userData.role === "seller" && (
            <>
              <NavLink
                to="/create_trip"
                className={({ isActive }) =>
                  isActive ? "text-blue-500 tab tab-active text-lg" : "tab text-lg"
                }
              >
                Create trip
              </NavLink>
              <NavLink
                to="/seller_dashboard"
                className={({ isActive }) =>
                  isActive ? "text-blue-500 tab tab-active text-lg" : "tab text-lg"
                }
              >
                Dashboard
              </NavLink>
            </>
          )}
          {userData.username && (
            <li type="none" className="">
              <NavLink
                to="/profile"
                className={({isActive}) =>{
                  return isActive ? "avatar mt-2 rounded-full ring-2 ring-blue-600": "avatar mt-2 rounded-full "}}
                    >

                    <div className="w-10 rounded-full">
                      <img src={userData.profile_picture?.url || profilePlaceholder} />
                    </div>
                

              </NavLink>
            </li>
          )}
      </div>

      <div className="text-2xl md:hidden flex flex-row-reverse items-center gap-2">
        <button
          className="btn btn-sm btn-neutral"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <GiHamburgerMenu />
        </button>
        {userData.username && (
            <li type="none" className="">
              <NavLink
                to="/profile"
                className={({isActive}) =>{
                  return isActive ? "avatar mt-2 rounded-full ring-2 ring-blue-600": "avatar mt-2 rounded-full "}}
                    >

                    <div className="w-10 rounded-full">
                      <img src={userData.profile_picture?.url || profilePlaceholder} />
                    </div>
                

              </NavLink>
            </li>
          )}
      </div>
    </div>

      {/* Expanded menu with glass effect */ }
  {
    isMenuOpen && (
      <ul className="backdrop-filter backdrop-blur-lg bg-opacity-70 bg-gray-900 md:hidden py-4 ">
        <li className="border-b border-black">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-blue-500 tab tab-active text-lg block text-left"
                : "tab text-lg block text-left"
            }
          >
            Home
          </NavLink>
        </li>
        <li className="border-b border-black">
          <NavLink
            to="/trips"
            className={({ isActive }) =>
              isActive
                ? "text-blue-500 tab tab-active text-lg block text-left"
                : "tab text-lg block text-left"
            }
          >
            Trips
          </NavLink>
        </li>

        {!userData.username && (
          <li className="border-b border-black">
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-500 tab tab-active text-lg block text-left"
                  : "tab text-lg block text-left"
              }
            >
              login
            </NavLink>
          </li>
        )}
        {!userData.username && (
          <li>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-500 tab tab-active text-lg block text-left"
                  : "tab text-lg block text-left"
              }
            >
              Register
            </NavLink>
          </li>
        )}
        {userData.username && userData.role === "user" && (
          <li>
            <NavLink
              to="/my_trips"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-500 tab tab-active text-lg block text-left"
                  : "tab text-lg block text-left"
              }
            >
              My trips
            </NavLink>
          </li>
        )}
        {userData.role === "seller" && (
          <>
            <li className="border-b border-black">
              <NavLink
                to="/create_trip"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-500 tab tab-active text-lg block text-left"
                    : "tab text-lg block text-left"
                }
              >
                Create trip
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/seller_dashboard"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-500 tab tab-active text-lg block text-left"
                    : "tab text-lg block text-left"
                }
              >
                Dashboard
              </NavLink>
            </li>
          </>
        )}
      </ul>
    )
  }
    </nav >
  );
}

export default Header;
