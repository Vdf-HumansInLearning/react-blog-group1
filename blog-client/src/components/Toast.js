import React from "react";

function Toast({ content }) {
  return (
    <div className="alert alert-success" role="alert">
      {content}
    </div>
  );
}

export default Toast;
