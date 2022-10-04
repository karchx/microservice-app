import { format } from 'date-fns';
import { useParams } from 'react-router-dom';
import { Banner, Link } from '../../components';
import { useGetArticleBySlug, useGetUserById } from '../../hooks';

interface ArticleProps {}

export function Article(props: ArticleProps) {
  const { slug } = useParams<{ slug: string }>();
  const [{ data: articleData, loading: articleLoading }] =
    useGetArticleBySlug(slug);

  const [{ data: userData }] = useGetUserById({ id: articleData?.authorId });

  const formatDate = (date: Date): string => {
    return format(new Date(date), 'MMM d, y');
  };

  return (
    <div>
      <div className="article-page">
        {!articleLoading && (
          <>
            <Banner>
              <h1>{articleData.title}</h1>
              <div className="article-meta">
                <div className="info">
                  <Link href={`/${userData?.username}`} className="author">
                    {userData?.username}
                  </Link>
                  <span className="date">
                    {formatDate(articleData.createdAt)}
                  </span>
                </div>
              </div>
            </Banner>

            <div className="container page">
              <div className="row article-content">
                <div className="col-md-12">
                  <div>
                    <p>{articleData.body}</p>
                  </div>

                  <ul className="tag-list">
                    {articleData.tagList.map((tag) => (
                      <li
                        key={tag}
                        className="tag-default tag-pill tag-outline"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
