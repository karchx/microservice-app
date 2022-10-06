import { useParams } from 'react-router-dom';
import { Form as FormFinal, Field } from 'react-final-form';
import { format } from 'date-fns';
import { useArticlesQuery } from '@microservice-app/data-access';
import { Banner, Button, Form, Link } from '../../components';
import { TextareaField } from '../../components/Form/TextareaField';
import { useAppSelector } from '../../store/hooks';
import { Icon } from '../../components/designSystem/Icon';

interface ArticleProps {}

export function Article(props: ArticleProps) {
  const { slug } = useParams<{ slug: string }>();

  const { data, loading } = useArticlesQuery({ variables: { input: slug } });
  const { userData } = useAppSelector((state) => state.auth);

  if (!loading && !data) {
    return null;
  }

  const formatDate = (date: string): string => {
    return format(new Date(date), 'MMM d, y');
  };

  const onSubmitComment = () => {
    console.log('test');
  };

  return (
    <div>
      {!loading ? (
        <div className="article-page">
          <Banner>
            <h1>{data.articles[0].title}</h1>
            <div className="article-meta">
              <div className="info">
                <Link
                  href={`/${data.articles[0].author.username}`}
                  className="author"
                >
                  {data.articles[0].author.username}
                </Link>
                <span className="date">
                  {formatDate(data.articles[0].createdAt)}
                </span>
              </div>
            </div>
          </Banner>

          <div className="container page">
            <div className="row article-content">
              <div className="col-md-12">
                <div>
                  <p>{data.articles[0].body}</p>
                </div>

                <ul className="tag-list">
                  {data.articles[0].tagList.map((tag) => (
                    <li key={tag} className="tag-default tag-pill tag-outline">
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <hr />

            <div className="article-actions">
              <div className="article-meta">
                <Button size="sm" className="btn-outline-primary">
                  <Icon className="ion-heart" />
                  &nbsp; Favorite Post{' '}
                  <span className="counter">
                    ({data.articles[0].favoritesCount})
                  </span>
                </Button>
              </div>
            </div>

            <div className="row">
              <div className="col-xs-12 col-md-8 offset-md-2">
                <FormFinal
                  onSubmit={onSubmitComment}
                  initialValues={{ comment: '' }}
                  render={(renderProps) => (
                    <Form className="card comment-form">
                      <Field name="comment">
                        {({ input }) => (
                          <>
                            <div className="card-block">
                              <TextareaField
                                className="form-control"
                                placeholder="Write a comment..."
                                rows={3}
                                {...input}
                              />
                            </div>

                            <div className="card-footer">
                              <Button
                                size="sm"
                                className="btn-primary"
                                type="submit"
                              >
                                Post Comment
                              </Button>
                            </div>
                          </>
                        )}
                      </Field>
                    </Form>
                  )}
                />

                {data.articles[0].comments.map((comment) => (
                  <div className="card" key={comment._id}>
                    <div className="card-block">
                      <p className="card-text">{comment.body}</p>
                    </div>

                    <div className="card-footer">
                      &nbsp;
                      <Link
                        href={`/${comment.author.username}`}
                        className="comment-author"
                      >
                        {comment.author.username}
                      </Link>
                      <span className="date-posted">
                        {formatDate(comment.createdAt)}
                      </span>
                      <span className="mod-options">
                        {comment.author.username === userData.username && (
                          <Icon className="ion-trash-a" />
                        )}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
}
