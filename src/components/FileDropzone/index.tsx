import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

class FileDropZone extends Component {
  onDrop = (acceptedFiles: File[]) => {
    console.log('acceptedFiles', acceptedFiles);
    acceptedFiles.forEach((file: Blob) => {
      const reader = new FileReader();
      reader.onload = () => {
        const fileAsBinaryString = reader.result;
        console.log(fileAsBinaryString);
      };
      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');

      reader.readAsBinaryString(file);
    });
  };

  render() {
    return <Dropzone onDrop={this.onDrop} />;
  }
}

export default FileDropZone;
