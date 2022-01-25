import { Component } from "react";
import { Link } from "react-router-dom";

import NavBar from "../components/NavBar";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <NavBar />;
  }
}

export default Index;
