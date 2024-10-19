import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { userContext } from "../contexts/userContext";
import { GiHamburgerMenu } from "react-icons/gi";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { userData } = useContext(userContext);

  return (
    <nav className="sticky top-0 z-[100] h-[3rem]">
      {/* Navbar container with glass effect */}
      <div className="p-2 bg-gray-900 backdrop-filter backdrop-blur-lg bg-opacity-50 flex justify-between items-center">
        <div>Travel-x</div>

        <div className="hidden md:flex">
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
          {userData.username && (
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive ? "text-blue-500 tab tab-active text-lg" : "tab text-lg"
              }
            >
              Profile
            </NavLink>
          )}
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
        </div>

        <div className="text-2xl md:hidden">
          <button
            className="btn btn-sm btn-neutral"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <GiHamburgerMenu />
          </button>
        </div>
      </div>

      {/* Expanded menu with glass effect */}
      {isMenuOpen && (
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
          {userData.username && (
            <li className="border-b border-black">
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-500 tab tab-active text-lg block text-left"
                    : "tab text-lg block text-left"
                }
              >
                Profile
              </NavLink>
            </li>
          )}
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
      )}
    </nav>
  );
}

export default Header;
