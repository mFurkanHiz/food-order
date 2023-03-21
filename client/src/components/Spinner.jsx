import React from "react";

function Spinner() {
  return (
    <div>
      <div
        className="spinner-border text-warning text-center mt-5"
        style={{ width: "5rem", height: "5rem" }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default Spinner;
