import React, { Component } from 'react';

class DeleteModal extends Component {
    constructor(props) {
        super(props)
        this.state = {isDeleteModalClicked: props.isDeleteModalClicked}
        
    }
    render() {
        if(this.state.isDeleteModalClicked) {

    return(
        <div id="modal-alert" className="modal__overlay__alert">

            <div id="div-modal-alert" className="delete-modal-alert">
                <div className="modal-content">
                    <div className="alert-container">
                        <h1 className="alert-title">Delete Article</h1>
                        <p className="alert-delete-p">Are you sure you want to delete this article?</p>
                        <div className="clearfix">
                            <button type="button" className="button cancel-alert-button" onClick={this.props.hideDeleteModal}>Cancel</button>
                            <button type="button" className="delete-alert-button" onClick={this.props.deleteArticle}>Delete</button>
                        </div>
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

export default DeleteModal;