import React, { Component } from "react";
import ArticleHeader from "../components/ArticleHeader";
import ContentPreview from "../components/ContentPreview";
import ButtonReadmore from "../components/buttons/ButtonReadmore";

class ArticlePreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: {
        id: this.props.article.id,
        title: this.props.article.title,
        tag: this.props.article.tag,
        author: this.props.article.author,
        date: this.props.article.date,
        imgUrl: this.props.article.imgUrl,
        saying: this.props.article.saying,
        content: this.props.article.content,
      },
    };
  }

  render() {
    return (
      <article>
        <ArticleHeader
          headerData={
            (this.article.title,
            this.article.tag,
            this.article.author,
            this.article.date,
            this.article.imgUrl)
          }
        />
        <ContentPreview content={this.article.content} />
        <ButtonReadmore articleId={this.article.id} />
      </article>
    );
  }
}

export default ArticlePreview;
