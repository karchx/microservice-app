import { ArticleWithAuthorFragment } from '@microservice-app/data-access';
import { Link } from '../../designSystem/Link';
import { format } from 'date-fns';
import { Button } from '../../designSystem/Button';
import { Icon } from '../../designSystem/Icon';

export interface ArticleItemProps {
  article: ArticleWithAuthorFragment;
}

export function ArticleItem({ article }: ArticleItemProps) {
  if (!article) {
    return null;
  }

  const formatDate = (date: string): string => {
    return format(new Date(date), 'MMM d, y');
  };

  return (
    <div className="article-preview">
      <div className="article-meta">
        <div className="info">
          <Link className="author" href={`/profile/${article.author.username}`}>
            {article.author.username}
          </Link>
          <span className="date">{formatDate(article.createdAt)}</span>
        </div>

        {/*TODO: add onclick favorite*/}
        <Button size="sm" variant="outline-primary" className="pull-xs-right">
          <Icon className="ion-heart" /> {article.favoritesCount}
        </Button>
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
