import {useEffect} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {StyledAppBar, StyledMenuItem, StyledToolbar, ToolbarInnerContainer} from "./header.styled";


export interface HeaderProps {}



export function Header (props: HeaderProps) {
  const navigate = useNavigate();

  const userToken = localStorage.getItem('access_token');

  useEffect(() => {
    if(!userToken) {
      navigate('/login');
    }
  }, [])

  return (
   <StyledAppBar position="static">
    <StyledToolbar variant="dense">
      <ToolbarInnerContainer>
        {userToken && (
          <>
            <StyledMenuItem component={NavLink} to="/home">
              Home
            </StyledMenuItem>
            <StyledMenuItem component={NavLink} to="/publish">
              Publish
            </StyledMenuItem>
          </>
        )}
        {!userToken && (
          <>
            <StyledMenuItem component={NavLink} to="/login">
              Login
            </StyledMenuItem>
            <StyledMenuItem component={NavLink} to="/register">
              Register
            </StyledMenuItem>
          </>
        )}
      </ToolbarInnerContainer>
    </StyledToolbar>
   </StyledAppBar>
  );
}
