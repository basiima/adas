import * as React from 'react';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
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
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, IconButton, Tooltip
} from '@mui/material';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import CloseIcon from "@mui/icons-material/Close";
import StudentService from "../components/student/student.service";
import AddStudent from "../components/student/AddStudent";

// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, StudentListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
import CompanyListToolbar from '../sections/@dashboard/products/CompanyListToolbar'
import AddCompany from '../components/company/AddCompany';
import CompanyService from "../components/company/company.service";

import Alert from "@mui/material/Alert";

import axios from "axios";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Progress } from 'reactstrap';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'ID', alignRight: false },
  { id: 'company_name', label: 'Company Name', alignRight: false },
  { id: 'company_email', label: 'Company Email', alignRight: false },
  { id: 'username', label: 'User Name', alignRight: false },
  { id: 'action', label: 'Action', alignRight: false }
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.company_name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Student() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('company_name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [companies, setCompanies] = useState([]);

  // Trigger retrieve students function on load up
  useEffect(()=>{
    // setInterval(() => {
     retrieveStudents();
    // }, 50000);
  });

  // Send request to api to retrieve student records from the database
  const retrieveStudents = () => {
    CompanyService.getAll()
      .then(response => {
        setCompanies(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = companies.map((n) => n.company_name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, company_name) => {
    const selectedIndex = selected.indexOf(company_name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, company_name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - companies.length) : 0;

  const filteredUsers = applySortFilter(companies, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  const [open, setOpen] = React.useState(false);
  const [openDialog,setOpenDialog] = useState(false);

  const handleDialogClickOpen = () => {
    setOpenDialog(true);
  }

  const handleDialogClose = () => {
    setOpenDialog(false);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const [loaded, setLoaded] = useState(null);

  const checkMimeType = (event) => {
    let files = event.target.files
    let err = []
    const types = ['text/csv']

    for (var x = 0; x < files.length; x++) {
      if (types.every(type => files[x].type !== type)) {
        err[x] = 'Upload CSV format';
      }
    };

    // Displaying error message in react Toast component
    for (var z = 0; z < err.length; z++) {
      event.target.value = null
      toast.error(err[z])
    }
    return true;

  }

  const onChangeHandler = event => {
    var files = event.target.files

    if (checkMimeType(event)) {
      setSelectedFile(event.target.files[0]);
    }
    console.log(event.target.files[0])
    }

  const onClickHandler = () => {
    const data = new FormData()
    data.append('file', selectedFile);

    axios.post("http://localhost:8080/uploadCompanies", data, {
      onUploadProgress: ProgressEvent => {
        setLoaded((ProgressEvent.loaded / ProgressEvent.total * 100));
      },
    })
    .then(res => {
      toast.success('Upload success', { delay:2000 });
    })
  }


  return (
    <Page title="Companies">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h5" gutterBottom>
            Companies
          </Typography>
          <div>
            <Button variant="contained" onClick={handleClickOpen} startIcon={<Iconify icon="eva:plus-fill" />} >
              Add Company
            </Button>
            <FormControl>
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                  <Grid container justify="space-between">
                    <Typography variant="div">
                      Company Details
                    </Typography>
                    <Tooltip title="Close Form">
                      <IconButton onClick={() => setOpen(false)} style={{ marginLeft: '350px' }} variant="container">
                        <CloseIcon color='error' />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                </DialogTitle>
                <AddCompany />
              </Dialog></FormControl>
          </div>
          <Button variant="contained" onClick={handleDialogClickOpen} startIcon={<Iconify icon="eva:plus-fill" />}>
            Upload CSV
          </Button>
          <FormControl>
              <Dialog open={openDialog} onClose={handleDialogClose}>
                <DialogTitle>
                  <Grid container justify="space-between">
                    <Typography variant="div">
                      Upload CSV
                    </Typography>
                    <Tooltip title="Close Form">
                      <IconButton onClick={() => setOpenDialog(false)} style={{ marginLeft: '350px' }} variant="container">
                        <CloseIcon color='error' />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                </DialogTitle>
                <DialogContent style={{width: 600}}>
                <form action="/upload" method="post" encType="multipart/form-data">
                <div className="container">
                  <div className="row">
                    <div className="offset-md-3 col-md-6">
                    <Alert severity="info"><Typography><b>Supported file formats</b>: csv *only</Typography></Alert>
                    <br/>
                      <div className="form-group files">
                        <label>Upload File </label>
                        <input type="file" name="file" className="form-control" onChange={onChangeHandler} required={true}/><br/>
                      </div>
                      <div className="form-group">
                        <br />
                        <ToastContainer />
                        <Progress max="100" color="success" value={loaded}>{Math.round(loaded, 2)}%</Progress>
                      </div>
                      <br/>
                      <div>
                        <button type="button" className="btn btn-primary btn-block" disabled={ selectedFile == null ? true: false } onClick={onClickHandler}>Upload</button>
                      </div>
                    </div>
                  </div>
                </div>
                </form>
                </DialogContent>
              </Dialog></FormControl>
        </Stack>

        <Card>
        <CompanyListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={companies.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, company_name, company_email, username} = row;
                    const isItemSelected = selected.indexOf(id) !== -1;

                    return (
                      <TableRow
                        hover
                        key={id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, id)} />
                        </TableCell>
                        <TableCell align="left">{id}</TableCell>
                        <TableCell align="left">{company_name}</TableCell>
                        <TableCell align="left">{company_email}</TableCell>
                        <TableCell align="left">{username}</TableCell>
                        <TableCell align="left">
                          <IconButton aria-label="edit" >
                            <ModeEditOutlineOutlinedIcon color="info" />
                          </IconButton>
                          {/* <UserMoreMenu /> */}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={companies.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
