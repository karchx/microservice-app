import { Typography } from '@mui/material';
import { useAppSelector } from '../../store/hooks';
import {
  StyledArticle,
  StyledArticleAuthor,
  StyledArticleBody,
  StyledArticleContent,
  StyledArticleSidebar,
  StyledArticleTags,
} from './article.styled';

export interface ArticleProps {}

export function Article(props: ArticleProps) {
  const {
    activeArticle: { article, author },
  } = useAppSelector((state) => state.article);

  return (
    <StyledArticle>
      <Typography variant="h3">{article.title}</Typography>
      <StyledArticleContent>
        <StyledArticleBody>
          <Typography variant="h6">{article.body}</Typography>
        </StyledArticleBody>

        <StyledArticleSidebar>
          <StyledArticleAuthor>Author: {author?.username}</StyledArticleAuthor>
          <StyledArticleTags>{article.tagList.join(', ')}</StyledArticleTags>
        </StyledArticleSidebar>
      </StyledArticleContent>
    </StyledArticle>
  );
}
