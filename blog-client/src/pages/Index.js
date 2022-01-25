import { Component } from "react";
import { Link } from "react-router-dom";
import '../App.css'
import ThemeSwitch from "../components/ThemeSwitch";
import NavBar from "../components/NavBar";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return(<>
      <ThemeSwitch/>
    <NavBar />
    </>
    )
  }
}

export default Index;
