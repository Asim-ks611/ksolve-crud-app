import React, { useState, useEffect, useRef } from "react";
import useAuth from "../auth/useAuth";
import ReactCardFlip from "react-card-flip";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";

function Login() {
  //////////////////////////////////////////////////////////////

  const [isFlipped, setIsFlipped] = useState(false);
  const [loginCred, setLoginCred] = useState({ email: "", password: "" });
  const [registerCred, setRegisterCred] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errMsg, setErrMsg] = useState("");
  const [msg, setMsg] = useState("");

  ///////////////////////////////////////////////////////////

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { setAuth } = useAuth();
  const errRef = useRef();
  const userRef = useRef();

  ////////////////////////////////////////////////////////////
  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [loginCred, registerCred]);

  useEffect(() => {
    let reset = setTimeout(() => setMsg(""), 3000);
    return () => clearTimeout(reset);
  }, [registerCred]);

  /////////////////////////-- AXIOS --////////////////////////////
  const URL = "http://localhost:3005";
  //--LOGIN --//
  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${URL}/auth/login`,
        JSON.stringify(loginCred),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const user = await jwt_decode(response?.data?.token);
      let { id, username, role } = user;
      await setAuth({ id, username, role });
      setLoginCred({ email: "", password: "" });
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg(err.response.data.message);
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };
  //-- REGISTER --//
  const registerHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${URL}/auth/register`,
        JSON.stringify(registerCred),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setMsg(response?.data?.message);
      setRegisterCred({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });;
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg(err.response.data.message);
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };
  //////////////////////////////////////////////////////////

  const handleChange = (e) => {
    if (!isFlipped) {
      let value = e.target.value;
      setLoginCred({ ...loginCred, [e.target.name]: value });
    }
    if (isFlipped) {
      let value = e.target.value;
      setRegisterCred({ ...registerCred, [e.target.name]: value });
    }
  };

  const flipHandler = (e) => {
    return setIsFlipped(!isFlipped);
  };
  ///////////////////////////////////////////////////////////

  return (
    <>
      <ul>
        <li className={msg ? "errmsg" : "offscreen"} aria-live="assertive">
          {msg}
        </li>
        <li
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </li>
      </ul>
      <div className="flex frontside h-screen overflow-hidden bg-gradient-to-b from-violet-800 to-indigo-900 justify-center xl:items-center w-full">
        <ReactCardFlip
          isFlipped={isFlipped}
          flipDirection="horizontal"
          flipSpeedBackToFront={0.5}
          flipSpeedFrontToBack={0.5}
        >
          {/* ========= LOGIN ========= */}
          <div className="frontSide login">
            <form onSubmit={loginHandler} className="frontSide">
              <div className="bg-white px-10 py-8 mt-40 xl:mt-0 rounded-xl w-screen shadow-2xl max-w-sm">
                <div className="space-y-4">
                  <h1 className="text-center text-2xl font-semibold text-gray-600">
                    Login
                  </h1>
                  {/* EMAIL */}
                  <div>
                    <label className="block mb-1 text-gray-600 font-semibold">
                      Email
                    </label>
                    <input
                      type="email"
                      className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
                      name="email"
                      autoComplete="off"
                      required={true}
                      value={loginCred.email}
                      onChange={handleChange}
                      ref={userRef}
                    />
                  </div>
                  {/* PASSWORD */}
                  <div>
                    <label className="block mb-1 text-gray-600 font-semibold">
                      Password
                    </label>
                    <input
                      type="password"
                      className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
                      name="password"
                      value={loginCred.password}
                      onChange={handleChange}
                      required={true}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="mt-4 w-full bg-violet-700 text-indigo-100 py-2 rounded-md text-lg tracking-wide"
                >
                  Login
                </button>
                <div className="flex justify-center items-center mt-6">
                  <span className=" inline-flex items-center text-gray-700 font-medium text-xs text-center">
                    <span className="ml-2 text-sm">
                      Don't have an account?
                      <span
                        onClick={flipHandler}
                        className="text-sm ml-2 text-blue-500 font-semibold cursor-pointer"
                      >
                        Register
                      </span>
                    </span>
                  </span>
                </div>
              </div>
            </form>
          </div>
          {/* ========= REGISTER ========= */}
          <div className="backSide register">
            <form onSubmit={registerHandler} className="backSide">
              <div className="bg-white px-10 py-8 rounded-xl w-screen mt-20 xl:mt-0 shadow-2xl max-w-sm">
                <div className="space-y-4">
                  <h1 className="text-center text-2xl font-semibold text-gray-600">
                    Register
                  </h1>
                  {/* USERNAME */}
                  <div>
                    <label className="block mb-1 text-gray-600 font-semibold">
                      Username
                    </label>
                    <input
                      type="text"
                      className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
                      name="username"
                      value={registerCred.username}
                      onChange={handleChange}
                      autoComplete="off"
                      required={true}
                    />
                  </div>
                  {/* EMAIL */}
                  <div>
                    <label className="block mb-1 text-gray-600 font-semibold">
                      Email
                    </label>
                    <input
                      type="email"
                      className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
                      name="email"
                      value={registerCred.email}
                      onChange={handleChange}
                      autoComplete="off"
                      required={true}
                    />
                  </div>
                  {/* PASSWORD */}
                  <div>
                    <label className="block mb-1 text-gray-600 font-semibold">
                      Password
                    </label>
                    <input
                      type="password"
                      className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
                      name="password"
                      value={registerCred.password}
                      onChange={handleChange}
                      required={true}
                      minLength={5}
                    />
                  </div>
                  {/* CONFIRM PASSWORD */}
                  <div>
                    <label className="block mb-1 text-gray-600 font-semibold">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
                      name="confirmPassword"
                      value={registerCred.confirmPassword}
                      onChange={handleChange}
                      required={true}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="mt-4 w-full bg-violet-700 text-indigo-100 py-2 rounded-md text-lg tracking-wide"
                >
                  Register
                </button>
                <div className="flex justify-center items-center mt-6">
                  <span className=" inline-flex items-center text-gray-700 font-medium text-xs text-center">
                    <span className="ml-2 text-sm">
                      Already have an account?
                      <span
                        onClick={() => flipHandler()}
                        className="text-sm ml-2 text-blue-500 font-semibold cursor-pointer"
                      >
                        Login
                      </span>
                    </span>
                  </span>
                </div>
              </div>
            </form>
          </div>
        </ReactCardFlip>
      </div>
    </>
  );
}

export default Login;
