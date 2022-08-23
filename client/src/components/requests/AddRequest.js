import { useState, useEffect } from "react";
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { green } from '@mui/material/colors';
import { Button } from '@mui/material';

import AuthService from '../../services/auth.service';
import RequestService from './request.service';
import StudentService from "../student/student.service";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddRequest(){
    const loggedInUser = AuthService.getCurrentUser();
    const avatarInitial = loggedInUser.username.charAt(0).toUpperCase();
  //  console.log(loggedInUser);
    const loggedInUserName = loggedInUser.username;
   // console.log(loggedInUserName);
    const navigate = useNavigate();
    const docTypes = ['Bachelors', 'Masters', 'PhD'];
    const [student_name, setStudentName] = useState('');
    const [student_number, setStudentNumber] = useState('');
    const [document_type, setDocumentType] = useState('');

      // Trigger retrieve students function on load up
    useEffect(()=>{
        // setInterval(() => {
            findByUserName();
        // }, 50000);
    });

    const findByUserName = () => {
    StudentService.get(loggedInUserName)
        .then(response => {
            setStudentName(response.data.student_name);
            setStudentNumber(response.data.student_number);
        console.log(response.data.id);
        })
        .catch(e => {
        console.log(e);
        });
    }
       // Sends student details to the api that posts students details to the database
   const placeRequest = () => {
    const data = {
        student_name: student_name,
        student_number: student_number,
        document_type: docTypes[0],
    };

    RequestService.create(data)
        .then(response => {
            setStudentName(response.data.student_name);
            setDocumentType(response.data.document_type);
            toast.success(student_name + ': Your request has been placed successfully !');
            console.log(response.data);
        })
        .catch(e => {
            toast.error('Request failed !')
            console.log(e);
        });
    };

    // Setting current date 
    let currentDate = new Date();
    let dd = currentDate.getDate();
    let mm = currentDate.getMonth()+1; 
    let yyyy = currentDate.getFullYear();
    if(dd<10) 
    {
        dd='0'+dd;
    } 
    
    if(mm<10) 
    {
        mm='0'+mm;
    }

    currentDate = dd+'-'+mm+'-'+yyyy;

    return (
        <form>
            <Button component={RouterLink} to="/dashboard/requests">Back</Button>
      <Card sx={{ maxWidth: 500, marginLeft: 50 , height: 350}} variant='outlined'>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: green[500] }} aria-label="recipe">
              {avatarInitial}
            </Avatar>
          }
          title="Institution: Makerere University"
          subheader={`Date: ${currentDate}`}
        />
        {/* <CardMedia
          component="img"
          height="194"
          image="/static/images/cards/paella.jpg"
          alt="Paella dish"
        /> */}
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Select Document
          </Typography>
          <Typography paragraph>
                Bachelor of Science in Software Engineering
          </Typography>
          <Typography paragraph>
                Program: BSSE
          </Typography>
          <Typography paragraph>
                Intake: 2018
          </Typography>
        </CardContent>
        <CardActions disableSpacing sx={ {marginLeft: 23} }>
            <Button variant='contained' onClick={placeRequest}>
                Place Request
            </Button>
        </CardActions>
      </Card>
      <div>
        <ToastContainer/>
        </div>
      </form>
    );
}
export default AddRequest;