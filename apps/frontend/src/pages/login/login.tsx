import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { UserDto } from '@microservice-app/models';
import {
  StyledPaper,
  StyledTextField,
} from '../../components/components.styled';
import { useLoginUser } from '../../hooks';
import { useAppDispatch } from '../../store/hooks';
import { StyledRegisterLink, StyledButtonBar } from './login.styled';
import { ConfigContext } from '../../context/routesContext';
import { useNavigate } from 'react-router-dom';
import { loginStateChangedAction } from '../../store/authStore';

export interface LoginProps {}

export function Login(props: LoginProps) {
  const [loginFormData, setLoginFormData] = useState({} as UserDto);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { setToken: setTokenInHeaders } = React.useContext(ConfigContext);
  const [{ data: loginData, loading, error }, loginUser] = useLoginUser();

  const handleSubmit = () => {
    loginUser({ data: { ...loginFormData } });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (loginData) {
      localStorage.setItem('access_token', loginData.access_token);
      setTokenInHeaders(loginData.access_token);
      dispatch(loginStateChangedAction({ isUserLoggedIn: true }));
      navigate('/home');
    }
  }, [loginData, dispatch, setTokenInHeaders]);

  return (
    <StyledPaper>
      <form>
        <StyledTextField
          name="username"
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
            Log me In!
          </Button>
          <StyledRegisterLink to="/register">
            Not registered yet?
          </StyledRegisterLink>
        </StyledButtonBar>
      </form>
    </StyledPaper>
  );
}
