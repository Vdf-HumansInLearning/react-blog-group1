import { Component } from "react";

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
      isAddModalClicked: props.isAddModalClicked,
      isEditModalClicked: props.isEditModalClicked,
    };

    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeTag = this.handleChangeTag.bind(this);
    this.handleChangeAuthor = this.handleChangeAuthor.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleChangeImgUrl = this.handleChangeImgUrl.bind(this);
    this.handleChangeSaying = this.handleChangeSaying.bind(this);
    this.handleChangeContent = this.handleChangeContent.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.setErrorFor = this.setErrorFor.bind(this);
    this.setSuccessFor = this.setSuccessFor.bind(this);
    this.checkInputs = this.checkInputs.bind(this);
    this.validateArticle = this.validateArticle.bind(this);
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
    if (this.props.articleToEdit) {
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
    } else {
      let today = new Date();
      this.setState({
        date:
          today.toLocaleString("default", {
            month: "long",
          }) +
          " " +
          today.getDate() +
          ", " +
          today.getFullYear(),
      });
    }
  }

  validateArticle() {
    let content = this.state.content.split(/\r?\n/);
    let frontContent = [content[0]];
    let upperCaseLetter = /([A-Z]{1})([a-z]+)(\s)([A-Z]{1})([a-z]+){1}(|\s)$/g;
    let regexJpg = /\.(jpe?g|png|gif|bmp)$/i;

    const article = {
      id: this.props.articleToEdit ? this.props.articleToEdit.id : null,
      title: this.state.title,
      tag: this.state.tag,
      author: this.state.author,
      date: this.state.date,
      imgUrl: this.state.imgUrl,
      saying: this.state.saying,
      frontContent: frontContent,
      content: content,
    };

    this.checkInputs();
    if (
      this.state.title &&
      this.state.tag &&
      this.state.author &&
      this.state.date &&
      this.state.imgUrl &&
      this.state.saying &&
      this.state.frontContent &&
      this.state.content &&
      upperCaseLetter.test(this.state.author) &&
      regexJpg.test(this.state.imgUrl)
    ) {
      if (this.props.isAddModalClicked) {
        this.props.addArticle(article);
      } else {
        this.props.editArticle(article);
      }
    }
  }

  checkInputs() {
    let upperCaseLetter = /([A-Z]{1})([a-z]+)(\s)([A-Z]{1})([a-z]+){1}(|\s)$/g;
    let regexJpg = /\.(jpe?g|png|gif|bmp)$/i;

    const title = this.state.title.trim();
    const tag = this.state.tag.trim();
    const author = this.state.author.trim();
    const imgUrl = this.state.imgUrl.trim();
    const saying = this.state.saying.trim();
    const textarea = this.state.content.trim();

    const titleInput = document.getElementById("title");
    const tagInput = document.getElementById("tag");
    const authorInput = document.getElementById("author");
    const imgUrlInput = document.getElementById("url");
    const sayingInput = document.getElementById("saying");
    const textareaInput = document.getElementById("textarea");

    if (title === "") {
      this.setErrorFor(titleInput, "Please insert a title!");
    } else {
      this.setSuccessFor(titleInput);
    }

    if (tag === "") {
      this.setErrorFor(tagInput, "Please insert a tag!");
    } else {
      this.setSuccessFor(tagInput);
    }

    if (author === "") {
      this.setErrorFor(authorInput, "Please insert an author!");
    } else if (!upperCaseLetter.test(author)) {
      this.setErrorFor(
        authorInput,
        "Please use capital letters for the author's first and last name!"
      );
    } else {
      this.setSuccessFor(authorInput);
    }

    if (imgUrl === "") {
      this.setErrorFor(imgUrlInput, "Please insert an image!");
    } else if (!regexJpg.test(imgUrl)) {
      this.setErrorFor(
        imgUrlInput,
        "Please insert an image with jpg/jpeg/png/bmp/gif extension!"
      );
    } else {
      this.setSuccessFor(imgUrlInput);
    }

    if (saying === "") {
      this.setErrorFor(sayingInput, "Please insert a saying!");
    } else {
      this.setSuccessFor(sayingInput);
    }

    if (textarea === "") {
      this.setErrorFor(textareaInput, "Please insert a content!");
    } else {
      this.setSuccessFor(textareaInput);
    }
  }

  setErrorFor(input, message) {
    const formField = input.parentElement;
    const small = formField.querySelector("small");
    small.innerText = message;

    formField.className = "form-field fail";
  }

  setSuccessFor(input) {
    const formField = input.parentElement;
    formField.className = "form-field success";
  }

  render() {
    return (
      <div className="modal__overlay">
        <div className="add-modal">
          <div className="modal__content">
            <h2 className="title modal-title">Add/Edit Article</h2>
            <div className="inputs__container">
              <div className="form-field">
                <input
                  value={this.state.title}
                  onChange={this.handleChangeTitle}
                  type="text"
                  className="input margin"
                  id="title"
                  placeholder="Please enter title"
                ></input>
                <i className="fa-solid fa-circle-check"></i>
                <i className="fa-solid fa-circle-exclamation"></i>
                <small></small>
              </div>
              <div className="form-field">
                <input
                  value={this.state.tag}
                  onChange={this.handleChangeTag}
                  type="text"
                  className="input"
                  id="tag"
                  placeholder="Please enter tag"
                ></input>
                <i className="fa-solid fa-circle-check"></i>
                <i className="fa-solid fa-circle-exclamation"></i>
                <small></small>
              </div>
              <div className="form-field">
                <input
                  value={this.state.author}
                  onChange={this.handleChangeAuthor}
                  type="text"
                  className="input margin"
                  id="author"
                  placeholder="Please enter author"
                ></input>
                <i className="fa-solid fa-circle-check"></i>
                <i className="fa-solid fa-circle-exclamation"></i>
                <small></small>
              </div>
              <input
                value={this.state.date}
                onChange={this.handleChangeDate}
                type="text"
                className="input"
                id="date"
                placeholder="Please enter date"
              ></input>
              <div className="form-field">
                <input
                  value={this.state.imgUrl}
                  onChange={this.handleChangeImgUrl}
                  type="text"
                  className="input margin"
                  id="url"
                  placeholder="Please enter image url"
                ></input>
                <i className="fa-solid fa-circle-check"></i>
                <i className="fa-solid fa-circle-exclamation"></i>
                <small></small>
              </div>
              <div className="form-field">
                <input
                  value={this.state.saying}
                  onChange={this.handleChangeSaying}
                  type="text"
                  className="input"
                  id="saying"
                  placeholder="Please enter saying"
                ></input>
                <i className="fa-solid fa-circle-check"></i>
                <i className="fa-solid fa-circle-exclamation"></i>
                <small></small>
              </div>
            </div>
            <div className="form-field">
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
              <i className="fa-solid fa-circle-check textarea-icon"></i>
              <i className="fa-solid fa-circle-exclamation textarea-icon"></i>
              <small className="textarea-small"></small>
            </div>
            <div className="modal__buttons">
              <button
                type="button"
                className="button close-modal"
                onClick={this.props.hideModal}
              >
                Cancel
              </button>
              {this.props.isAddModalClicked ? (
                <button
                  type="button"
                  className="button button--pink"
                  onClick={this.validateArticle}
                >
                  Save
                </button>
              ) : (
                <button
                  type="button"
                  className="button button--pink"
                  onClick={this.validateArticle}
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddArticleModal;
