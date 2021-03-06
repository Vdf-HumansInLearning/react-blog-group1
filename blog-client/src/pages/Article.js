import { Component } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import ArticleHeader from "../components/ArticleHeader";
import NavBar from "../components/NavBar";
import ThemeSwitch from "../components/ThemeSwitch";
import Saying from "../components/Saying";
import FooterDetails from "../components/FooterDetails";
import Content from "../components/Content";

import "../App.css";

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: {
        id: "",
        title: "",
        tag: "",
        author: "",
        date: "",
        imgUrl: "",
        saying: "",
        frontContent: [],
        content: [],
      },
    };
    this.getOneArticle = this.getOneArticle.bind(this);
  }

  getOneArticle(id) {
    const self = this;
    fetch("http://localhost:3007/articles/" + id)
      .then(function (response) {
        if (response.status !== 200) {
          console.log(
            "Looks like there was a problem. Status Code: " + response.status
          );
          //redirect to 404
          self.props.navigate("/*", { replace: true });
          return;
        }
        response.json().then(function (data) {
          self.setState({ article: data });
        });
      })
      .catch(function (err) {
        console.log("Fetch Error :-S", err);
      });
  }
  componentDidMount() {
    const { id } = this.props.params;
    this.getOneArticle(id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.params.id !== prevProps.params.id) {
      this.getOneArticle(this.props.params.id);
    }
  }

  render() {
    const { article } = this.state;
    let middle = Math.round((article.content.length - 1) / 2);
    const contentList = article.content.map((paragraph, index) => {
      if (index === middle) {
        return (
          <>
            <Saying saying={article.saying} key={index + 1} />
            <Content content={paragraph} key={index} />
          </>
        )
      } else {
        return <Content content={paragraph} key={index} />;
      }
    });
    return (
      <>
        <ThemeSwitch />
        <NavBar />
        <ArticleHeader article={article} isArticleRoute={true} />
        <div className="content__container">{contentList}</div>
        <FooterDetails
          nextId={this.state.article.nextId}
          prevId={this.state.article.prevId}
        />
      </>
    );
  }
}

const withRouter = (WrappedComponent) => (props) => {
  const params = useParams();
  const navigate = useNavigate();
  return (
    <>
      <WrappedComponent {...props} params={params} navigate={navigate} />
    </>
  );
};

export default withRouter(Article);
