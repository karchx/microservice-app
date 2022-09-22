import { Card, CardTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import styled from 'styled-components';

const StyledPostItem = styled.div`
  cursor: pointer;
  margin: 15px 0;
`;

const StyledCard: OverridableComponent<CardTypeMap> = styled(Card)``;

const StyledArticleTitle = styled.div``;

const StyledCardDetails = styled.div`
  display: flex;
  flex-direction: row;
  jsutify-content: space-between;
`;

const StyledCardTagDetails = styled.div``;

const StyledCardAuthorDetails = styled.div``;

export {
  StyledPostItem,
  StyledCard,
  StyledArticleTitle,
  StyledCardDetails,
  StyledCardTagDetails,
  StyledCardAuthorDetails,
};
