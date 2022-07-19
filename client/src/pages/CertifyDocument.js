import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Grid, Button, Container, Stack, Typography ,FormControl, TextField} from '@mui/material';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';





// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

// ----------------------------------------------------------------------

export default function CertifyDocuments() {
  return (
    <Page title="Dashboard: Blog">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Certify Documents 
          </Typography>
          <Button variant="contained" component={RouterLink} to="#" startIcon={<Iconify icon="eva:eye-fill" />}>
            View Documents
          </Button>
        </Stack>
        </Container>



        

      <Container maxWidth="sm">
        <FormControl >
        <label htmlFor= 'a'>
          Select document(s) to hash:
        <br />
          <input type="file" />
        </label>
        <br />
        <TextField id="file_name" label="File Name:" variant="standard" disabled/>
        <br />
        <Button variant="contained">Certify</Button>
      </FormControl>
      </Container>
    </Page>
  );
}


