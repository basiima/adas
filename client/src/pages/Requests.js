import * as React from 'react';
import { useState, useEffect } from 'react';
import { filter } from 'lodash';
import { Link, Link as RouterLink } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
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
import { UserListHead, StudentListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import AuthService from '../services/auth.service';
import RequestService from '../components/requests/request.service';
import StudentService from '../components/student/student.service';

const loggedInUser = AuthService.getCurrentUser();
const loggedInUserRole = loggedInUser.roles;
const loggedInUserName = loggedInUser.username;

var TABLE_HEAD =[];
if(loggedInUserRole=='ROLE_ISSUER'){
TABLE_HEAD = [
  { id: 'request_id', label: 'Request ID', alignRight: false },
  { id: 'student_name', label: 'Student Name', alignRight: false },
  { id: 'student_number', label: 'Student Number', alignRight: false },
  { id: 'document_type', label: 'Document Type', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'createdAt', label: 'Request Date', alignRight: false },
  { id: 'action', label: 'Action', alignRight: false }
];
}else if(loggedInUserRole=='ROLE_STUDENT'){
  TABLE_HEAD = [
    { id: 'request_id', label: 'Request ID', alignRight: false },
    { id: 'student_name', label: 'Student Name', alignRight: false },
    { id: 'student_number', label: 'Student Number', alignRight: false },
    { id: 'document_type', label: 'Document Type', alignRight: false },
    { id: 'status', label: 'Status', alignRight: false },
    { id: 'createdAt', label: 'Request Date', alignRight: false },
  ];
}

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
    return filter(array, (_user) => _user.student_name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Requests() {

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('student_name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [students, setStudents] = useState([]);

    // Trigger retrieve requests function on load up
    useEffect(()=>{
      // setInterval(() => {
        retrieveRequests();
      // }, 50000);
    });
  
    // Send request to api to retrieve requests records from the database
    const retrieveRequests = () => {
      if(loggedInUserRole=='ROLE_ISSUER'){
      RequestService.getAll()
        .then(response => {
          setStudents(response.data);
        })
        .catch(e => {
          console.log(e);
        });
      }else if(loggedInUserRole=='ROLE_STUDENT'){
        StudentService.get(loggedInUserName)
            .then(response => {
              RequestService.get(response.data.student_number)
              .then(response =>{
                setStudents(response.data);
                console.log(response.data);
              })
                console.log(response.data.student_number);
            })
            .catch(e =>{
              console.log(e);
            })
      }
    }
  
    const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };
  
    const handleSelectAllClick = (event) => {
      if (event.target.checked) {
        const newSelecteds = students.map((n) => n.student_name);
        setSelected(newSelecteds);
        return;
      }
      setSelected([]);
    };
  
    const handleClick = (event, student_name) => {
      const selectedIndex = selected.indexOf(student_name);
      let newSelected = [];
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, student_name);
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
  
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - students.length) : 0;
  
    const filteredUsers = applySortFilter(students, getComparator(order, orderBy), filterName);
  
    const isUserNotFound = filteredUsers.length === 0;
  
    const [open, setOpen] = React.useState(false);

  return (
    <Page title="Requests">
    <Container  maxWidth="xl">
      {loggedInUserRole == 'ROLE_STUDENT' && 
    <Button variant="contained" component={RouterLink} to="/dashboard/place-request">
            Place Request
    </Button>}<br/><br/>
    {/* <List sx={{ width: '100%', maxWidth: 800, bgcolor: 'background.paper' }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Remy Sharp"
          secondary={
            <fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Document Type:
              </Typography>
              {" Masters"}
            </fragment>
          }
        />
        <div>
        <Button variant="contained" component={RouterLink} to="/dashboard/certifyDocument">
            Certify
          </Button>
        </div>
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Travis Howard"
          secondary={
            <fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Document Type:
              </Typography>
              {" Bachelors"}
            </fragment>
          }
        />
        <div>
        <Button variant="contained" component={RouterLink} to="/dashboard/certifyDocument">
            Certify
          </Button>
        </div>
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Cindy Baker"
          secondary={
            <fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Document Type:
              </Typography>
              {' Certificate'}
            </fragment>
          }
        />
        <div>
        <Button variant="contained" component={RouterLink} to="/dashboard/certifyDocument">
            Certify
          </Button>
        </div>
      </ListItem>
    </List> */}
    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h5" gutterBottom>
            Requests
          </Typography>
        </Stack>
        <Card>
        <StudentListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={students.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { request_id, student_name, student_number, document_type, status, createdAt} = row;
                    const isItemSelected = selected.indexOf(request_id) !== -1;

                    return (
                      <TableRow
                        hover
                        key={request_id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, request_id)} />
                        </TableCell>
                        <TableCell align="left">{request_id}</TableCell>
                        <TableCell align="left">{student_name}</TableCell>
                        <TableCell align="left">{student_number}</TableCell>
                        <TableCell align="left">{document_type}</TableCell>
                        <TableCell align="left">
                          <Typography style={ status == 0? {color: 'red'}:{color: 'green'}}>
                              {status==0?'Pending':'Certified'}
                          </Typography>
                        </TableCell>
                        <TableCell align="left">{createdAt}</TableCell>
                        {loggedInUserRole=='ROLE_ISSUER' && status==0 &&
                        <TableCell align="left">
                          <Link to="/dashboard/certifyDocument" 
                          state={ { id:request_id, student_name: student_name, student_number: student_number, document_type: document_type } }
                          style={{ fontWeight: 'bold' }}
                          >
                            Certify
                          </Link>
                          {/* <Button variant="contained" component={RouterLink} to="/dashboard/certifyDocument">
                              Certify
                          </Button> */}
                        </TableCell>
                        }
                        {loggedInUserRole=='ROLE_ISSUER' && status==1 &&
                        <TableCell align="left">
                            <CheckCircleIcon style={ {color: 'green'} }></CheckCircleIcon>
                        </TableCell>
                        }
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
            count={students.length}
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
