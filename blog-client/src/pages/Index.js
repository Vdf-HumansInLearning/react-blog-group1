import { Component } from "react";
import "../App.css";
import ThemeSwitch from "../components/ThemeSwitch";
import NavBar from "../components/NavBar";
import ButtonModal from "../components/buttons/ButtonModal";
import ArticlePreview from "../components/ArticlePreview";
import Footer from "../components/FooterIndex";
import AddArticleModal from "../components/AddArticleModal";
import DeleteModal from "../components/DeleteModal";
import Toast from "../components/Toast";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      indexSize: 4,
      indexStart: 0,
      indexEnd: 3,
      totalNumberOfArticles: 0,
      articleList: [],
      articleToEdit: null,
      articleToDelete: null,
      isAddModalClicked: false,
      isEditModalClicked: false,
      isDeleteModalClicked: false,
      isToastShown: false,
      toastContent: "",
    };

    this.getArticleList = this.getArticleList.bind(this);
    this.loadNextPage = this.loadNextPage.bind(this);
    this.loadPreviousPage = this.loadPreviousPage.bind(this);
    this.showToast = this.showToast.bind(this);

    this.openEditModal = this.openEditModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.openDeleteModal = this.openDeleteModal.bind(this);

    this.hideDeleteModal = this.hideDeleteModal.bind(this);
    this.hideModal = this.hideModal.bind(this);

    this.addArticle = this.addArticle.bind(this);
    this.editArticle = this.editArticle.bind(this);
    this.deleteArticle = this.deleteArticle.bind(this);
  }

  openModal() {
    this.setState({ isAddModalClicked: true });
  }

  hideModal() {
    this.setState({
      isAddModalClicked: false,
      isEditModalClicked: false,
      articleToEdit: null,
    });
  }

  openEditModal(article) {
    console.log(article);
    this.setState({ isEditModalClicked: true, articleToEdit: article });
  }

  openDeleteModal(articleId) {
    this.setState({ isDeleteModalClicked: true, articleToDelete: articleId });
  }

  hideDeleteModal() {
    this.setState({ isDeleteModalClicked: false });
  }

  showToast(toastContent) {
    this.setState({ isToastShown: true, toastContent: toastContent });
    setTimeout(() => this.setState({ isToastShown: false }), 3000);
  }

  // TAKING DATA FROM SERVER
  getArticleList() {
    const self = this;

    fetch(
      `http://localhost:3007/articles?indexStart=${this.state.indexStart}&indexEnd=${this.state.indexEnd}`
    )
      .then(function (response) {
        if (response.status !== 200) {
          console.log(
            "Looks like there was a problem. Status Code: " + response.status
          );
          return;
        }
        // Examine the text in the response
        response.json().then(function (data) {
          self.setState({
            articleList: data.articlesList,
            totalNumberOfArticles: data.numberOfArticles,
          });
        });
      })
      .catch(function (err) {
        console.log("Fetch Error :-S", err);
      });
  }

  addArticle(articleToPost) {
    const self = this;

    fetch("http://localhost:3007/articles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(articleToPost),
    })
      .then(function (response) {
        response.json().then(function () {
          self.hideModal();
          self.getArticleList();
          self.showToast("Article added successfully!");
        });
      })
      .catch(function (err) {
        console.log("Fetch Error :-S", err);
      });
  }

  editArticle(article) {
    const self = this;

    fetch("http://localhost:3007/articles/" + article.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(article),
    })
      .then(function (response) {
        // Examine the text in the response
        response.json().then(function (data) {
          self.hideModal();
          self.getArticleList();
          self.showToast("Article edited successfully!");
        });
      })
      .catch(function (err) {
        console.log("Fetch Error :-S", err);
      });
  }

  deleteArticle() {
    const self = this;

    fetch("http://localhost:3007/articles/" + self.state.articleToDelete, {
      method: "DELETE",
    }).then(() => {
      this.setState({
        status: "Delete successful",
        isDeleteModalClicked: false,
      });
      this.showToast("Article deleted successfully!");
      if (self.totalNumberOfArticles % self.indexSize === 1) {
        self.loadPreviousPage();
      }
      self.getArticleList();
    });
  }

  loadNextPage() {
    if (this.state.indexEnd < this.state.totalNumberOfArticles - 1) {
      this.setState(
        {
          indexStart: this.state.indexStart + this.state.indexSize,
          indexEnd: this.state.indexEnd + this.state.indexSize,
        },
        () => this.getArticleList()
      );
    }
    window.scrollTo(0, 0);
  }

  loadPreviousPage() {
    if (this.state.indexStart !== 0) {
      this.setState(
        {
          indexEnd: this.state.indexEnd - this.state.indexSize,
          indexStart: this.state.indexStart - this.state.indexSize,
        },
        () => this.getArticleList()
      );
    }
    window.scrollTo(0, 0);
  }

  componentDidMount() {
    this.getArticleList();
  }

  render() {
    let { articleList } = this.state;
    const isDeleteModalClicked = this.state.isDeleteModalClicked;
    const isAddModalClicked = this.state.isAddModalClicked;
    const isEditModalClicked = this.state.isEditModalClicked;

    let articles = articleList.map((article) => (
      <ArticlePreview
        article={article}
        key={article.id}
        isDeleteModalClicked={isDeleteModalClicked}
        openDeleteModal={this.openDeleteModal}
        hideDeleteModal={this.hideDeleteModal}
        openEditModal={this.openEditModal}
        editArticle={this.editArticle}
        deleteArticle={this.deleteArticle}
      />
    ));

    let addArticleModal;
    if (isAddModalClicked || isEditModalClicked) {
      addArticleModal = (
        <AddArticleModal
          isAddModalClicked={isAddModalClicked}
          isEditModalClicked={isEditModalClicked}
          articleToEdit={this.state.articleToEdit}
          hideModal={this.hideModal}
          getArticleList={this.getArticleList}
          showToast={this.showToast}
          addArticle={this.addArticle}
          editArticle={this.editArticle}
        />
      );
    }

    let deleteArticleModal;
    if (isDeleteModalClicked) {
      deleteArticleModal = (
        <DeleteModal
          hideDeleteModal={this.hideDeleteModal}
          deleteArticle={this.deleteArticle}
        />
      );
    }

    return (
      <>
        <Toast
          isToastShown={this.state.isToastShown}
          toastContent={this.state.toastContent}
        />
        <ThemeSwitch />
        <NavBar />
        <ButtonModal openModal={this.openModal} />
        {addArticleModal}
        {deleteArticleModal}
        {articles}
        <Footer
          loadNextPage={this.loadNextPage}
          loadPreviousPage={this.loadPreviousPage}
          indexStart={this.state.indexStart > 0 ? this.state.indexStart : null}
          indexEnd={
            this.state.indexEnd < this.state.totalNumberOfArticles - 1
              ? this.state.indexEnd
              : null
          }
        />
      </>
    );
  }
}

export default Index;
