import React, { Component } from "react";
import Container, { Typography } from '@mui/material';
import axios from "axios";
import { Progress } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Alert from "@mui/material/Alert";

export default class CertifyDocument extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null
    }

  }

  /** Checking the number of files uploaded in a batch
   *  Limit is set to 3 files per upload
   */
  // maxSelectFile = (event) => {
  //   let files = event.target.files
  //   if (files.length > 3) {
  //     const msg = 'Only 3 images can be uploaded at a time'
  //     event.target.value = null
  //     console.log(msg)
  //     return false;
  //   }
  //   return true;

  // }

  /** Checking the file type
   *  Supported formats for ADAS are images[png, jpeg] & files[pdf]
   */
  checkMimeType = (event) => {
    let files = event.target.files
    let err = []
    const types = ['image/png', 'image/jpeg', 'application/pdf', 'application/doc']

    for (var x = 0; x < files.length; x++) {
      if (types.every(type => files[x].type !== type)) {
        err[x] = 'Unsupported file format\n\nUpload formats of: images(png, jpeg), pdf';
      }
    };

    // Displaying error message in react Toast component
    for (var z = 0; z < err.length; z++) {
      event.target.value = null
      toast.error(err[z])
    }
    return true;

  }

  /** Checking the maximum file upoad size
   *  The maximum upload size is set to 2MB
   */
  checkFileSize = (event) => {
    let files = event.target.files
    let size = 2000000
    let err = [];

    for (var x = 0; x < files.length; x++) {
      if (files[x].size > size) {
        err[x] = 'File is too large, Max size is 2MB\n';
      }
    };

    // Displaying error message in react Toast component
    for (var z = 0; z < err.length; z++) {
      toast.error(err[z])
      event.target.value = null
    }

    return true;

  }

  onChangeHandler = event => {
    var files = event.target.files

    if (this.checkMimeType(event) && this.checkFileSize(event)) {
      this.setState({
        selectedFile: event.target.files[0]
      })
    }
    console.log(event.target.files[0])
  }

  onClickHandler = () => {
    const data = new FormData()
      data.append('file', this.state.selectedFile)

    axios.post("http://localhost:8080/upload", data, {

      onUploadProgress: ProgressEvent => {
        this.setState({
          loaded: (ProgressEvent.loaded / ProgressEvent.total * 100),
        })
      },

    })
      .then(res => {
        toast.success('upload success')
        console.log(res.statusText)
      })
      .catch(err => {
        if(this.state.selectedFile == null){
          toast.error('Select a file to upload !')
        }
        toast.error('Upload fail')
      })
  }

  render() {
    return (
      <form action="/upload" method="post" encType="multipart/form-data">
      <div className="container">
        <div className="row">
          <div className="offset-md-3 col-md-6">
            <Alert severity="info"><Typography><b>Supported file formats</b>: png, jpeg, pdf. <b> Max File size</b>: 2MB</Typography></Alert>
            <br/>
            <div className="form-group files">
              <label>Upload File </label>
              <input type="file" name="file" className="form-control" multiple onChange={this.onChangeHandler} required={true}/>
            </div>
            <div className="form-group">
              <br />
              <ToastContainer />
              <Progress max="100" color="success" value={this.state.loaded}>{Math.round(this.state.loaded, 2)}%</Progress>
            </div>
            <br />
            <div>
              <button type="button" className="btn btn-primary btn-block" onClick={this.onClickHandler}>Upload</button>
            </div>
          </div>
        </div>
      </div>
      </form>
    );
  }
}