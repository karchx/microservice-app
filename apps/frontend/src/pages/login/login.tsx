import { Button } from '@mui/material';
import {
  StyledPaper,
  StyledTextField,
} from '../../components/components.styled';
import { StyledRegisterLink, StyledButtonBar } from './login.styled';

export interface LoginProps {}

export function Login(props: LoginProps) {
  return (
    <StyledPaper>
      <form>
        <StyledTextField
          name="username"
          variant="outlined"
          label="Email"
          fullWidth
        />
        <StyledTextField
          name="password"
          variant="outlined"
          label="Password"
          type="password"
          fullWidth
        />

        <StyledButtonBar>
          <Button variant="contained">Log me In!</Button>
          <StyledRegisterLink to="/register">
            Not registered yet?
          </StyledRegisterLink>
        </StyledButtonBar>
      </form>
    </StyledPaper>
  );
}
