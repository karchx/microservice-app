import { UserDto } from '@microservice-app/models';
import useAxios from 'axios-hooks';
import { ObjectId } from 'mongodb';
import React from 'react';
import { ConfigContext } from '../context/routesContext';

interface GetUserByIdRequest {
  id: ObjectId;
}

export const useGetUserById = ({ id }: GetUserByIdRequest) => {
  const {
    routesConfig: { userBaseUrl, headers },
  } = React.useContext(ConfigContext);

  return useAxios<UserDto>(
    {
      url: `${userBaseUrl}/user/${id}`,
      method: 'GET',
      headers,
    },
    { manual: false }
  );
};
