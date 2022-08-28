import React, { Component } from "react";
import { useState } from "react";
import Container, { Button, Typography } from '@mui/material';
import axios from "axios";
import { Progress } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Alert from "@mui/material/Alert";

import { useLocation, Link as RouterLink } from "react-router-dom";

import RequestService from "../components/requests/request.service";

export default function CertifyDocument() {
  const location = useLocation();
  const student_name = location.state.student_name;
  const referenceId = location.state.student_number;
  const request_id = location.state.id;

  const [selectedFile, setSelectedFile] = useState(null);
  const [loaded, setLoaded] = useState(null);

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
  const checkMimeType = (event) => {
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
  const checkFileSize = (event) => {
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

  const onChangeHandler = event => {
    var files = event.target.files

    if (checkMimeType(event) && checkFileSize(event)) {
      setSelectedFile(event.target.files[0]);
    }
    console.log(event.target.files[0])
  }

  const onClickHandler = () => {
    const data = new FormData()
    data.append('file', selectedFile);
    data.append('referenceId', referenceId);

    axios.post("http://localhost:8080/upload", data, {

      onUploadProgress: ProgressEvent => {
        setLoaded((ProgressEvent.loaded / ProgressEvent.total * 100));
      },

    })
      .then(res => {
        // Gets request matching the student number and then updates the status of the request to 'Certified'
        RequestService.get(referenceId)
          .then(response =>{
              var data = {
                request_id: response.data.request_id,
                student_name: response.data.student_name,
                document_type: response.data.document_type,
                student_number: referenceId,
                status: 1 // Setting request status to 1 after successful upload of document { 0: 'Pending', 1: 'Certified' }
              }
              RequestService.update(request_id, data)
              .then(response =>{
                  console.log(response.data)
              })
          })
        toast.success('upload success', { delay:4000 });
        console.log(res.statusText)
      })
      .catch(err => {
        toast.error('Upload fail')
      })
  }

    return (
      <>
      <Button component={RouterLink} to="/dashboard/requests">Back</Button>
      <form action="/upload" method="post" encType="multipart/form-data">
      <div className="container">
        <div className="row">
          <div className="offset-md-3 col-md-6">
            <Typography>
              Request ID: {request_id}
            </Typography>
            <Typography>
              Name : {student_name}
            </Typography>
            <Typography>
              Document Type: Bachelors
            </Typography>
            <Alert severity="info"><Typography><b>Supported file formats</b>: png, jpeg, pdf. <b> Max File size</b>: 2MB</Typography></Alert>
            <br/>
            <div className="form-group files">
              <label>Upload File </label>
              <input type="file" name="file" className="form-control" multiple onChange={onChangeHandler} required={true}/><br/>
              <label>Reference Number</label>
              <input type="text" name="referenceId" className="form-control" value={referenceId} disabled={true}/>
            </div>
            <div className="form-group">
              <br />
              <ToastContainer />
              <Progress max="100" color="success" value={loaded}>{Math.round(loaded, 2)}%</Progress>
            </div>
            <br />
            <div>
              <button type="button" className="btn btn-primary btn-block" disabled={ selectedFile == null ? true: false } onClick={onClickHandler}>Certify</button>
            </div>
          </div>
        </div>
      </div>
      </form>
      </>
    );
}