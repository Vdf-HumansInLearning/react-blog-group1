import React from "react";

function Footer({ loadNextPage, loadPreviousPage, indexStart, indexEnd }) {
  return (
    <footer className={"footer-details " + (!indexStart && indexEnd ? "footer-next" : "")}>
      {indexStart && indexEnd ? (
        <>
          <button
            onClick={loadPreviousPage}
            className="footer__link footer__link--previous"
            key={"button-prev"}
          >
            previous
          </button>
          <button
            onClick={loadNextPage}
            className="footer__link footer__link--next"
            key={"button-next"}
          >
            next
          </button>
        </>
      ) : indexStart ? (
        <button
          onClick={loadPreviousPage}
          className="footer__link footer__link--previous"
          id="button-prev"
        >
          previous
        </button>
      ) : (
        <button
          onClick={loadNextPage}
          className="footer__link footer__link--next"
          id="button-next"
        >
          next
        </button>
      )}
    </footer>
  );
}

export default Footer;
