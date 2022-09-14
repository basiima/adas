import React from 'react';
import { useState, useEffect } from "react";
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';

import AuthService from '../../services/auth.service';
//import RequestService from './request.service';
import StudentService from "../student/student.service";

export default function CertificationPayment() {
  const loggedInUser = AuthService.getCurrentUser();
  const loggedInUserRole = loggedInUser.roles;  
  const loggedInUserEmail = loggedInUser.email;
  const loggedInUserName = loggedInUser.username;

  const payment_amount = 30000;

  const config = {
    public_key: 'FLWPUBK_TEST-8eb30e705ff0747460fff4be236afcd5-X',
    //public_key: 'FLWPUBK-5dd887f7383cad01a73bbc769ed0f96b-X',
    tx_ref: Date.now(),
    amount: payment_amount,
    currency: 'UGX',
    payment_options: 'mobilemoneyuganda',
    customer: {
      email: loggedInUserEmail,
      name: loggedInUserName,
    },
    customizations: {
      title: 'ADAS Payments | Document Certification',
      logo: 'https://i.ibb.co/MPVR8G1/logo-svg.png',
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  return (
      <button
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
         Make Payment
      </button>
  );
}