import React from "react";
import { Link } from "react-router-dom";

function ButtonReadmore({ articleId }) {
  return (
    <div className="readmore__container">
      <Link to={`/details/${articleId}`} className="btn-details">
        <button className="button button-details" type="button">
          Read more
        </button>
      </Link>
    </div>
  );
}

export default ButtonReadmore;