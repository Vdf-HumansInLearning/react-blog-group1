import React, { Component } from "react";
import ArticleHeader from "../components/ArticleHeader";
import Content from "../components/Content";
import ButtonReadmore from "../components/buttons/ButtonReadmore";
import DeleteModal from "../components/DeleteModal";

class ArticlePreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: {
        id: props.article.id,
        title: props.article.title,
        tag: props.article.tag,
        author: props.article.author,
        date: props.article.date,
        imgUrl: props.article.imgUrl,
        saying: props.article.saying,
        frontContent: props.article.frontContent,
        content: props.article.content,
        isDeleteModalClicked: false,
      },
    };
    this.deleteArticle = this.deleteArticle.bind(this);
    this.openDeleteModal = this.openDeleteModal.bind(this);
    this.hideDeleteModal = this.hideDeleteModal.bind(this);
  }

  openDeleteModal(id) {
    this.setState({ isDeleteModalClicked: true });
  }

  hideDeleteModal() {
    this.setState({ isDeleteModalClicked: false });
  }

  deleteArticle() {
    fetch(`http://localhost:3007/articles/${this.state.article.id}`, {
      method: "DELETE",
    }).then(() => {
      this.setState({
        status: "Delete successful",
        isDeleteModalClicked: false,
      });
      this.props.showToast("Article deleted successfully!");
      if (this.props.totalNumberOfArticles % this.props.indexSize === 1) {
        this.props.loadPreviousPage();
      }
      this.props.getArticleList();
    });
  }

  render() {
    const isDeleteModalClicked = this.state.isDeleteModalClicked;
    let deleteArticleModal;
    if (isDeleteModalClicked) {
      deleteArticleModal = (
        <DeleteModal
          isDeleteModalClicked={this.state.isDeleteModalClicked}
          hideDeleteModal={this.hideDeleteModal}
          deleteArticle={this.deleteArticle}
        />
      );
    }

    const { article } = this.state;
    const contentList = article.frontContent.map((paragraph, index) => {
      return <Content content={paragraph} key={index} />;
    });
    return (
      <article>
        <ArticleHeader
          article={this.state.article}
          openDeleteModal={this.openDeleteModal}
          openEditModal={this.props.openEditModal}
          editArticle={this.editArticle}
        />
        <div className="content__container">{contentList}</div>
        <ButtonReadmore articleId={this.state.article.id} />
        {deleteArticleModal}
      </article>
    );
  }
}

export default ArticlePreview;
