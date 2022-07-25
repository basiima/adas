import React, { Component, useState } from "react";
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

function AddCompany(){
    const [company_name, setCompanyName] = useState('');
    const [company_email, setCompanyEmail] = useState('');
    const [username, setUserName] = useState('');

    const onChangeName = e => {
        setCompanyName(e.target.value);
    };

    const onChangeEmail = e => {
        setCompanyEmail(e.target.value);
    };

    const onChangeUserName = e => {
        setUserName(e.target.value);
    };

    const saveCompany = () => {
        const data = {
            company_name: company_name,
            company_email: company_email,
            username: username,
        };
        CompanyService.create(data)
            .then(response => {
                setCompanyName(response.data.company_name);
                setCompanyEmail(response.data.company_email);
                setUserName(response.data.username);
                newCompany();
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const newCompany = () => {
        setCompanyName('');
        setCompanyEmail('');
        setUserName('');
    };

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
            value={company_name}
            onChange={onChangeName}
            />
            
            <TextField
            margin="dense"
            id="companyEmail"
            label="Company Email"
            type="text"
            fullWidth
            variant="standard"
            value={company_email}
            onChange={onChangeEmail}
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
            
            <DialogActions>
                <Button variant="contained" onClick={newCompany} color="warning" startIcon={<Autorenew/>}>Reset</Button>
                <Button variant="contained" onClick={saveCompany} startIcon={<SaveIcon/>}>Save</Button>
            </DialogActions>
        </DialogContent>          
    );
}

export default AddCompany;