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

export default function AdminDashboardApp() {
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
    <Page title="Admin Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          ACADEMIC DOCUMENT AUTHENTICITY SYSTEM
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Students on Platform" total={students.length} icon={'eva:people-fill'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Companies on Platform" total={companies.length} color="info" icon={'clarity:building-solid'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Documents Verified" total={documents.length} color="warning" icon={'eva:file-text-fill'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Pending Verifications" total={0} color="error" icon={'icon-park-outline:incoming'} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Documents Verified over the last year"
              subheader="(+43%) than last year"
              chartLabels={[
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ]}
              chartData={[
                {
                  name: 'Diploma',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Bachelors',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Certificate',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Top Companies"
              chartData={[
                { label: 'MTN', value: 43 },
                { label: 'URA', value: 54 },
                { label: 'ADAS', value: 14 },
                { label: 'YELLOW PAGE', value: 44 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.chart.blue[0],
                theme.palette.chart.violet[0],
                theme.palette.chart.yellow[0],
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
