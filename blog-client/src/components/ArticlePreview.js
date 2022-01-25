import React, {Component} from 'react';
import ArticleHeader from "../components/ArticleHeader";
import ContentPreview from "../components/ContentPreview";
import ButtonReadmore from "../components/buttons/ButtonReadmore";

class ArticlePreview extends Component {
    constructor(props) {
        super(props);
        this.state = { articleId: this.props.article.articleId, headerData: this.props.article.headerData, content: this.props.article.content};
      }

    
  render() {
    return (
      <article>
        <ArticleHeader headerData={this.state.headerData}/>
        <ContentPreview content={this.state.content}/>
        <ButtonReadmore articleId={this.state.articleId} />
    </article>
    )
  }
}


export default ArticlePreview;