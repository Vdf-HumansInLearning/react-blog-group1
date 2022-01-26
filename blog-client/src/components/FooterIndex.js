import React from "react";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="footer">
            <button className="footer__link footer__link--previous" id="button-prev">previous</button>
            <button className="footer__link footer__link--next" id="button-next">next</button>
        </footer>
    );
}

export default Footer;
