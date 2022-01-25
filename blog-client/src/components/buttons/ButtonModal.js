import React, { Component } from "react";
import { Link } from "react-router-dom";

class ButtonModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.openModal = this.openModal.bind(this);
  }
  openModal() {
    console.log("ffff");
  }
  render() {
    return (
      <div className="add__container">
        <button
          onClick={this.openModal}
          type="button"
          className="button open-modal fas fa-plus"
        >
          Add article
        </button>
      </div>
    );
  }
}

export default ButtonModal;
