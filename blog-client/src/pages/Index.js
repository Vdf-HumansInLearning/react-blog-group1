import { Component } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import ThemeSwitch from "../components/ThemeSwitch";
import NavBar from "../components/NavBar";
import ButtonModal from "../components/buttons/ButtonModal";
import ButtonReadmore from "../components/buttons/ButtonReadmore";
import ArticleHeader from "../components/ArticleHeader";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = { articleId: "2465d861-98ad-492b-99c9-ace00cb64204", 
    headerData:{title: "Transilvania", tag:"Asdf", author:"gfdf", date:"21.12.345", 
                imgUrl:"../public/assets/img/bike.jpg"} };
  }

  render() {
    return (
      <>
        <ThemeSwitch />
        <NavBar />
        <ButtonModal />
        <ArticleHeader headerData={this.state.headerData}/>
        <ButtonReadmore articleId={this.state.articleId} />
      </>
    );
  }
}

export default Index;
