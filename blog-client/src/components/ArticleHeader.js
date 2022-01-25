import React from "react";

function ArticleHeader({headerData}) {
    return (
        <div>
            <h2 className="title">
                {headerData.title}
            </h2>
            <ul className="info__container">
                <li className="info__item">
                    {headerData.tag}
                </li>
                <li className="info__item">
                    Added by &nbsp;
                    <span className="info__mark point">
                        {headerData.author}
                    </span>
                </li>
                <li className="info__item">
                    {headerData.date}
                </li>
            </ul>
            <div className="actions__container">
                <button type="button" className="actions__btn border">Edit</button>
                <button type="button" className="actions__btn">Delete</button>
            </div>
            <img src={headerData.imgUrl} alt="figure" />
        </div>
    );
}

export default ArticleHeader;
