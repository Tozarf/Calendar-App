import React from "react";

export const Navbar = () => {
  return (
    <div className="navbar navbar-dark bg-dark mb-4">
      <span className="navbar-brand">Fausto</span>
      <button className="btn btn-outline-danger">
        <i className="fas fa-sign-out-alt"></i>
        <span> Leave</span>
      </button>
    </div>
  );
};
