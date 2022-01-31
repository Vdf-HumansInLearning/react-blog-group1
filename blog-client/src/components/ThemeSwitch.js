import React, { Component } from "react";
class ThemeSwitch extends Component {
    constructor(props) {
        super(props);
        this.state = { currentTheme: localStorage.getItem('theme') ? localStorage.getItem('theme') : null, body: document.querySelector('body') }
        this.switchTheme = this.switchTheme.bind(this);
    }

    switchTheme(event) {
        if (event.target.checked) {
            this.state.body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            this.state.body.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    }


    componentDidMount() {
        const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]')
        if (this.state.currentTheme) {
            this.state.body.setAttribute('data-theme', this.state.currentTheme);
            if (this.state.currentTheme === 'dark') {
                toggleSwitch.checked = true;
            }
        }
    }

    render() {
        return (
            <div className="theme-switch-box">
                <label className="theme-switch" htmlFor="switch">
                    <input type="checkbox" id="switch" onChange={this.switchTheme} />
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