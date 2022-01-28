import React, { Component } from 'react';

class AddArticleModal extends Component {
    constructor(props) {
        super(props)
        this.state =
        {
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
            isEditModalClicked: props.isEditModalClicked
        }
    }

    addArticle() {
        const self = this;
        //let content = self.state.content.split(/\r?\n/);
        console.log("hhu")
        const obj = {
            id: null,
            title: this.state.title,
            tag: this.state.tag,
            author: this.state.author,
            date: this.state.date,
            imgUrl: this.state.imgUrl,
            saying: this.state.saying,
            frontContent: "",
            content: ""
        }

        if (this.state.id === null) {
            fetch("http://localhost:3007/articles", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(obj),
            })
                .then(function (response) {
                    // Examine the text in the response
                    response.json().then(function (data) {
                        //self.resetForm();
                        self.props.hideModal();
                        self.props.getArticleList();
                    });
                })
                .catch(function (err) {
                    console.log("Fetch Error :-S", err);
                });
        }
        // else {
        //     fetch("http://localhost:4000/dogs/" + this.state.dogsId, {
        //         method: "PUT",
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify(obj),
        //     })
        //         .then(function (response) {
        //             // Examine the text in the response
        //             response.json().then(function (data) {
        //                 self.resetForm();
        //                 self.getDogs();
        //             });
        //         })
        //         .catch(function (err) {
        //             console.log("Fetch Error :-S", err);
        //         });
        // }
    }

    render() {
        if (this.state.isModalClicked || this.state.isEditModalClicked) {
            return (
                <div className='modal__overlay'>
                    <div className="add-modal">
                        <div className="modal__content">
                            <h2 className="title modal-title">Add/Edit Article</h2>
                            <div className="inputs__container">
                                <input type="text" className="input margin" id="title" placeholder="Please enter title"></input>
                                <input type="text" className="input" id="tag" placeholder="Please enter tag"></input>
                                <input type="text" className="input margin" id="author" placeholder="Please enter author"></input>
                                <input type="text" className="input" id="date" placeholder="Please enter date"></input>
                                <input type="text" className="input margin" id="url" placeholder="Please enter image url"></input>
                                <input type="text" className="input" id="saying" placeholder="Please enter saying"></input>
                            </div>
                            <textarea className="textarea" id="textarea" name="content" cols="28" rows="7" placeholder="Please enter content"></textarea>
                            <div className="modal__buttons">
                                <button type="button" className="button close-modal" onClick={this.props.hideModal}>Cancel</button>
                                {this.props.isModalClicked
                                    ? <button type="button" className="button button--pink" onClick={this.addArticle}>Save</button>
                                    : <button type="button" className="button button--pink">Edit</button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return null;
        }
    }
}

export default AddArticleModal;