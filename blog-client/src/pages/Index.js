import { Component } from "react";
import "../App.css";
import ThemeSwitch from "../components/ThemeSwitch";
import NavBar from "../components/NavBar";
import ButtonModal from "../components/buttons/ButtonModal";
import ArticlePreview from "../components/ArticlePreview";
import Footer from "../components/FooterIndex";
import AddArticleModal from "../components/AddArticleModal";
import DeleteModal from "../components/DeleteModal";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfArticlesPerPage: 4,
      indexStart: 0,
      indexEnd: 0,
      totalNumberOfArticles: 0,
      articleList: [],
      isModalClicked: false,
      // isDeleteModalClicked: false,
    };
    this.openModal = this.openModal.bind(this);
    this.getArticleList = this.getArticleList.bind(this);
    this.hideModal = this.hideModal.bind(this);
  
  }

  openModal() {
    this.setState({ isModalClicked: true });
    console.log(this.state.isModalClicked);
  }

  hideModal() {
    this.setState({ isModalClicked: false });
  }

 
  // TAKING DATA FROM SERVER
  getArticleList() {
    this.setState({ indexEnd: 3 });
    console.log(this.state.indexEnd);
    const self = this;

    fetch(
      `http://localhost:3007/articles?indexStart=${this.state.indexStart}&indexEnd=3`
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
          });
          self.setState({ totalNumberOfArticles: data.numberOfArticles });
        });
      })
      .catch(function (err) {
        console.log("Fetch Error :-S", err);
      });
  }

  componentDidMount() {
    this.getArticleList();
  }

  render() {
    const { articleList } = this.state;
    const isModalClicked = this.state.isModalClicked;
   
    const articles = articleList.map((article) => (
      <ArticlePreview article={article} key={article.id} openDeleteModal={this.openDeleteModal} getArticleList={this.getArticleList}/>

    ));

    let addArticleModal;
   
    if (isModalClicked) {
      addArticleModal = (
        <AddArticleModal
          isModalClicked={this.state.isModalClicked}
          hideModal={this.hideModal}
        />
      );
    }

    
    
    return (
      <>
        <ThemeSwitch />
        <NavBar />
        <ButtonModal openModal={this.openModal} />
        {addArticleModal}
        {articles}
        <Footer />
      </>
    );
  }
}

export default Index;
