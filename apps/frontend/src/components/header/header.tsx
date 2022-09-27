import { Icon } from '@mui/material';
import { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ConfigContext } from '../../context/routesContext';
import { useUserDetails } from '../../hooks';
import {
  loginStateChangedAction,
  logoutAction,
  setUserDetailsAction,
} from '../../store/authStore';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Link } from '../designSystem/Link';

export interface HeaderProps {}

export function Header(props: HeaderProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const { userData, isUserLoggedIn } = useAppSelector((state) => state.auth);
  const { clearToken } = useContext(ConfigContext);

  const [{ data: userDataFetched, loading, error }, fetchUserDetails] =
    useUserDetails();

  const userToken = localStorage.getItem('access_token');

  useEffect(() => {
    if (!userToken) {
      navigate('/login');
    }
  }, []);

  useEffect(() => {
    if (userToken || isUserLoggedIn) {
      // isUserLoggedIn is used to re-render the component via redux after
      // login.
      // userToken is used on refresh - token exists but isUserLoggedIn is
      // false.
      // user logged in - get details
      fetchUserDetails();
    }
  }, [userToken, isUserLoggedIn, fetchUserDetails]);

  useEffect(() => {
    if (userDataFetched) {
      dispatch(loginStateChangedAction({ isUserLoggedIn: true }));
      dispatch(setUserDetailsAction(userDataFetched));
    }
  }, [userDataFetched, dispatch]);

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
                  href="{`/profile/${userData?.username}`}"
                >
                  {userData?.username}
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
