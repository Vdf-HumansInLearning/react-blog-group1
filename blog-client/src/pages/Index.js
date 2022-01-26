import { Component } from "react";
import "../App.css";
import ThemeSwitch from "../components/ThemeSwitch";
import NavBar from "../components/NavBar";
import ButtonModal from "../components/buttons/ButtonModal";
import ArticlePreview from "../components/ArticlePreview";
import Footer from "../components/FooterIndex";
import AddArticleModal from "../components/AddArticleModal";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfArticlesPerPage: 4,
      indexStart: 0,
      indexEnd: this.numberOfArticlesPerPage - 1,

      totalNumberOfArticles: 0,
      articleList: [],
      isModalClicked: false
    };
    this.openModal = this.openModal.bind(this);
    this.getArticleList = this.getArticleList.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }


openModal() {
  this.setState({isModalClicked: true});
  console.log(this.state.isModalClicked);
}


hideModal() {
  this.setState({isModalClicked: false})
}

  // TAKING DATA FROM SERVER
  getArticleList() {
    const self = this;

    fetch(`http://localhost:3007/articles?indexStart=0&indexEnd=3`)
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
    const isModalClicked = this.state.isModalClicked
    let button;
    const articles = articleList.map((article) => (
      <ArticlePreview article={article} key={article.id} />
    ));
    if(isModalClicked) {
      button = <AddArticleModal isModalClicked={this.state.isModalClicked} hideModal={this.hideModal}/>
    }
    return (
      <>
        <ThemeSwitch />
        <NavBar />
        <ButtonModal openModal={this.openModal}/>
        {button}
        {articles}
        <Footer />
      </>
    );
  }
}

export default Index;
