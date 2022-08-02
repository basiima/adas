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
import DocumentsService from "../components/documents/documents.service";
import { UserMoreMenu, UserListHead } from "../sections/@dashboard/user";
import USERLIST from '../_mock/user';
import Scrollbar from "../components/Scrollbar";

class StudentIndex extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrieveDocuments = this.retrieveDocuments.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.searchDocuments = this.searchDocuments.bind(this);
    this.state = {
      documents: [],
      currentDocuments: null,
      currentIndex: -1,
      searchDocuments: ""
    };

  }

  componentDidMount() {
    this.retrieveDocuments();
  }

  onChangeSearchName(e) {
    const searchDocuments = e.target.value;
    this.setState({
      searchDocuments
    });
  }

  setActiveDocuments(documents, index) {
    this.setState({
      currentDocuments: documents,
      currentIndex: index
    });
  }

  refreshList() {
    this.retrieveDocuments();
    this.setState({
      currentDocuments: null,
      currentIndex: -1
    });
  }

  retrieveDocuments() {
    DocumentsService.getAll()
      .then(response => {
        this.setState({
          documents: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchDocuments() {
    DocumentService.findByName(this.state.searchDocuments)
      .then(response => {
        this.setState({
          documents: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }


  render() {
    const { searchDocuments, documents, currentDocuments, currentIndex } = this.state;

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
        <Scrollbar>
        <TableContainer sx={{ minWidth: 800 }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">ID</TableCell>
              <TableCell align="left">Document Type</TableCell>
              <TableCell align="left">Key</TableCell>
              <TableCell align="left">Date Hashed</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {documents && documents.map((documents) => (
              <TableRow key={documents.number}>
                <TableCell align="left">{documents.id}</TableCell>
                <TableCell align="left"> {documents.type} </TableCell>
                <TableCell align="left">{documents.key}</TableCell>
                <TableCell align="left">{documents.date}</TableCell>
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
        </TableContainer>
        </Scrollbar>
        <TablePagination
            rowsPerPageOptions={[5, 10, 25]} 
            count={documents.length}
            component="div"
        />

      </div>
    );
  }
}

export default StudentIndex