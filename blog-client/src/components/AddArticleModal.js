import React, { Component } from 'react';

class AddArticleModal extends Component {
    constructor(props) {
        super(props)
        this.state = {isModalClicked: props.isModalClicked}
        
    }
    render() {
        if(this.state.isModalClicked) {

    return(
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
                        ?  <button type="button" className="button button--pink">Save</button>
                        :   <button type="button" className="button button-edit-modal">Edit</button>
                        }  
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