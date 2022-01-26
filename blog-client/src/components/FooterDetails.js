import React from "react";
import { Link } from "react-router-dom";

function FooterDetails({ nextId, prevId }) {
  return (
    <footer className="footer-details">
      {nextId && prevId ? (
        [
          <Link to={`/details/${prevId}`} className="footer__link" key="1">
            <button type="button" className="footer__link">
              previous article
            </button>
          </Link>,
          <Link
            to={`/details/${nextId}`}
            className="footer__link footer__link--next"
            key="2"
          >
            <button type="button" className="footer__link footer__link--next">
              next article
            </button>
          </Link>,
        ]
      ) : prevId ? (
        <Link to={`/details/${prevId}`} className="footer__link">
          <button type="button" className="footer__link">
            previous article
          </button>
        </Link>
      ) : (
        <Link
          to={`/details/${nextId}`}
          className="footer__link footer__link--next"
        >
          <button type="button" className="footer__link footer__link--next">
            next article
          </button>
        </Link>
      )}
    </footer>
  );
}

export default FooterDetails;
