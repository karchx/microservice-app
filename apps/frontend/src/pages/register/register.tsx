import React, { ChangeEvent, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

import { UserDto } from '@microservice-app/models';
import {
  StyledPaper,
  StyledTextField,
} from '../../components/components.styled';
import { StyledLoginLink, StyledButtonBar } from './register.styled';
import { ConfigContext } from '../../context/routesContext';
import { useAppDispatch } from '../../store/hooks';
import {
  setUserDetailsAction,
  loginStateChangedAction,
} from '../../store/authStore';
import { useRegisterUser, useLoginUser } from '../../hooks';

export interface RegisterProps {}

export function Register(props: RegisterProps) {
  const [registerFormData, setRegisterFormData] = useState({} as UserDto);
  const { setToken: setTokenInHeaders } = React.useContext(ConfigContext);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [{ data: registerData }, registerUser] = useRegisterUser();
  const [{ data: loginData }, loginUser] = useLoginUser();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRegisterFormData({
      ...registerFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    registerUser({ data: { ...registerFormData } });
  };

  useEffect(() => {
    if (registerData) {
      dispatch(setUserDetailsAction(registerData));
      loginUser({
        data: { email: registerData.email, password: registerData.password },
      });
    }
  }, [registerData, dispatch, loginUser]);

  useEffect(() => {
    if (loginData) {
      const { access_token: token } = loginData;
      localStorage.setItem('access_token', token);
      setTokenInHeaders(token);
      dispatch(loginStateChangedAction({ isUserLoggedIn: true }));
      navigate('/home');
    }
  }, [loginData, navigate, dispatch, setTokenInHeaders]);

  return (
    <StyledPaper>
      <form>
        <StyledTextField
          name="username"
          variant="outlined"
          label="Username"
          fullWidth
          onChange={handleInputChange}
        />
        <StyledTextField
          name="email"
          variant="outlined"
          label="Email"
          fullWidth
          onChange={handleInputChange}
        />
        <StyledTextField
          name="password"
          variant="outlined"
          label="Password"
          type="password"
          fullWidth
          onChange={handleInputChange}
        />

        <StyledButtonBar>
          <Button variant="contained" onClick={handleSubmit}>
            Register!
          </Button>
          <StyledLoginLink to="/login">
            Already registered? Login!
          </StyledLoginLink>
        </StyledButtonBar>
      </form>
    </StyledPaper>
  );
}
