import React, { useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import { useNavigate } from "react-router-dom";
import "./App.css";

function Login() {
  const clientId =
    "765528753165-ig7si7bahah62hvumrnfnlknpgcaoqf9.apps.googleusercontent.com";
  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  });

  const onSuccess = () => {
    navigate("/main");
  };

  const onFailure = (err) => {
    console.log("failed", err);
  };

  const navigate = useNavigate();

  return (
    <div className="div-login">
      <h1>Sign in to check Hearthstone database</h1>
      <GoogleLogin
        clientId={clientId}
        buttonText="Sign in with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={false}
      />
    </div>
  );
}
export default Login;
