import React, { useState } from "react";

import {
    Button,
    TextField,
    DialogActions, DialogContent,DialogContentText,DialogTitle, FormControl,
  } from '@mui/material';
  
import Autorenew from '@mui/icons-material/Autorenew';
import SaveIcon from '@mui/icons-material/Save';

import StudentService from "./student.service"

function AddStudent(){
   const [student_name, setStudentName] = useState('');
   const [student_number, setStudentNumber] = useState('');
   const [username, setUserName] = useState('');
   const [email, setEmail] = useState('');
   const [phone, setPhone] = useState('');

   const onChangeName = e => {
        setStudentName(e.target.value);
   };

   const onChangeStudentNumber = e => {
        setStudentNumber(e.target.value);
   };

   const onChangeUserName = e => {
        setUserName(e.target.value);
   };

   const onChangeEmail = e => {
        setEmail(e.target.value);
   };

   const onChangePhone = e => {
        setPhone(e.target.value);
   };

   // Sends student details to the api that posts students details to the database
   const saveStudent = () => {
    const data = {
        student_name: student_name,
        student_number: student_number,
        username: username,
        email: email,
        phone: phone,
    };

    StudentService.create(data)
        .then(response => {
            setStudentName(response.data.student_name);
            setStudentNumber(response.data.student_number);
            setUserName(response.data.username);
            setEmail(response.data.email);
            setPhone(response.data.phone);
            newStudent();
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    };

    // Resets the student details on the form
    const newStudent = () => {
        setStudentName('');
        setStudentNumber('');
        setUserName('');
        setEmail('');
        setPhone('');
    };

    return(
        <DialogContent>
            <DialogContentText>
            Please Enter Student Details
            </DialogContentText>
            
            <TextField
            margin="dense"
            id="studentNumber"
            label="Student Number"
            type="text"
            fullWidth
            variant="standard"
            value={student_number}
            onChange={onChangeStudentNumber}
            />
            
            <TextField
            margin="dense"
            id="studentName"
            label="Student Name"
            type="text"
            fullWidth
            variant="standard"
            value={student_name}
            onChange={onChangeName}
            />

            <TextField
            margin="dense"
            id="userName"
            label="User Name"
            type="text"
            fullWidth
            variant="standard"
            value={username}
            onChange={onChangeUserName}
            />

            <TextField
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={email}
            onChange={onChangeEmail}
            />

            <TextField
            margin="dense"
            id="phoneNumber"
            label="Phone Number"
            type="tel"
            fullWidth
            variant="standard"
            value={phone}
            onChange={onChangePhone}
            />
            
            <DialogActions>
                <Button variant="contained" onClick={newStudent} color="warning" startIcon={<Autorenew/>}>Reset</Button>
                <Button variant="contained" onClick={saveStudent} startIcon={<SaveIcon/>} >Save</Button>
            </DialogActions>
        </DialogContent>          
    );

}

export default AddStudent;