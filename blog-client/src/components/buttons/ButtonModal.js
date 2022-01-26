import React, { Component } from "react";
import Index from "../../pages/Index";

import { Link } from "react-router-dom";

class ButtonModal extends Component {
  constructor(props) {
    super(props);

  }


  render() {
    return (
      <div className="add__container">
        <button
          onClick={this.props.openModal}
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
