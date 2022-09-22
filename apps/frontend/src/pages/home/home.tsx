import React, { useEffect, useState } from 'react';
import { useGetArticles } from '../../hooks';
import { setActiveArticleAction } from '../../store/articleStore';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

export interface HomeProps {}

export function Home(props: HomeProps) {
  const [{ data: articleData, loading: articleLoading }, refetchArticles] =
    useGetArticles();
  const { isUserLoggedIn } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isUserLoggedIn) {
      refetchArticles();
      console.log(articleData);
    }
  }, [isUserLoggedIn]);

  return <div>Home</div>;
}
