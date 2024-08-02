import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useOkto } from "okto-sdk-react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import Navbaar from "../Components/Navbaar";

const LoginPage = () => {
  console.log("LoginPage component rendered");
  const navigate = useNavigate();
  const okto = useOkto();
  const [authToken, setAuthToken] = useState(null);
  const [isGoogleLoginVisible, setIsGoogleLoginVisible] = useState(false);
  const BASE_URL = "https://sandbox-api.okto.tech";
  const OKTO_CLIENT_API = "3469fac8-410e-4fab-8f16-a0345461045c";

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '800px',
    margin: '0 auto',
  };

  const buttonStyle = {
    margin: '5px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  };

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
        setAuthToken(authResponse.auth_token);
        if (!authToken && authResponse.action === "signup") {
          console.log("User Signup");
          const pinToken = authResponse.token;
          await setPin(idToken, pinToken, "0000");
          await authenticate(idToken, async (res, err) => {
            if (res) {
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

  useEffect(() => {
    if (!okto) {
      console.error("Okto SDK is not initialized.");
    }
  }, [okto]);

  const handleLoginButtonClick = () => {
    setIsGoogleLoginVisible(true);
  };

  return (
    <div style={containerStyle}>
      <Navbaar />
      <h1>Login</h1>
      {!authToken ? (
        <div>
          <button style={buttonStyle} onClick={handleLoginButtonClick}>
            Login
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
            />
          )}
        </div>
      ) : (
        <>Authenticated</>
      )}
    </div>
  );
};

export default LoginPage;
