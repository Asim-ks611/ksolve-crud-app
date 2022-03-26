import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faUserPen,
  faRightToBracket,
  faBed,
  faNoteSticky,
} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom"
import useAuth from "../auth/useAuth";


const Header = () => {
  const { auth,setAuth } = useAuth();
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const [avatar, setAvatar] = React.useState(require("./images/avatar.png"));


  const navHandler = (e) =>{
      setNavbarOpen(!navbarOpen)
  }

  const logoutHandler = ()=>{
    if(window.confirm("Do you want to logout?")){
      setAuth({})
      return
    }else{
      return
    }
  }

  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-center px-2 py-3 bg-teal-500">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-center">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link to="/">
            <span
              className="text-base font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
            >
              Ksolves Crud App
            </span>
            </Link>
            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={navHandler}
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center transition duration-200" +
              (navbarOpen ? "flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col  items-start lg:flex-row  lg:items-center list-none lg:ml-auto">
              <li className="nav-item">
                <Link to={"/notes"}>
                <span
                  className="cursor-pointer px-3 py-2 flex items-center text-sm uppercase font-bold leading-snug text-white hover:opacity-75"
                >
                  <FontAwesomeIcon icon={faNoteSticky} />
                  <span className="ml-2">Notes</span>
                </span>
                </Link>
              </li>
              <li className="nav-item">
               <Link to={"/users"}>
               <span
                  className=" cursor-pointer px-3 py-2 flex items-center text-sm uppercase font-bold leading-snug text-white hover:opacity-75"
                  
                >
                  <FontAwesomeIcon icon={faUserPen} />
                  <span className="ml-2">user dashboard</span>
                </span>
               </Link>
              </li>
              {auth?.id ?
              <li className="nav-item" onClick={logoutHandler}>
              <span
                className="cursor-pointer px-3 py-2 flex items-center text-sm uppercase font-bold leading-snug text-white hover:opacity-75"
              >
                <FontAwesomeIcon icon={faBed} />{" "}
                <span className="ml-2">Logout</span>
              </span>
            </li> 
              :
              <li className="nav-item">
                <Link to={"/login"}>
                <span
                  className="cursor-pointer px-3 py-2 flex items-center text-sm uppercase font-bold leading-snug text-white hover:opacity-75"
                >
                  <FontAwesomeIcon icon={faRightToBracket} />{" "}
                  <span className="ml-2">Login</span>
                </span>
                </Link>
              </li>  

              }
                <li className="flex items-center">
                <img
                  className="w-12 rounded-full mx-auto"
                  src={avatar}
                  alt="avatar"
                />
                <span className="text-white text-sm font-bold">{auth?.username ? auth?.username : ``}</span>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
