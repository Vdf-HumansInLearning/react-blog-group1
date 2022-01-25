import React, {Component} from "react";

class ThemeSwitch extends Component {
    constructor(props) {
        super(props);
    this.state = {}
    }

     switchTheme(e) {
        // if (e.target.checked) {
        //     body.setAttribute('data-theme', 'dark');
        //     localStorage.setItem('theme', 'dark');
        //     changeImageNotFound('dark');
    
        // } else {
        //     body.setAttribute('data-theme', 'light');
        //     localStorage.setItem('theme', 'light');
        //     changeImageNotFound('light');
        // }
    }
    
     changeImageNotFound(theme) {
        // let img = document.getElementById('error-box');
        // if (img) {
        //     if (theme === 'dark') {
        //         img.style.backgroundImage = 'url("/img/Valley-dark.jpg")';
        //     } else {
        //         img.style.backgroundImage = 'url("/img/Valley-light.jpg")';
        //     }
        // }
    }

    render() {
        return (
            <div className="theme-switch-box">
                <label className="theme-switch" htmlFor="switch">
                    <input type="checkbox" id="switch"/>
                    <div className="icons">
                        <div className="far fa-moon round"></div>
                        <div className="fas fa-sun round"></div>
                    </div>     
                </label>
            </div>
        )
    }
}

export default ThemeSwitch;