import React, { ChangeEvent, useEffect, useState } from 'react';
import { UserDto } from '@microservice-app/models';
import { useLoginUser } from '../../hooks';
import { useAppDispatch } from '../../store/hooks';
import { ConfigContext } from '../../context/routesContext';
import { useNavigate } from 'react-router-dom';
import { loginStateChangedAction } from '../../store/authStore';
import { Link, Button, Form, InputField } from '../../components';

export interface LoginProps {}

export function Login(props: LoginProps) {
  const [loginFormData, setLoginFormData] = useState({} as UserDto);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { setToken: setTokenInHeaders } = React.useContext(ConfigContext);
  const [{ data: loginData, loading, error }, loginUser] = useLoginUser();

  const handleSubmit = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    loginUser({ data: { ...loginFormData } });
  };

  const handleInputChange = (e: ChangeEvent<HTMLButtonElement>) => {
    setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    console.log(loginData);
    if (loginData) {
      localStorage.setItem('access_token', loginData.access_token);
      setTokenInHeaders(loginData.access_token);
      dispatch(loginStateChangedAction({ isUserLoggedIn: true }));
      navigate('/home');
    }
  }, [loginData, dispatch, setTokenInHeaders]);

  return (
    <div>
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Login</h1>
              <p className="text-xs-center">
                <Link href="/register">Need an account?</Link>
              </p>

              <Form>
                <InputField
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                  name="email"
                  onChange={handleInputChange}
                />
                <InputField
                  className="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleInputChange}
                />

                <Button size="lg" onClick={handleSubmit}>
                  Login me In!
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
