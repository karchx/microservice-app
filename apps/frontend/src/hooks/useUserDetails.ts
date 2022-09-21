import { UserDto } from '@microservice-app/models';
import React from 'react';
import useAxios from 'axios-hooks';
import { ConfigContext } from '../context/routesContext';

export const useUserDetails = () => {
  const {
    routesConfig: { userBaseUrl, headers },
  } = React.useContext(ConfigContext);

  return useAxios<UserDto>(
    {
      url: `${userBaseUrl}/user`,
      method: 'GET',
      headers,
    },
    { manual: true }
  );
};
