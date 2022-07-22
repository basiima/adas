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

import CompanyService from "./company.service"

class AddCompany extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.saveCompany = this.saveCompany.bind(this);
        this.newCompany = this.newCompany.bind(this);
        this.state = {
            id: "",
            company_name: "",
            company_email: "",
            username: "",
        };
    }

    onChangeName(e) {
        this.setState({
            company_name: e.target.value
        });
    }

    onChangeUserName(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            company_email: e.target.value
        });
    }

    saveCompany() {
        const data = {
            id: this.state.id,
            company_name: this.state.company_name,
            company_email: this.state.company_email,
            username: this.state.username,
        };
        CompanyService.create(data)
            .then(response => {
                this.setState({
                    company_name: response.data.company_name,
                    company_email: response.data.company_email,
                    username: response.data.username,
                });
                this.setState({
                    id: "",
                    company_name: "",
                    company_email: "",
                    username: "",
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });

    }

    newCompany() {
        this.setState({
            id: "",
            company_name: "",
            company_email: "",
            username: "",
        });
    }

    render() {
        const { data } = this.state
        return(
            <DialogContent>
                <DialogContentText>
                Please Enter Company Details
                </DialogContentText>
                
                <TextField
                margin="dense"
                id="companyName"
                label="Company Name"
                type="text"
                fullWidth
                variant="standard"
                value={this.state.company_name}
                onChange={this.onChangeName}
                />
                
                <TextField
                margin="dense"
                id="companyEmail"
                label="Company Email"
                type="text"
                fullWidth
                variant="standard"
                value={this.state.company_email}
                onChange={this.onChangeEmail}
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
                
                <DialogActions>
                    <Button variant="contained" onClick={this.newCompany} color="warning" startIcon={<Autorenew/>}>Reset</Button>
                    <Button variant="contained" onClick={this.saveCompany} startIcon={<SaveIcon/>}>Save</Button>
                </DialogActions>
            </DialogContent>          
        );
    }
}

export default AddCompany