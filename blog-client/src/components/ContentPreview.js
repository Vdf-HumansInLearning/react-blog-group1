import React from "react";

function ContentPreview({content}) {
    const contentList = content.map((item, index) => (
        <p key={index}>{item}</p>
      ));

    return (
        <div className="content__container">
         {contentList}
        </div>
    );
}

export default ContentPreview;
