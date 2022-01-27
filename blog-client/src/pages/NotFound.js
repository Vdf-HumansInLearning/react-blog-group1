import { Component } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import ThemeSwitch from "../components/ThemeSwitch";

class NotFound extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return(
      <>
      <ThemeSwitch />
      <NavBar />
     
      <div className="error-box" id="error-box">
        <div className="error-info">
          <h1 className="error-message">Error 404 - Page not found!</h1>
          <Link to={'/'}>
            <button type="button" className="to-homepage">BACK TO HOMEPAGE</button>
            </Link>
          </div>
        </div>
       </>
    )
  }
}

export default NotFound;
