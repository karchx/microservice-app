import React, { useEffect, useState } from 'react';
import { ArtilceList, Banner, Link } from '../../components';
import { useGetArticleFeed, useGetArticles } from '../../hooks';
import {
  setArticleFeedAction,
  setArticlesAction,
} from '../../store/articleStore';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  StyledHome,
  StyledTabButton,
  StyledTabContent,
  StyledTabSelector,
} from './home.styled';

type TabType = 'global' | 'feed';

export interface HomeProps {}

export function Home(props: HomeProps) {
  const [activeTab, setActiveTab] = useState<TabType>('global');
  const [{ data: articleData, loading: articleLoading }, refetchArticles] =
    useGetArticles();
  const [{ data: feedData, loading: feedLoading }, refetchFeed] =
    useGetArticleFeed();
  const { isUserLoggedIn } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isUserLoggedIn) {
      refetchArticles();
    }
  }, [isUserLoggedIn, refetchArticles]);

  useEffect(() => {
    if (articleData) {
      dispatch(setArticlesAction(articleData));
    }
  }, [articleData, dispatch]);

  useEffect(() => {
    if (isUserLoggedIn) {
      refetchFeed();
    }
  }, [isUserLoggedIn, refetchFeed]);

  useEffect(() => {
    if (feedData) {
      dispatch(setArticleFeedAction(feedData));
    }
  }, [feedData, dispatch]);

  const tabSelect = (tab: TabType) => {
    setActiveTab(tab);
  };

  if (articleLoading || feedLoading) {
    return null;
  }

  return (
    <div>
      <div className="home-page">
        <Banner>
          <h1 className="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </Banner>
      </div>

      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <div className="feed-toggle">
              <ul className="nav nav-pills outline-active">
                {/*validar que exista token (inicio de sesion)*/}
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    href="/"
                    onClick={() => tabSelect('feed')}
                  >
                    Your feed
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className="nav-link"
                    href="/"
                    onClick={() => tabSelect('global')}
                  >
                    Global feed
                  </Link>
                </li>
              </ul>
            </div>

            {/* Feed */}
            <div className="article-preview">No articles are here...yet.</div>
            <ArtilceList articles={articleData} />
          </div>
        </div>
      </div>
    </div>
  );
}

/*
    <StyledHome>
      <StyledTabSelector>
        <StyledTabButton
          onClick={() => tabSelect('global')}
          selected={activeTab === 'global'}
        >
          Global
        </StyledTabButton>
        <StyledTabButton
          onClick={() => tabSelect('feed')}
          selected={activeTab === 'feed'}
        >
          Feed
        </StyledTabButton>
      </StyledTabSelector>

      {activeTab === 'global' && (
        <StyledTabContent>
          {articleData?.map((article) => (
            <ArticleItem
              article={article}
              key={article._id.toString()}
            ></ArticleItem>
          ))}
        </StyledTabContent>
      )}
      {activeTab === 'feed' && (
        <StyledTabContent>
          {feedData?.map((article) => (
            <ArticleItem
              article={article}
              key={article._id.toString()}
            ></ArticleItem>
          ))}
        </StyledTabContent>
      )}
    </StyledHome>
*/
