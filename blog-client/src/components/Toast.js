import React from "react";

function Toast({isToastShown, toastContent}) {
  if(isToastShown) {
  return (
    <div className="alert alert-success" role="alert"> 
      {toastContent}
    </div>
  )
  } else {
    return null;
  }
}

export default Toast;
