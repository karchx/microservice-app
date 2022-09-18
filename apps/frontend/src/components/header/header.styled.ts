import { AppBar, ExtendButtonBase, MenuItem, MenuItemTypeMap, Toolbar } from '@mui/material'
import styled from 'styled-components'

const StyledAppBar = styled(AppBar)``;

const StyledToolbar = styled(Toolbar)`
  justify-content: space-between;
`;

const StyledMenuItem: ExtendButtonBase<MenuItemTypeMap> = styled(MenuItem)``;

const StyledEmail = styled.span`
  margin-left: 8px;
`;

const ToolbarInnerContainer = styled.div`
  display: flex;
  align-items: center;
`

export {
  StyledAppBar,
  StyledToolbar,
  StyledMenuItem,
  StyledEmail,
  ToolbarInnerContainer
};
