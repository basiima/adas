import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Card, Link, Container, Typography, Button, TextField } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Page from '../components/Page';
import Logo from '../components/Logo';
import AuthService from '../services/auth.service';
import PaymentService from '../components/payments/payment.service';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import { ethers } from "ethers";
const { ethers } = require("ethers");
import Certify from '../artifacts/contracts/Certify.sol/Certify.json';

const certifyAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const loggedInUser = AuthService.getCurrentUser();
const loggedInUserRole = loggedInUser.roles;
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const ContentStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Home() {
  const [doc_key, setDocumentKey] = useState('');
  const [is_valid_docKey, setKeyValidility] = useState(true);

  const payment_amount = 50000;
  const [payer_email, setPayerEmail] = useState('');
  const [is_valid_email, setEmailValidity] = useState(true);
  const [verificationStatus, setVerificationStatus] = useState('');

  const onChangeEmail = (e) => {
       setPayerEmail(e.target.value);
       setEmailValidity(payer_email.includes("@"));
       //console.log(payer_email);
  };

  async function fetchCertificationStatus() {
   // if(!doc_key) return;
    if(typeof window.ethereum !== 'undefined'){
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(certifyAddress, Certify.abi, provider);
        try{
            const data = await contract.get(doc_key);
            if(data[0]== true){
              toast.success('Document Key exists', { delay:3000 });
             
            }else if(data[0]==false){
              toast.error('Document Key doesnot exist', { delay:3000 });
            }
        }catch(error){
            console.log("Error: ", error);
        }

        setDocumentKey('');
    }
  }

  const config = {
    public_key: 'FLWPUBK_TEST-8eb30e705ff0747460fff4be236afcd5-X',
    //public_key: 'FLWPUBK-5dd887f7383cad01a73bbc769ed0f96b-X',
    tx_ref: Date.now(),
    amount: payment_amount,
    currency: 'UGX',
    payment_options: 'mobilemoneyuganda',
    customer: {
      email: payer_email,
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
      PaymentService.create(payment_data).then(
        fetchCertificationStatus()
      ).catch(e => {
        toast.error('Request failed !');
        console.log(e.response.data);
      });
    }
  };

  return (
    <Page title="Home | ADAS">
      <RootStyle>
        <HeaderStyle>
            <a href="/" style={{ textDecoration: 'none' }}>
              Home
            </a>            
            {loggedInUserRole == null && 
              <a href="/login" style={{ textDecoration: 'none' }}>
                Login
              </a>  
            }            
            {loggedInUserRole != null && 
              <a href="/dashboard/app" style={{ textDecoration: 'none' }}>
                My Dashboard
              </a>  
            }
            <a href="/">
              <img src="https://i.ibb.co/MPVR8G1/logo-svg.png" alt="logo-svg" border="0" width="auto" height="80"/>
            </a>
        </HeaderStyle>
        <Container maxWidth="sm">
          <ContentStyle>
            <Typography variant="h2" sx={{ mt: -20 }}>
              Welcome to ADAS
            </Typography>

            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 10 }}>
                The most convenient, fast and secure way to verify academic documents.
            </Typography>

            <Typography variant="h6" sx={{ color: 'text.secondary', alignItems: 'center', mb: 2 }}>
                One-Time Verification
            </Typography>

            <form method="post" action="">
                <div className="row">
                    <input type="text" name="document_key" className="form-control" required={true}
                    placeholder="Enter document key" 
                    value={doc_key}
                    onChange={onChangeDocumentKey}/>      
                </div>
            </form>
                
            {!is_valid_docKey &&
            <span style={{ color: 'red' }}>Please enter a valid document key</span>
            }
            
            <TextField
            margin="dense"
            id="email"
            label="Your Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={payer_email}
            onChange={onChangeEmail}
            />
            
            {!is_valid_email &&
            <span style={{ color: 'red' }}>Please enter a valid Email with "@"</span>
            }
            <ToastContainer />
            <Button variant='contained' sx={{ mt: 4 }}
              onClick={() => {
                handleFlutterPayment({
                  callback: (response) => {
                    let payment_data = response;
                    verifyTransaction(payment_data);
                      //closePaymentModal() // this will close the modal programmatically
                  },
                  onClose: () => {
                   // document.write("<div class='card'><div>"+{verificationStatus}+"</div></div>");
                   window.location.href = "/verification-success";
                  },
                });
              }}>
            Verify Document
            </Button>
          
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
