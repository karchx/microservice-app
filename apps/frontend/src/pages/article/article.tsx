import { Icon } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Form as FormFinal, Field } from 'react-final-form';
import { format } from 'date-fns';
import { useArticlesQuery } from '@microservice-app/data-access';
import { Banner, Button, Form, Link } from '../../components';
import { TextareaField } from '../../components/Form/TextareaField';

interface ArticleProps {}

export function Article(props: ArticleProps) {
  const { slug } = useParams<{ slug: string }>();

  const { data, loading } = useArticlesQuery({ variables: { input: slug } });

  if (!loading && !data) {
    return null;
  }

  const formatDate = (date: string): string => {
    return format(new Date(date), 'MMM d, y');
  };

  const onHandlerSubmit = () => {
    console.log('test');
  };

  return (
    <div>
      <div className="article-page">
        {!loading && (
          <>
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

              <hr />

              <div className="article-actions">
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
                  onSubmit={onHandlerSubmit}
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
                          </>
                        )}
                      </Field>
                    </Form>
                  )}
                ></FormFinal>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
