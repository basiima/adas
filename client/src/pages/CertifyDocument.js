import React, { Component } from "react";
import { useState } from "react";
import Container, { Button, Typography, Tooltip, FormControl, Dialog, DialogTitle, IconButton, Grid } from '@mui/material';
import axios from "axios";
import { Progress } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";

import { useLocation, Link as RouterLink, useNavigate } from "react-router-dom";

import RequestService from "../components/requests/request.service";
import DocumentService from "../components/document/document.service";

import storage from '../firebaseconfig';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"

import Slide from '@mui/material/Slide';

import SHA from 'crypto-js/sha256';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CertifyDocument() {
  const navigate = useNavigate();
  const location = useLocation();
  const student_name = location.state.student_name;
  const referenceId = location.state.student_number;
  const request_id = location.state.id;

  const [stRef, setRef] = useState(referenceId);
  const [stName, setStName] = useState(student_name);
  const [reqId, setReqId] = useState(request_id);
  const [docType, setDocType] = useState("Bachelors");

  // State to store uploaded file
  const [file, setFile] = useState(null);
  const [fileURL, setFileURL] = useState(null);

  const [docHashValue, setDocHashValue] = useState('');

  // progress
  const [percent, setPercent] = useState(0);

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

  // Handle file upload event and update state
  function handleChange(event) {
    if (checkMimeType(event) && checkFileSize(event)) {
      setFile(event.target.files[0]);
      console.log(event.target.files[0])
      setFileURL(URL.createObjectURL(event.target.files[0]));
    }
  }

  const handleUpload = () => {

    const storageRef = ref(storage, `/files/${file.name}`);

    const file_name = file.name
    const document_hash = SHA(file_name).toString();

    // progress can be paused and resumed. It also exposes progress updates.
    // Receives the storage reference and the file to upload.
    const uploadTask = uploadBytesResumable(storageRef, file);

    const document_data = {
      document_file: file_name,
      document_hash: document_hash,
      referenceId: referenceId
    }

    DocumentService.create(document_data)
      .then(response => {
        setDocHashValue(response.data.document_hash);
          console.log(response.data)
          RequestService.get(response.data.referenceId)
          .then(response =>{
              var data = {
                request_id: response.data.request_id,
                student_name: response.data.student_name,
                document_type: response.data.document_type,
                student_number: response.data.referenceId,
                status: 1 // Setting request status to 1 after successful upload of document { 0: 'Pending', 1: 'Certified' }
              }
              RequestService.update(request_id, data)
              .then(response =>{
                  console.log(response.data)
              })
          })
      }).catch(e => {
                console.log(e);
            });

    uploadTask.on(
      "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );

                // update progress
                setPercent(percent);
            },
            (err) => console.log(err),
            () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                  toast.success('Certification success', { delay:3000 });
                    console.log(url);
                  setRef('');
                  setStName('');
                  setDocType('');
                  setDocHashValue('');
                  setReqId('');
                  setFile(null);
                });
            }
        );

  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    return (
      <>
      <Button component={RouterLink} to="/dashboard/requests">Back</Button>
      <form action="/upload" method="post" encType="multipart/form-data">
      <div className="container">
        <div className="row">
          <div className="offset-md-3 col-md-6">
            <Typography>
              Request ID: {reqId}
            </Typography>
            <Typography>
              Name : {stName}
            </Typography>
            <Typography>
              Document Type: {docType}
            </Typography>
            <Alert severity="info"><Typography><b>Supported file formats</b>: png, jpeg, pdf. <b> Max File size</b>: 2MB</Typography></Alert>
            <br/>
            <div className="form-group files">
              <label>Upload File </label>
              <input type="file" name="file" className="form-control" onChange={handleChange} required={true}/><br/>
              <label>Reference Number</label>
              <input type="text" name="referenceId" className="form-control" value={stRef} disabled={true}/>
            </div>
            <div className="form-group">
              <br />
              <ToastContainer />
              {/* <embed src={fileURL} type="application/pdf"/> */}
              <Button onClick={handleClickOpen}>
              Preview Document
            </Button>
              <Dialog open={open} onClose={handleClose} fullScreen TransitionComponent={Transition}>
                <DialogTitle>
                    <Typography variant="div">
                      Document Preview
                    </Typography>
                    <Tooltip title="Close Preview">
                      <IconButton onClick={() => setOpen(false)} style={{ marginLeft: '350px' }} variant="container">
                        <CloseIcon color='error' />
                      </IconButton>
                    </Tooltip>
                </DialogTitle>
                {/* <embed src={fileURL} type="application/pdf"/> */}
                <iframe src={fileURL} height={700}></iframe>
              </Dialog>
            <br/><br/>
              {/* <p>{percent} % done</p> */}
              <Progress max="100" color="success" value={percent}>{Math.round(percent, 2)}%</Progress>
            </div>
            <br />
            <p>
              Document Hash: {docHashValue}
            </p>
            <div>
              <button type="button" className="btn btn-primary btn-block" disabled={ file == null ? true: false } onClick={handleUpload}>Certify</button>
            </div>
          </div>
        </div>
      </div>
      </form>
      </>
    );
}
