import React from 'react';
import useAxios from 'axios-hooks';
import { ArticleDto } from '@microservice-app/models';
import { ConfigContext } from '../context/routesContext';

export const useGetArticles = () => {
  const {
    routesConfig: { articleBaseUrl, headers },
  } = React.useContext(ConfigContext);

  return useAxios<ArticleDto[]>(
    {
      url: `${articleBaseUrl}/articles`,
      method: 'GET',
      headers,
    },
    { manual: true }
  );
};
