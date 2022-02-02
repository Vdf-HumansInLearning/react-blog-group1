import React from "react";

function Toast({ isToastShown, toastContent }) {
  if (isToastShown) {
    return (
      <div className="alert alert-success" role="alert">
        {toastContent}
        <div className="bee-container">
          <div className="face">
            <div className="eye left"></div>
            <div className="eye right"></div>
            <div className="mouth"></div>
          </div>
          <div className="left-wing wing"></div>
          <div className="right-wing wing"></div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default Toast;
