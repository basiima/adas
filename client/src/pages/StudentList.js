import React, { Component } from "react";
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
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
  TableHead,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  TextField,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, IconButton, Tooltip, ListItem,TableSortLabel
  } from '@mui/material';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import SearchIcon from '@mui/icons-material/Search';
import Label from '../components/Label';
import SearchNotFound from '../components/SearchNotFound';
import StudentService from "../components/student/student.service";
import { UserMoreMenu, UserListHead } from "../sections/@dashboard/user";
import USERLIST from '../_mock/user';

class StudentList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrieveStudents = this.retrieveStudents.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveStudent = this.setActiveStudent.bind(this);
    //   this.removeAllStudents = this.removeAremoveAllStudentsllTutorials.bind(this);
    this.searchStudent = this.searchStudent.bind(this);
    this.state = {
      students: [],
      currentStudent: null,
      currentIndex: -1,
      searchStudent: ""
    };
  }

  componentDidMount() {
    this.retrieveStudents();
  }

  onChangeSearchName(e) {
    const searchStudent = e.target.value;
    this.setState({
      searchStudent
    });
  }

  setActiveStudent(student, index) {
    this.setState({
      currentStudent: student,
      currentIndex: index
    });
  }

  refreshList() {
    this.retrieveStudents();
    this.setState({
      currentStudent: null,
      currentIndex: -1
    });
  }

  retrieveStudents() {
    StudentService.getAll()
      .then(response => {
        this.setState({
          students: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchStudent() {
    StudentService.findByName(this.state.searchStudent)
      .then(response => {
        this.setState({
          students: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchStudent, students, currentStudent, currentIndex } = this.state;
    
    return (

      <div>
        {/* <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search> */}
          
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">ID</TableCell>
              <TableCell align="left">Student Number</TableCell>
              <TableCell align="left">Student Name</TableCell>
              <TableCell align="left">User Name</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Phone</TableCell>
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students && students.map((student) => (
              <TableRow key={student.number}>
                <TableCell align="left">{student.id}</TableCell>
                <TableCell align="left">
                  {student.student_number}
                </TableCell>
                <TableCell align="left">{student.student_name}</TableCell>
                <TableCell align="left">{student.username}</TableCell>
                <TableCell align="left">{student.email}</TableCell>
                <TableCell align="left">{student.phone}</TableCell>
                <TableCell align="left">
                  <IconButton aria-label="edit">
                    <ModeEditOutlineOutlinedIcon color="info" />
                  </IconButton>
                  <IconButton aria-label="delete">
                    <DeleteOutlineOutlinedIcon color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
              
            ))}
          </TableBody>
        </Table>

      </div>
    );
  }
}

export default StudentList