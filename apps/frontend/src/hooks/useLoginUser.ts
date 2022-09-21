import { TokenDto } from '@microservice-app/models';
import useAxios from 'axios-hooks';
import React from 'react';
import { ConfigContext } from '../context/routesContext';

export const useLoginUser = () => {
  const {
    routesConfig: { authBaseUrl, headers },
  } = React.useContext(ConfigContext);

  return useAxios<TokenDto>(
    {
      url: `${authBaseUrl}/auth/login`,
      method: 'POST',
      headers,
    },
    { manual: true }
  );
};
