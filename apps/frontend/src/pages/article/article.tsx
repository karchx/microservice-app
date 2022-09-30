import { Banner } from '../../components';
import { useAppSelector } from '../../store/hooks';

interface ArticleProps {}

export function Article(props: ArticleProps) {
  const {
    activeArticle: { article, author },
  } = useAppSelector((state) => state.article);

  return (
    <div>
      <div className="article-page">
        <Banner>
          <h1>{article.title}</h1>
        </Banner>
      </div>
    </div>
  );
}

/*
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
*/
