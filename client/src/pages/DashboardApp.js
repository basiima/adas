import { faker } from '@faker-js/faker';
import { useState, useEffect } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Button, TextField } from '@mui/material';
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
import DocumentService from "../components/document/document.service";
import AuthService from '../services/auth.service';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import PaymentService from '../components/payments/payment.service';

// ----------------------------------------------------------------------

const loggedInUser = AuthService.getCurrentUser();
const loggedInUserRole = loggedInUser.roles;

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
  const payment_amount = 50000;
  const [doc_key, setDocumentKey] = useState('');

  const config = {
    public_key: 'FLWPUBK_TEST-8eb30e705ff0747460fff4be236afcd5-X',
    //public_key: 'FLWPUBK-5dd887f7383cad01a73bbc769ed0f96b-X',
    tx_ref: Date.now(),
    amount: payment_amount,
    currency: 'UGX',
    payment_options: 'mobilemoneyuganda',
    customer: {
      email: loggedInUser.email,
    },
    customizations: {
      title: 'ADAS Payments | Document Verification',
      logo: 'https://i.ibb.co/MPVR8G1/logo-svg.png',
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  const onChangeDocumentKey = event => {
    setDocumentKey(event.target.value);
    setKeyValidility(doc_key.length >= 30);
    //console.log(is_valid_docKey);
  }

  const verifyTransaction = (payment_data) => {
    console.log(payment_data);
    if (payment_data.status === 'successful') {
      PaymentService.create(payment_data).then().catch(e => {
        toast.error('Request failed !');
        console.log(e.response.data);
      });
    }
  };

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        
        <Typography variant="h4" sx={{ mb: 5 }}>
          ACADEMIC DOCUMENT AUTHENTICITY SYSTEM
        </Typography>

        <Grid container spacing={3} mb={7}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Documents Verified" total={documents.length} color="info" icon={'eva:file-text-fill'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Pending Verifications" total={0} color="error" icon={'icon-park-outline:incoming'} />
          </Grid>
        </Grid>

        {loggedInUser.roles == "ROLE_COMPANY" &&

          <form method="post" action="">
              <div className="row" style={{ maxWidth: '50%' }}>
                  <input type="text" name="document_key" className="form-control" required={true}
                  placeholder="Enter document key" 
                  value={doc_key}
                  onChange={onChangeDocumentKey}/>      
              </div>
          </form>
        }

        {loggedInUser.roles == "ROLE_COMPANY" &&
          <Button variant="contained" sx={{ mt: 4, mb: 4 }} 
          onClick={() => {
            handleFlutterPayment({
              callback: (response) => {
                let payment_data = response;
                verifyTransaction(payment_data);
                  //closePaymentModal() // this will close the modal programmatically
              },
              onClose: () => {
                window.location.href = "/verification-success";
              },
            });
          }}>
        Verify Document
        </Button>        
        }
      </Container>
    </Page>
  );
}
