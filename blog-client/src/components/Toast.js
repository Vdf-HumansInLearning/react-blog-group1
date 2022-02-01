import React from "react";

function Toast({isToastShown, toastContent}) {
  if(isToastShown) {
  return (
    <div className="alert alert-success" role="alert"> 
      {toastContent}
      <div className="bee-container">
      <div class="face">
      <div class="eye left"></div>
      <div class="eye right"></div>
      <div class="mouth"></div>
    </div>
    <div class="left-wing wing"></div>
    <div class="right-wing wing"></div>
    </div>
    </div>
  )
  } else {
    return null;
  }
}

export default Toast;
