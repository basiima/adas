import React, { Component } from "react";
import {
    Card,
    Table,
    Stack,
    Avatar,
    Button,
    Checkbox,
    TableRow,
    TableBody,
    TableCell,
    Container,
    Typography,
    TableContainer,
    TablePagination,
    TextField,
    Dialog, DialogActions, DialogContent,DialogContentText,DialogTitle, FormControl,
  } from '@mui/material';
import Autorenew from '@mui/icons-material/Autorenew';
import SaveIcon from '@mui/icons-material/Save';

import StudentService from "./student.service"

class AddStudent extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeStudentNumber = this.onChangeStudentNumber.bind(this);
        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.saveStudent = this.saveStudent.bind(this);
        this.newStudent = this.newStudent.bind(this);
        this.state = {
            id: "",
            student_name: "",
            student_number: "",
            username: "",
            email: "",
            phone: ""
        };
    }

    onChangeName(e) {
        this.setState({
            student_name: e.target.value
        });
    }

    onChangeStudentNumber(e) {
        this.setState({
            student_number: e.target.value
        });
    }

    onChangeUserName(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangePhone(e) {
        this.setState({
            phone: e.target.value
        });
    }

    saveStudent() {
        const data = {
            id: this.state.id,
            student_name: this.state.student_name,
            student_number: this.state.student_number,
            username: this.state.username,
            email: this.state.email,
            phone: this.state.phone,
        };
        StudentService.create(data)
            .then(response => {
                this.setState({
                    student_name: response.data.student_name,
                    student_number: response.data.student_number,
                    username: response.data.username,
                    email: response.data.email,
                    phone: response.data.phone,
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    newStudent() {
        this.setState({
            id: "",
            student_name: "",
            student_number: "",
            username: "",
            email: "",
            phone: "",
        });
    }

    render() {
        const { data } = this.state
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
                value={this.state.student_number}
                onChange={this.onChangeStudentNumber}
                />
                
                <TextField
                margin="dense"
                id="studentName"
                label="Student Name"
                type="text"
                fullWidth
                variant="standard"
                value={this.state.student_name}
                onChange={this.onChangeName}
                />
    
                <TextField
                margin="dense"
                id="userName"
                label="User Name"
                type="text"
                fullWidth
                variant="standard"
                value={this.state.username}
                onChange={this.onChangeUserName}
                />
    
                <TextField
                margin="dense"
                id="email"
                label="Email Address"
                type="email"
                fullWidth
                variant="standard"
                value={this.state.email}
                onChange={this.onChangeEmail}
                />
    
                <TextField
                margin="dense"
                id="phoneNumber"
                label="Phone Number"
                type="tel"
                fullWidth
                variant="standard"
                value={this.state.phone}
                onChange={this.onChangePhone}
                />
                
                <DialogActions>
                    <Button variant="contained" onClick={this.newStudent} color="warning" startIcon={<Autorenew/>}>Reset</Button>
                    <Button variant="contained" onClick={this.saveStudent} startIcon={<SaveIcon/>}>Save</Button>
                </DialogActions>
            </DialogContent>          
        );
    }
}

export default AddStudent