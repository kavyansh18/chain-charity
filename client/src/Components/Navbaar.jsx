import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useOkto } from "okto-sdk-react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import logo from "../assets/logo.png";
import "../index.css";

const Navbaar = () => {
  const navigate = useNavigate();
  const okto = useOkto();
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
  const [isGoogleLoginVisible, setIsGoogleLoginVisible] = useState(false);
  const BASE_URL = "https://sandbox-api.okto.tech";
  const OKTO_CLIENT_API = "3469fac8-410e-4fab-8f16-a0345461045c";

  const apiService = axios.create({
    baseURL: BASE_URL,
    headers: {
      "x-api-key": OKTO_CLIENT_API,
      "Content-Type": "application/json",
    },
  });

  const setPin = (idToken, token, reloginPin) => {
    return apiService.post("/api/v1/set_pin", {
      id_token: idToken,
      token: token,
      relogin_pin: reloginPin,
      purpose: "set_pin",
    });
  };

  const handleGoogleLogin = async (credentialResponse) => {
    if (!okto) {
      console.error("Okto SDK is not initialized.");
      return;
    }
    console.log("Google login response:", credentialResponse);
    const idToken = credentialResponse.credential;
    console.log("Google ID token:", idToken);
    const { authenticate } = okto;
    authenticate(idToken, async (authResponse, error) => {
      if (authResponse) {
        console.log("Authentication response:", authResponse);
        localStorage.setItem('authToken', authResponse.auth_token);
        setAuthToken(authResponse.auth_token);
        if (!authToken && authResponse.action === "signup") {
          console.log("User Signup");
          const pinToken = authResponse.token;
          await setPin(idToken, pinToken, "0000");
          await authenticate(idToken, async (res, err) => {
            if (res) {
              localStorage.setItem('authToken', res.auth_token);
              setAuthToken(res.auth_token);
            }
          });
        }
        console.log("Auth token received:", authToken);
        navigate("/explore");
      }
      if (error) {
        console.error("Authentication error:", error);
      }
    });
  };

  const handleLoginButtonClick = () => {
    setIsGoogleLoginVisible(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setAuthToken(null);
    setIsGoogleLoginVisible(false);
  };

  return (
    <div className="w-screen h-16 ">
      <header>
        <div className="logo mt-3">
          <img className="w-32 rounded-3xl" src={logo} alt="Logo" />
        </div>
        <nav className="mt-2 flex justify-center items-center">
          <NavLink to="/explore">Home</NavLink>
          <NavLink to="/home">Profile</NavLink>
          {!authToken ? (
            <>
              <button
                onClick={handleLoginButtonClick}
                className=" mr-1 ml-6 relative inline-flex items-center justify-center px-4 py-1 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-full shadow-xl group hover:ring-1 hover:ring-purple-500"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-pink-700 via-purple-600 to-blue-600"></span>
                <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
                <span className="relative text-white">Login</span>
              </button>
              {isGoogleLoginVisible && (
                <GoogleLogin
                  onSuccess={handleGoogleLogin}
                  onError={(error) => {
                    console.log("Login Failed", error);
                  }}
                  useOneTap
                  promptMomentNotification={(notification) =>
                    console.log("Prompt moment notification:", notification)
                  }
                  prompt="select_account"
                />
              )}
            </>
          ) : (
            <button
              onClick={handleLogout}
              className=" ml-6 relative inline-flex items-center justify-center px-4 py-1 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-full shadow-xl group hover:ring-1 hover:ring-purple-500"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-700"></span>
              <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
              <span className="relative text-white">Logout</span>
            </button>
          )}
          <NavLink to="/register">Register as NGO</NavLink>
        </nav>
      </header>
    </div>
  );
};

export default Navbaar;
