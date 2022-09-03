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

// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, StudentListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
import DocumentListToolbar from '../sections/@dashboard/products/DocumentListToolbar'
import DocumentService from "../components/document/document.service";

import AuthService from '../services/auth.service';

import { fDateTime } from '../utils/formatTime';

const loggedInUser = AuthService.getCurrentUser();
const loggedInUserRole = loggedInUser.roles;
const loggedInUserName = loggedInUser.username;

var TABLE_HEAD =[];

if(loggedInUserRole=='ROLE_ISSUER'){
TABLE_HEAD = [
  { id: 'id', label: 'ID', alignRight: false },
  { id: 'document_file', label: 'Document Name', alignRight: false },
  { id: 'referenceId', label: 'Reference Number', alignRight: false },
  { id: 'document_hash', label: 'Hash Value', alignRight: false },
  { id: 'createdAt', label: 'Date Certified', alignRight: false }
];
} else if(loggedInUserRole=='ROLE_STUDENT'){
  TABLE_HEAD = [
    { id: 'id', label: 'ID', alignRight: false },
    { id: 'document_file', label: 'Document Name', alignRight: false },
    { id: 'document_hash', label: 'Hash Value', alignRight: false },
    { id: 'createdAt', label: 'Date Certified', alignRight: false }
  ];
}
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
    return filter(array, (_user) => _user.document_file.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Student() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('document_file');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [documents, setDocuments] = useState([]);

  // Trigger retrieve documents function on load up
  useEffect(()=>{
    // setInterval(() => {
     retrieveDocuments();
    // }, 50000);
  });

  // Send request to api to retrieve student records from the database
  const retrieveDocuments = () => {
    DocumentService.getAll()
      .then(response => {
        setDocuments(response.data);
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
      const newSelecteds = documents.map((n) => n.document_file);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, document_file) => {
    const selectedIndex = selected.indexOf(document_file);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, document_file);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - documents.length) : 0;

  const filteredUsers = applySortFilter(documents, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="Documents">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h5" gutterBottom>
            Documents
          </Typography>
        </Stack>

        <Card>
        <DocumentListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={documents.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, document_file, referenceId, document_hash, createdAt} = row;
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
                        <TableCell align="left">{document_file}</TableCell>
                        {loggedInUserRole=='ROLE_ISSUER' &&
                        <TableCell align="left">{referenceId}</TableCell>
                        }
                        <TableCell align="left">{document_hash}</TableCell>
                        <TableCell align="left">{fDateTime(createdAt)}</TableCell>
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
            count={documents.length}
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


