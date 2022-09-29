import { ArticleDto } from '@microservice-app/models';
import { useNavigate } from 'react-router-dom';
import { useGetUserById } from '../../../hooks';
import { setActiveArticleAction } from '../../../store/articleStore';
import { useAppDispatch } from '../../../store/hooks';
import { Link } from '../../designSystem/Link';
import { format } from 'date-fns';

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
    dispatch(setActiveArticleAction({ article, author }));
    navigate('/article');
  };

  const formatDate = (date: Date): string => {
    return format(new Date(date), 'MMM d, y');
  };

  return (
    <div className="article-preview">
      <div className="article-meta">
        <div className="info">
          <Link className="author" href="/">
            Keneth
          </Link>
          <span className="date">{formatDate(article.createdAt)}</span>
        </div>
      </div>

      <Link href={`/article/${article.slug}`} className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
        <ul className="tag-list">
          {article.tagList?.map((tag, i) => (
            <li className="tag-default tag-pill tag-outline" key={i}>
              {tag}
            </li>
          ))}
        </ul>
      </Link>
    </div>
  );
}

/*
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
*/
