import React from "react";
import "./Loader.css";
import house from "../assets/house.svg";

const Loader = () => {
  return (
    <div className="global-loader">
      <img src={house} alt="loading" className="loader-house" />
      <p>Loading...</p>
    </div>
  );
};

export default Loader;