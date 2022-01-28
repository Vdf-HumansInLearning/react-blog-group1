import React from "react";

function ButtonModal({ openModal }) {
  return (
    <div className="add__container">
      <button
        onClick={openModal}
        type="button"
        className="button open-modal fas fa-plus"
      >
        Add article
      </button>
    </div>
  );
}

export default ButtonModal;
