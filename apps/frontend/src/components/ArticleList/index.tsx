import { ArticleItem } from './Article';
import { ArticlesWithAuthorsQuery } from '@microservice-app/data-access';

interface ArticleProps {
  data: ArticlesWithAuthorsQuery;
}

export const ArtilceList = ({ data }: ArticleProps) => (
  <>
    {data.articles?.map((article, i) => (
      <ArticleItem article={article} key={i} />
    ))}
  </>
);

/*
 */
