import { ArticleDto } from '@microservice-app/models';
import { CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useGetUserById } from '../../hooks';
import { setActiveArticleAction } from '../../store/articleStore';
import { useAppDispatch } from '../../store/hooks';
import {
  StyledCard,
  StyledCardDetails,
  StyledCardTagDetails,
  StyledCardAuthorDetails,
  StyledPostItem,
} from './article-item.styled';

export interface ArticleItemProps {
  article: ArticleDto;
}

export function ArticleItem({ article }: ArticleItemProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [{ data: author, loading }, refetch] = useGetUserById({
    id: article.authorId,
  });

  if (loading) {
    return null;
  }

  const handleClick = () => {
    dispatch(setActiveArticleAction({ article, author: null }));
    navigate('/article');
  };

  return (
    <StyledPostItem onClick={handleClick}>
      <StyledCard elevation={6}>
        <CardContent>
          <Typography variant="h5">{article.title}</Typography>
          <StyledCardDetails>
            <StyledCardTagDetails>
              {article.tagList.join(', ')}
            </StyledCardTagDetails>
            <StyledCardAuthorDetails>
              {author?.username}
            </StyledCardAuthorDetails>
          </StyledCardDetails>
        </CardContent>
      </StyledCard>
    </StyledPostItem>
  );
}
