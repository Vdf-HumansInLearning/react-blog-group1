import React from "react";

function ArticleHeader({
  article,
  openDeleteModal,
  openEditModal,
  isArticleRoute,
}) {
  return (
    <div>
      <h2 className="title">{article.title}</h2>
      <ul className="info__container">
        <li className="info__item">{article.tag}</li>
        <li className="info__item">
          Added by &nbsp;
          <span className="info__mark point">{article.author}</span>
        </li>
        <li className="info__item">{article.date}</li>
      </ul>
      {isArticleRoute ? null : (
        <div className="actions__container">
          <button
            type="button"
            className="actions__btn border"
            onClick={() => openEditModal(article)}
          >
            Edit
          </button>
          <button
            type="button"
            className="actions__btn"
            onClick={() => openDeleteModal(article.id)}
          >
            Delete
          </button>
        </div>
      )}
      <img src={article.imgUrl} alt="figure" />
    </div>
  );
}

export default ArticleHeader;
