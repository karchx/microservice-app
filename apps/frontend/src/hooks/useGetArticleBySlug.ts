import React from 'react';
import useAxios from 'axios-hooks';
import { ArticleDto } from '@microservice-app/models';
import { ConfigContext } from '../context/routesContext';

export const useGetArticleBySlug = (slug: string) => {
  const {
    routesConfig: { articleBaseUrl, headers },
  } = React.useContext(ConfigContext);

  return useAxios<ArticleDto>(
    {
      url: `${articleBaseUrl}/articles/${slug}`,
      method: 'GET',
      headers,
    },
    { manual: false }
  );
};
