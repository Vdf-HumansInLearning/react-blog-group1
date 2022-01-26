import React, { Component } from "react";
import ArticleHeader from "../components/ArticleHeader";
import ContentPreview from "../components/ContentPreview";
import ButtonReadmore from "../components/buttons/ButtonReadmore";

class ArticlePreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: {
        id: props.article.id,
        headerData: {
          title: props.article.title,
          tag: props.article.tag,
          author: props.article.author,
          date: props.article.date,
          imgUrl: props.article.imgUrl,
        },
        saying: props.article.saying,
        content: ["asssjjfjfdjdjsdjdjjdjjds", "jsjdjjdjdjdjfhjejiejenifeif"],
      },
    };
  }

  render() {
    return (
      <article>
        <ArticleHeader headerData={this.state.article.headerData} />
        <ContentPreview content={this.state.article.content} />
        <ButtonReadmore articleId={this.state.article.id} />
      </article>
    );
  }
}

export default ArticlePreview;
