import React, { useEffect, useState } from 'react';
import { ArticleItem } from '../../components/article-item/article-item';
import { useGetArticleFeed, useGetArticles } from '../../hooks';
import {
  setActiveArticleAction,
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
  );
}
