import { Component } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import ThemeSwitch from "../components/ThemeSwitch";

class NotFound extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTheme: '',
      currentImg: ''
    }
  }

  componentDidMount() {
    const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
    const currentImg = (currentTheme == 'dark' ? 'dark-img' : 'light-img')
    this.setState({ currentTheme: currentTheme, currentImg: currentImg });
  }

  // componentDidUpdate(prevState) {
  //   // compare props:
  //   if (this.state.currentTheme != prevState.currentTheme) {
  //     if (this.state.currentTheme == 'dark') {
  //       this.setState({
  //         currentImg: "dark-img"
  //       });
  //     } else {
  //       this.setState({
  //         currentImg: "light-img"
  //       });
  //     }
  //   }
  // }

  render() {
    return (
      <>
        <ThemeSwitch />
        <NavBar />
        <div className={
          "error-box " + this.state.currentImg} id="error-box">
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
