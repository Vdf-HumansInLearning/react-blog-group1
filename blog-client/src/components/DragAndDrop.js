import React, { useState, useEffect, useRef } from 'react';


function DragAndDrop({ handleChangeImgUrl }) {

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [validFiles, setValidFiles] = useState([]);
  const [unsupportedFiles, setUnsupportedFiles] = useState([]);
  const fileInputRef = useRef();

  const dragOver = (e) => {
    e.preventDefault();
  }

  const dragEnter = (e) => {
    e.preventDefault();
    console.log("drag enter");
  }

  const dragLeave = (e) => {
    e.preventDefault();
    console.log("drag leave");
  }

  const fileInputClicked = () => {
    fileInputRef.current.click();
  }

  const fileDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length) {
      handleFiles(files);
    }
  }

  const validateFile = (file) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/x-icon'];
    if (validTypes.indexOf(file.type) === -1) {
      return false;
    }
    return true;
  }

  const handleFiles = (files) => {
    for (let i = 0; i < files.length; i++) {
      if (validateFile(files[i])) {
        // add to an array so we can display the name of file
        setSelectedFiles(() => [files[i]]);
        handleChangeImgUrl(files[i].name);
      } else {
        // add a new property called invalid
        files[i]['invalid'] = true;
        // add to the same array so we can display the name of the file
        setSelectedFiles(() => [files[i]]);
        // set error message
        setUnsupportedFiles(() => [files[i]]);
      }
    }
  }

  const fileSize = (size) => {
    if (size === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(size) / Math.log(k));
    return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  const fileType = (fileName) => {
    return fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length) || fileName;
  }

  const filesSelected = () => {
    if (fileInputRef.current.files.length < 2) {
      handleFiles(fileInputRef.current.files);
    }
    else {
      return;
    }
  }

  useEffect(() => {
    let filteredArray = selectedFiles.reduce((file, current) => {
      const x = file.find(item => item.name === current.name);
      if (!x) {
        return file.concat([current]);
      } else {
        return file;
      }
    }, []);
    setValidFiles([...filteredArray]);

  }, [selectedFiles]);

  const removeFile = (name) => {
    console.log("delete")
    const validFileIndex = validFiles.findIndex(e => e.name === name);
    validFiles.splice(validFileIndex, 1);
    // update validFiles array
    setValidFiles([...validFiles]);
    const selectedFileIndex = selectedFiles.findIndex(e => e.name === name);
    selectedFiles.splice(selectedFileIndex, 1);
    // update selectedFiles array
    setSelectedFiles([...selectedFiles]);

    const unsupportedFileIndex = unsupportedFiles.findIndex(e => e.name === name);
    if (unsupportedFileIndex !== -1) {
      unsupportedFiles.splice(unsupportedFileIndex, 1);
      // update unsupportedFiles array
      setUnsupportedFiles([...unsupportedFiles]);
    }
  }

  return (
    <>
      <div className="container" id="url">
        <div className="drop-container success"
          onDragOver={dragOver}
          onDragEnter={dragEnter}
          onDragLeave={dragLeave}
          onDrop={fileDrop}
          onClick={fileInputClicked}>
          {validFiles.length === 0 ?
            <><div className="upload-icon"></div><p className='img-text'>Please add an image</p></>
            : <p className='img-name'>{validFiles[0].name}</p>
          }
        </div>

        <input
          ref={fileInputRef}
          className="file-input"
          type="file"
          multiple
          onChange={filesSelected}
        />
      </div>
      <div className="file-display-container">
        {
          validFiles.map((data, i) =>
            <div className="file-status-bar" key={i}>
              <div className={`form-field ${data.invalid ? 'fail' : 'success'}`}>
                {data.invalid && data.invalid === true ? ''
                  : <>
                    <div className="file-type-logo"></div>
                    <span className="file-type">{fileType(data.name)}</span>
                    <span className={`file-name ${data.invalid ? 'file-error' : ''}`}>
                      {data.name}
                    </span>
                  </>
                }
                <span className="file-size">
                  {data.invalid && data.invalid === true
                    ? ''
                    : (fileSize(data.size))
                  }
                </span>

                {data.invalid && data.invalid === true
                  ? <small className={`${data.invalid ? 'attachImg ' : ''}`}
                  >
                    Please insert a valid file!</small>
                  : <small></small>
                }
              </div>
              {data.invalid && data.invalid === true ? ''
                : <div className="file-remove" onClick={() => removeFile(data.name)}>X</div>
              }
            </div>
          )
        }
      </div>
    </>
  )
}

export default DragAndDrop;