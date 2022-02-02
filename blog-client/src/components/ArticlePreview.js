import React from "react";
import ArticleHeader from "../components/ArticleHeader";
import Content from "../components/Content";
import ButtonReadmore from "../components/buttons/ButtonReadmore";

function ArticlePreview({ article, openDeleteModal, openEditModal }) {
  const contentList = article.frontContent.map((paragraph, index) => {
    return <Content content={paragraph} key={index} />;
  });

  return (
    <article>
      <ArticleHeader
        article={article}
        openDeleteModal={openDeleteModal}
        openEditModal={openEditModal}
      />
      <div className="content__container">{contentList}</div>
      <ButtonReadmore articleId={article.id} />
    </article>
  );
}

export default ArticlePreview;
