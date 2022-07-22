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
import CompanyService from "../components/company/company.service";
import { UserMoreMenu, UserListHead } from "../sections/@dashboard/user";
import USERLIST from '../_mock/user';
import Scrollbar from "../components/Scrollbar";

class CompanyList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrieveCompanies = this.retrieveCompanies.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveCompany = this.setActiveCompany.bind(this);
    //   this.removeAllStudents = this.removeAremoveAllStudentsllTutorials.bind(this);
    this.searchCompany = this.searchCompany.bind(this);
    this.state = {
      companies: [],
      currentCompany: null,
      currentIndex: -1,
      searchCompany: ""
    };

  }

  componentDidMount() {
    this.retrieveCompanies();
  }

  onChangeSearchName(e) {
    const searchCompany = e.target.value;
    this.setState({
      searchCompany
    });
  }

  setActiveCompany(company, index) {
    this.setState({
      currentCompany: company,
      currentIndex: index
    });
  }

  refreshList() {
    this.retrieveCompanies();
    this.setState({
      currentCompany: null,
      currentIndex: -1
    });
  }

  retrieveCompanies() {
    CompanyService.getAll()
      .then(response => {
        this.setState({
          companies: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchCompany() {
    CompanyService.findByName(this.state.searchCompany)
      .then(response => {
        this.setState({
          companies: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }


  render() {
    const { searchCompany, companies, currentCompany, currentIndex } = this.state;

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
              <TableCell align="left">Company Name</TableCell>
              <TableCell align="left">Company Email</TableCell>
              <TableCell align="left">User Name</TableCell>
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companies && companies.map((company) => (
              <TableRow key={company.number}>
                <TableCell align="left">{company.id}</TableCell>
                <TableCell align="left">
                  {company.company_name}
                </TableCell>
                <TableCell align="left">{company.company_email}</TableCell>
                <TableCell align="left">{company.username}</TableCell>
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
            count={companies.length}
            component="div"
        />

      </div>
    );
  }
}

export default CompanyList