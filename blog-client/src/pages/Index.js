import { Component } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import ThemeSwitch from "../components/ThemeSwitch";
import NavBar from "../components/NavBar";
import ButtonModal from "../components/buttons/ButtonModal";
import ArticlePreview from "../components/ArticlePreview";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfArticlesPerPage: 4,
      indexStart: 0,
      indexEnd: this.numberOfArticlesPerPage - 1,

      totalNumberOfArticles: 0,
      articleList: [],
      article: {
        articleId: "2465d861-98ad-492b-99c9-ace00cb64204",
        headerData: {
          title: "Transilvania",
          tag: "Asdf",
          author: "gfdf",
          date: "21.12.345",
          imgUrl: "../public/assets/img/bike.jpg",
        },
        content: ["asssjjfjfdjdjsdjdjjdjjds", "jsjdjjdjdjdjfhjejiejenifeif"],
      },
    };
    this.getArticleList = this.getArticleList.bind(this);
  }

  // TAKING DATA FROM SERVER
  getArticleList() {
    const self = this;

    fetch(
      `http://localhost:3007/articles?indexStart=${this.indexStart}&indexEnd=${this.indexEnd}`
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

  componentDidMount() {
    this.getArticleList();
  }

  render() {
    const { articleList } = this.state;
    const articles = articleList.map((article) => (
      <ArticlePreview article={article} key={article.id} />
    ));
    return (
      <>
        <ThemeSwitch />
        <NavBar />
        <ButtonModal />
        {articles}
      </>
    );
  }
}

export default Index;
