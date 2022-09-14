import { Button, Container, Typography } from '@mui/material';
import Page from '../components/Page';

export default function VerificationSuccess() {
  return (
    <Page title="Admin Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h5" sx={{ justifyContent: 'center' }}>
          Payment was successful, verification report has been sent to your email. Thank you.
        </Typography>
        
        <Button variant="contained" sx={{ mt: 4}} 
              onClick={() => {
                    window.location.href = "/";
                  }
              }>
            Back to Home
            </Button>
      </Container>
    </Page>
  );
}
