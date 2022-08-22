import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';

import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../../../services/auth.service";
import { CheckBox } from '@mui/icons-material';
import Button from 'src/theme/overrides/Button';

// ----------------------------------------------------------------------
const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};
export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const form = useRef();
  const checkBtn = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(username, password).then(
        () => {
          navigate('/dashboard/app', { replace: true });
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };

  // const LoginSchema = Yup.object().shape({
  //   email: Yup.string().email('Email must be a valid email address').required('Email is required'),
  //   password: Yup.string().required('Password is required'),
  // });

  // const defaultValues = {
  //   email: '',
  //   password: '',
  //   remember: true,
  // };

  // const methods = useForm({
  //   resolver: yupResolver(LoginSchema),
  //   defaultValues,
  // });

  // const {
  //   handleSubmit,
  //   formState: { isSubmitting },
  // } = methods;

  // const onSubmit = async () => {
  //   navigate('/dashboard/app', { replace: true });
  // };

  return (
    <Form onSubmit={handleLogin} ref={form}>
      <Stack spacing={3}>
        <TextField name="username" label="User name"      
              value={username}
              onChange={onChangeUsername}
              validations={[required]}/>

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={onChangePassword}
          validations={[required]}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        {/* <Check name="remember" label="Remember me" /> */}
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <button className="btn btn-primary btn-block" disabled={loading}>
      {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
      </button>
      {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
      <CheckButton style={{ display: "none" }} ref={checkBtn} />
    </Form>
  );
}
