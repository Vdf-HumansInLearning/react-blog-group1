import { Component } from "react";
import "../App.css"
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import ArticleHeader from "../components/ArticleHeader";
import NavBar from "../components/NavBar";
import ThemeSwitch from "../components/ThemeSwitch";
import Saying from "../components/Saying";
import FooterDetails from "../components/FooterDetails";
import Content from "../components/Content";

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: {
        id: "",
        headerData: {
          title: "",
          tag: "",
          author: "",
          date: "",
          imgUrl: "",
        },
        saying: "",
        content: "",
      },
    };
  }
  componentDidMount() {
    const self = this;
    const { id } = this.props.params;

    fetch("http://localhost:3007/articles/" + id)
      .then(function (response) {
        if (response.status !== 200) {
          console.log(
            "Looks like there was a problem. Status Code: " + response.status
          );
          return;
        }
        // Examine the text in the response
        response.json().then(function (data) {
          console.log(data.content)
          self.setState({ article: data });
        });
      })
      .catch(function (err) {
        console.log("Fetch Error :-S", err);
      });
  }

  render() {
    const { article } = this.state;
    return (
      <>
        <ThemeSwitch />
        <NavBar />
        <ArticleHeader headerData={this.state.article} />
        <Content content={this.state.article.content[0]} />
        <Saying saying={this.state.article.saying} />
        <Content content={this.state.article.content[1]} />
        <FooterDetails />
      </>
    );
  }
}

const withRouter = (WrappedComponent) => (props) => {
  const params = useParams();
  return (
    <>
      <WrappedComponent
        {...props}
        params={params}
      />
    </>
  );
};

export default withRouter(Article);
