import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import { Form, FormSpy, Field } from 'react-final-form';
import { TextField, Select } from 'final-form-material-ui';
import {
  Typography,
  Paper,
  Link,
  Grid,
  Button,
  CssBaseline,
  MenuItem,
} from '@mui/material';
import DatePicker from 'src/components/TextField';

const onSubmit = async values => {
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
};

const validate = values => {
  const errors = {};
  if (!values.studentName) {
    errors.studentName = 'Required';
  }
  if (!values.studentNumber) {
    errors.studentNumber = 'Required';
  }
  if (!values.documentType) {
    errors.documentType= 'Required';
  }
  return errors;
};

export default function StudentRequest() {
  // useRef hook allows to get/set updated values in FormSpy onChange listener
  // @see https://stackoverflow.com/questions/53845595/wrong-react-hooks-behaviour-with-event-listener
  const valuesRef = useRef({});

  return (
    <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
      <CssBaseline />
      <Typography variant="h4" align="center" component="h1" gutterBottom>
         Fill in the form below to make a request
      </Typography>

      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={({ form, handleSubmit, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit} noValidate>
            <FormSpy
              subscription={{ values: true }}
              onChange={({ values }) => {
                let needReset = false;
                const next = { ...values };

                // reset studentNumber field value when studentName changes
                if (values.studentName !== valuesRef.current.studentName) {
                  next.studentNumber = null;
                  needReset = true;
                }
                if (needReset) {
                  // update form without triggering validation
                  form.reset(next);
                }

                // update ref
                valuesRef.current = values;
              }}
            />

            <Paper style={{ padding: 16 }}>
              <Grid container alignItems="flex-start" spacing={8}>
                <Grid item xs={12}>
                  <Field
                    fullWidth
                    name="studentName"
                    component={TextField}
                    multiline
                    label="Student Name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    fullWidth
                    name="studentNumber"
                    component={TextField}
                    label="Student Number"
                    formControlProps={{ fullWidth: true }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    fullWidth
                    name="documentType"
                    component={Select}
                    label="Document Type"
                    formControlProps={{ fullWidth: true }}
                  >
                    <MenuItem value="Certificate">Certificate</MenuItem>
                    <MenuItem value="Diploma">Diploma</MenuItem>
                    <MenuItem value="Bachelors Degree">Bachelors Degree</MenuItem>
                  </Field>
                </Grid>

                <Grid item xs={12}>
                  {/* <Field
                    fullWidth
                    name="date"
                    component={TextField}
                    label="Date"
                    formControlProps={{ fullWidth: true }}
                  /> */}
                  <DatePicker/>
                </Grid>

             <Grid item style={{ marginTop: 16 }}>
                 <Button
                    type="button"
                    variant="contained"
                    onClick={form.reset}
                    disabled={submitting || pristine}
                  >
                    Reset
                  </Button>
                </Grid>
                <Grid item style={{ marginTop: 16 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={submitting}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Paper>

            <pre>{JSON.stringify(values, 0, 2)}</pre>
          </form>
        )}
      />
    </div>
  );
}


