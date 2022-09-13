import { faker } from '@faker-js/faker';
import { useState, useEffect } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';
import StudentService from "../components/student/student.service";
import CompanyService from "../components/company/company.service";
import DocumentService from "../components/document/document.service"

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const theme = useTheme();
  const [students, setStudents] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [documents, setDocuments] = useState([]);

  useEffect(()=>{
    // setInterval(() => {
     retrieveStudents();
    // }, 50000);
  });

  // Send request to api to retrieve student records from the database
  const retrieveStudents = () => {
    StudentService.getAll()
      .then(response => {
        setStudents(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  useEffect(()=>{
    // setInterval(() => {
     retrieveCompanies();
    // }, 50000);
  });

  // Send request to api to retrieve student records from the database
  const retrieveCompanies = () => {
    CompanyService.getAll()
      .then(response => {
        setCompanies(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  useEffect(()=>{
    // setInterval(() => {
     retriveDocuments();
    // }, 50000);
  });

  // Send request to api to retrieve student records from the database
  const retriveDocuments = () => {
    DocumentService.getAll()
      .then(response => {
        setDocuments(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          ACADEMIC DOCUMENT AUTHENTICITY SYSTEM
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Documents Verified" total={documents.length} color="info" icon={'eva:file-text-fill'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Pending Verifications" total={0} color="error" icon={'icon-park-outline:incoming'} />
          </Grid>
          </Grid>
      </Container>
    </Page>
  );
}
