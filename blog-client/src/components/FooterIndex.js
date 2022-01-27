import React from "react";

function Footer({ loadNextPage, loadPreviousPage }) {
  return (
    <footer className="footer">
      <button
        onClick={loadPreviousPage}
        className="footer__link footer__link--previous"
        id="button-prev"
      >
        previous
      </button>
      <button
        onClick={loadNextPage}
        className="footer__link footer__link--next"
        id="button-next"
      >
        next
      </button>
    </footer>
  );
}

export default Footer;
