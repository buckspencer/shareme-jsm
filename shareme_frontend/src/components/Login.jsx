import React from "react";
import shareVideo from "../assets/share.mp4";
import logo from "../assets/logo.png";
import GoogleLogin from "./GoogleLogin";

const Login = () => {
  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src={shareVideo}
          type="video"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="b-5">
            <img src={logo} width="190px" alt="logo" />
          </div>

          <div className="shadow-2xl pt-3">
            <GoogleLogin />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
