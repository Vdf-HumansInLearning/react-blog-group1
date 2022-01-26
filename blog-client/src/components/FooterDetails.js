import React from "react";
import { Link } from "react-router-dom";

function FooterDetails() {
    return (
        <footer className="footer-details">
            <button className="footer__link">previous article</button>
            <button className="footer__link footer__link--next" id="button-next">next article</button>
        </footer>
    );
}

export default FooterDetails;
