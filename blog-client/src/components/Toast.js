import React from "react";

function Toast({isToastShown}) {
  if(isToastShown) {
  return (
    <div className="alert alert-success" role="alert"> 
    Article added successfully!
    </div>
  )
  } else {
    return null;
  }
}

export default Toast;
