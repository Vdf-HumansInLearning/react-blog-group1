import { Component } from "react";
import Toast from "../components/Toast";

class AddArticleModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      title: "",
      tag: "",
      author: "",
      date: "",
      imgUrl: "",
      saying: "",
      frontContent: [],
      content: "",
      isModalClicked: props.isModalClicked,
      isEditModalClicked: props.isEditModalClicked,
    };
    this.addEditArticle = this.addEditArticle.bind(this);
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeTag = this.handleChangeTag.bind(this);
    this.handleChangeAuthor = this.handleChangeAuthor.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleChangeImgUrl = this.handleChangeImgUrl.bind(this);
    this.handleChangeSaying = this.handleChangeSaying.bind(this);
    this.handleChangeContent = this.handleChangeContent.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  resetForm() {
    this.setState({
      ...this.state,
      id: null,
      title: "",
      tag: "",
      author: "",
      date: "",
      imgUrl: "",
      saying: "",
      frontContent: [],
      content: "",
    });
  }

  addEditArticle() {
    const self = this;
    let content = this.state.content.split(/\r?\n/);
    let frontContent = [content[0]];
    console.log(content);
    console.log(frontContent);
    const obj = {
      id: null,
      title: this.state.title,
      tag: this.state.tag,
      author: this.state.author,
      date: this.state.date,
      imgUrl: this.state.imgUrl,
      saying: this.state.saying,
      frontContent: frontContent,
      content: content,
    };

    if (this.props.articleToEdit === null) {
      if (
        this.state.title &&
        this.state.tag &&
        this.state.author &&
        this.state.date &&
        this.state.imgUrl &&
        this.state.saying &&
        this.state.frontContent &&
        this.state.content
      ) {
        fetch("http://localhost:3007/articles", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        })
          .then(function (response) {
            response.json().then(function (data) {
              self.resetForm();
              self.props.hideModal();
              self.props.getArticleList();
              self.props.showToast();
            });
          })
          .catch(function (err) {
            console.log("Fetch Error :-S", err);
          });
      } else {
        console.log("Please complete all fields");
      }
    } else {
      fetch("http://localhost:3007/articles/" + this.props.articleToEdit.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      })
        .then(function (response) {
          // Examine the text in the response
          response.json().then(function (data) {
            self.resetForm();
            self.props.hideModal();
            // <Toast />;
            self.props.getArticleList();
          });
        })
        .catch(function (err) {
          console.log("Fetch Error :-S", err);
        });
    }
  }

  handleChangeTitle(event) {
    this.setState({ title: event.target.value });
  }
  handleChangeTag(event) {
    this.setState({ tag: event.target.value });
  }
  handleChangeAuthor(event) {
    this.setState({ author: event.target.value });
  }
  handleChangeDate(event) {
    this.setState({ date: event.target.value });
  }
  handleChangeImgUrl(event) {
    this.setState({ imgUrl: event.target.value });
  }
  handleChangeSaying(event) {
    this.setState({ saying: event.target.value });
  }
  handleChangeContent(event) {
    this.setState({ content: event.target.value });
  }

  componentDidMount() {
    this.resetForm();
    if (this.props.articleToEdit)
      this.setState({
        ...this.state,
        title: this.props.articleToEdit.title,
        tag: this.props.articleToEdit.tag,
        author: this.props.articleToEdit.author,
        date: this.props.articleToEdit.date,
        imgUrl: this.props.articleToEdit.imgUrl,
        saying: this.props.articleToEdit.saying,
        content: this.props.articleToEdit.content.join("\n"),
      });
  }

  render() {
   
    if (this.state.isModalClicked || this.state.isEditModalClicked) {
      return (
        <div className="modal__overlay">
          
          <div className="add-modal">
            <div className="modal__content">
              <h2 className="title modal-title">Add/Edit Article</h2>
              <div className="inputs__container">
              <Toast />
                <input
                  value={this.state.title}
                  onChange={this.handleChangeTitle}
                  type="text"
                  className="input margin"
                  id="title"
                  placeholder="Please enter title"
                ></input>
                <input
                  value={this.state.tag}
                  onChange={this.handleChangeTag}
                  type="text"
                  className="input"
                  id="tag"
                  placeholder="Please enter tag"
                ></input>
                <input
                  value={this.state.author}
                  onChange={this.handleChangeAuthor}
                  type="text"
                  className="input margin"
                  id="author"
                  placeholder="Please enter author"
                ></input>
                <input
                  value={this.state.date}
                  onChange={this.handleChangeDate}
                  type="text"
                  className="input"
                  id="date"
                  placeholder="Please enter date"
                ></input>
                <input
                  value={this.state.imgUrl}
                  onChange={this.handleChangeImgUrl}
                  type="text"
                  className="input margin"
                  id="url"
                  placeholder="Please enter image url"
                ></input>
                <input
                  value={this.state.saying}
                  onChange={this.handleChangeSaying}
                  type="text"
                  className="input"
                  id="saying"
                  placeholder="Please enter saying"
                ></input>
              </div>
              <textarea
                value={this.state.content}
                onChange={this.handleChangeContent}
                className="textarea"
                id="textarea"
                name="content"
                cols="28"
                rows="7"
                placeholder="Please enter content"
              ></textarea>
              <div className="modal__buttons">
                <button
                  type="button"
                  className="button close-modal"
                  onClick={this.props.hideModal}
                >
                  Cancel
                </button>
                {this.props.isModalClicked ? (
                  <button
                    type="button"
                    className="button button--pink"
                    onClick={this.addEditArticle}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={this.addEditArticle}
                    type="button"
                    className="button button--pink"
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default AddArticleModal;
