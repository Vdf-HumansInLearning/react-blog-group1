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
    this.state = { article: 
      {articleId: "2465d861-98ad-492b-99c9-ace00cb64204", 
      headerData:
      {title: "Transilvania", tag:"Asdf", author:"gfdf", date:"21.12.345",  imgUrl:"../public/assets/img/bike.jpg"}, 
      content: ['asssjjfjfdjdjsdjdjjdjjds', 'jsjdjjdjdjdjfhjejiejenifeif'] }}}

  

  render() {
    return (
      <>
        <ThemeSwitch />
        <NavBar />
        <ButtonModal />
        <ArticlePreview article={this.state.article} />
      </>
    );
  }
}

export default Index;
