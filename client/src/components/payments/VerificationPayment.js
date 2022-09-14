import React from 'react';
import { useState } from "react";
import { Button, TextField } from '@mui/material';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';

export default function VerificationPayment() {
  const payment_amount = 50000;
  const [payer_email, setPayerEmail] = useState('');
  const [is_valid_email, setEmailValidity] = useState(true);

  const onChangeEmail = (e) => {
       setPayerEmail(e.target.value);
       setEmailValidity(payer_email.includes("@"));
       //console.log(payer_email);
  };

  const config = {
    public_key: 'FLWPUBK_TEST-8eb30e705ff0747460fff4be236afcd5-X',
    //public_key: 'FLWPUBK-5dd887f7383cad01a73bbc769ed0f96b-X',
    tx_ref: Date.now(),
    amount: payment_amount,
    currency: 'UGX',
    customer: {
      email: payer_email,
    },
    customizations: {
      title: 'ADAS Payments | Document Verification',
      description: 'Payment for Document Verification',
      logo: 'https://i.ibb.co/MPVR8G1/logo-svg.png',
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  return (
    <>
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
      
      <Button variant="contained" sx={{ mt: 4}}
      onClick={() => {
          handleFlutterPayment({
          callback: (response) => {
              console.log(response);
              //closePaymentModal() // this will close the modal programmatically
          },
          onClose: () => {},
          });
      }}
      >
      Verify Document
      </Button>
    </>
  );
}