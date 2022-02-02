import { Component } from "react";
import "../App.css";
import ThemeSwitch from "../components/ThemeSwitch";
import NavBar from "../components/NavBar";
import ButtonModal from "../components/buttons/ButtonModal";
import ArticlePreview from "../components/ArticlePreview";
import Footer from "../components/FooterIndex";
import AddArticleModal from "../components/AddArticleModal";
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
      isModalClicked: false,
      isEditModalClicked: false,
      isToastShown: false,
      toastContent: "",
    };
    this.openModal = this.openModal.bind(this);
    this.getArticleList = this.getArticleList.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.loadNextPage = this.loadNextPage.bind(this);
    this.loadPreviousPage = this.loadPreviousPage.bind(this);
    this.openEditModal = this.openEditModal.bind(this);
    this.showToast = this.showToast.bind(this);
  }

  openModal() {
    this.setState({ isModalClicked: true });
    console.log(this.state.isModalClicked);
  }

  hideModal() {
    this.setState({
      isModalClicked: false,
      isEditModalClicked: false,
      articleToEdit: null,
    });
  }

  openEditModal(article) {
    console.log(article);
    this.setState({ isEditModalClicked: true, articleToEdit: article });
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
            articleList: [...data.articlesList],
            totalNumberOfArticles: data.numberOfArticles,
          });
        });
      })
      .catch(function (err) {
        console.log("Fetch Error :-S", err);
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
    const isModalClicked = this.state.isModalClicked;
    const isEditModalClicked = this.state.isEditModalClicked;

    let articles = articleList.map((article) => (
      <ArticlePreview
        article={article}
        key={article.id}
        openDeleteModal={this.openDeleteModal}
        getArticleList={this.getArticleList}
        openEditModal={this.openEditModal}
        editArticle={this.editArticle}
        totalNumberOfArticles={this.state.totalNumberOfArticles}
        indexSize={this.state.indexSize}
        loadPreviousPage={this.loadPreviousPage}
        showToast={this.showToast}
      />
    ));

    let addArticleModal;

    if (isModalClicked || isEditModalClicked) {
      addArticleModal = (
        <AddArticleModal
          isModalClicked={this.state.isModalClicked}
          hideModal={this.hideModal}
          isEditModalClicked={this.state.isEditModalClicked}
          getArticleList={this.getArticleList}
          articleToEdit={this.state.articleToEdit}
          showToast={this.showToast}
        />
      );
    }

    return (
      <>
        <Toast
          isToastShown={this.state.isToastShown}
          // isToastShown={true}
          toastContent={this.state.toastContent}
          // toastContent={'article added'}
        />
        <ThemeSwitch />
        <NavBar />
        <ButtonModal openModal={this.openModal} />
        {addArticleModal}
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
