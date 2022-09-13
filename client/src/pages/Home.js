import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Card, Link, Container, Typography, Button } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Page from '../components/Page';
import Logo from '../components/Logo';
import VerificationPayment from 'src/components/payments/VerificationPayment';
import AuthService from '../services/auth.service';

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

  return (
    <Page title="Home | ADAS">
      <RootStyle>
        <HeaderStyle>
            <a href="/" style={{ textDecoration: 'none' }}>
              Home
            </a>            
            {loggedInUserRole == null && 
              <a href="/login" style={{ textDecoration: 'none' }}>
                Signin
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
                    <input type="text" name="document_key" className="form-control" required={true}placeholder="Enter document key" />      
                </div>
            </form>
                
            {/* <a href="/payment" style={{textDecoration: 'none'}}>
              <Button variant="contained" sx={{ mt: 4}}>
                    Verify Document
              </Button>
            </a> */}
              <VerificationPayment />

          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
