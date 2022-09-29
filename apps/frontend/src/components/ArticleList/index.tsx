import { ArticleDto } from '@microservice-app/models';
import { ArticleItem } from './Article';

interface ArticleProps {
  articles: ArticleDto[];
}

export const ArtilceList = (props: ArticleProps) => (
  <>
    {props.articles?.map((article) => (
      <ArticleItem article={article} />
    ))}
  </>
);
