import { useMeQuery } from '@microservice-app/data-access';
import { Icon } from '@mui/material';
import { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ConfigContext } from '../../context/routesContext';
import { loginStateChangedAction, logoutAction } from '../../store/authStore';
import { useAppDispatch } from '../../store/hooks';
import { Link } from '../designSystem/Link';

export interface HeaderProps {}

export function Header(props: HeaderProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const { clearToken } = useContext(ConfigContext);

  const userToken = localStorage.getItem('access_token');

  const { data } = useMeQuery();

  useEffect(() => {
    if (!userToken) {
      navigate('/login');
    }
  }, []);

  useEffect(() => {
    if (userToken) {
      dispatch(loginStateChangedAction({ isUserLoggedIn: true }));
    }
  }, [userToken, dispatch]);

  const logoutHandler = () => {
    localStorage.removeItem('access_token');
    dispatch(logoutAction());
    clearToken();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <Link className="nav-link" href="/home" isActive={pathname === '/'}>
              Home
            </Link>
          </li>
          {userToken ? (
            <>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  href="/editor"
                  isActive={pathname === '/editor'}
                >
                  <Icon className="ion-compose" />
                  &nbsp;New Post
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  href="/settings"
                  isActive={pathname === '/settings'}
                >
                  <Icon className="ion-gear-a" />
                  &nbsp;Settings
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link"
                  href={`/profile/${data?.me.username}`}
                >
                  {data?.me.username}
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  href="/login"
                  isActive={pathname === '/login'}
                >
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  href="/register"
                  isActive={pathname === '/register'}
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
