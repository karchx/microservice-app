import * as Types from './operations';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
// Generated on 2022-09-24T20:17:21-06:00

export const ProfileFragmentDoc = gql`
    fragment profile on Profile {
  _id
  bio
  following
  image
  username
}
    `;
export const UserFragmentDoc = gql`
    fragment user on User {
  _id
  bio
  email
  image
  username
  updatedAt
}
    `;
export const AuthorFragmentDoc = gql`
    fragment author on User {
  _id
  image
  username
}
    `;
export const CommentWithAuthorFragmentDoc = gql`
    fragment commentWithAuthor on Comment {
  _id
  body
  createdAt
  author {
    ...author
  }
}
    ${AuthorFragmentDoc}`;
export const ArticleWithCommentsFragmentDoc = gql`
    fragment articleWithComments on Article {
  _id
  body
  description
  favoritesCount
  tagList
  title
  comments {
    ...commentWithAuthor
  }
}
    ${CommentWithAuthorFragmentDoc}`;
export const UserWithArticlesFragmentDoc = gql`
    fragment userWithArticles on User {
  _id
  bio
  email
  image
  username
  updatedAt
  articles {
    ...articleWithComments
  }
}
    ${ArticleWithCommentsFragmentDoc}`;
export const ArticlesDocument = gql`
    query articles($input: String) {
  articles(slug: $input) {
    ...articleWithComments
  }
}
    ${ArticleWithCommentsFragmentDoc}`;

/**
 * __useArticlesQuery__
 *
 * To run a query within a React component, call `useArticlesQuery` and pass it any options that fit your needs.
 * When your component renders, `useArticlesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useArticlesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useArticlesQuery(baseOptions?: Apollo.QueryHookOptions<Types.ArticlesQuery, Types.ArticlesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.ArticlesQuery, Types.ArticlesQueryVariables>(ArticlesDocument, options);
      }
export function useArticlesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.ArticlesQuery, Types.ArticlesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.ArticlesQuery, Types.ArticlesQueryVariables>(ArticlesDocument, options);
        }
export type ArticlesQueryHookResult = ReturnType<typeof useArticlesQuery>;
export type ArticlesLazyQueryHookResult = ReturnType<typeof useArticlesLazyQuery>;
export type ArticlesQueryResult = Apollo.QueryResult<Types.ArticlesQuery, Types.ArticlesQueryVariables>;
export function refetchArticlesQuery(variables?: Types.ArticlesQueryVariables) {
      return { query: ArticlesDocument, variables: variables }
    }
export const MeDocument = gql`
    query me {
  me {
    ...user
    feed {
      ...articleWithComments
    }
    articles {
      ...articleWithComments
    }
  }
}
    ${UserFragmentDoc}
${ArticleWithCommentsFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<Types.MeQuery, Types.MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.MeQuery, Types.MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.MeQuery, Types.MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.MeQuery, Types.MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<Types.MeQuery, Types.MeQueryVariables>;
export function refetchMeQuery(variables?: Types.MeQueryVariables) {
      return { query: MeDocument, variables: variables }
    }
export const UserProfileDocument = gql`
    query userProfile($input: String!) {
  profile(username: $input) {
    ...profile
  }
}
    ${ProfileFragmentDoc}`;

/**
 * __useUserProfileQuery__
 *
 * To run a query within a React component, call `useUserProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserProfileQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUserProfileQuery(baseOptions: Apollo.QueryHookOptions<Types.UserProfileQuery, Types.UserProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.UserProfileQuery, Types.UserProfileQueryVariables>(UserProfileDocument, options);
      }
export function useUserProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.UserProfileQuery, Types.UserProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.UserProfileQuery, Types.UserProfileQueryVariables>(UserProfileDocument, options);
        }
export type UserProfileQueryHookResult = ReturnType<typeof useUserProfileQuery>;
export type UserProfileLazyQueryHookResult = ReturnType<typeof useUserProfileLazyQuery>;
export type UserProfileQueryResult = Apollo.QueryResult<Types.UserProfileQuery, Types.UserProfileQueryVariables>;
export function refetchUserProfileQuery(variables: Types.UserProfileQueryVariables) {
      return { query: UserProfileDocument, variables: variables }
    }
export const UserByEmaildDocument = gql`
    query userByEmaild($input: String) {
  user(email: $input) {
    ...userWithArticles
  }
}
    ${UserWithArticlesFragmentDoc}`;

/**
 * __useUserByEmaildQuery__
 *
 * To run a query within a React component, call `useUserByEmaildQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserByEmaildQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserByEmaildQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUserByEmaildQuery(baseOptions?: Apollo.QueryHookOptions<Types.UserByEmaildQuery, Types.UserByEmaildQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.UserByEmaildQuery, Types.UserByEmaildQueryVariables>(UserByEmaildDocument, options);
      }
export function useUserByEmaildLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.UserByEmaildQuery, Types.UserByEmaildQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.UserByEmaildQuery, Types.UserByEmaildQueryVariables>(UserByEmaildDocument, options);
        }
export type UserByEmaildQueryHookResult = ReturnType<typeof useUserByEmaildQuery>;
export type UserByEmaildLazyQueryHookResult = ReturnType<typeof useUserByEmaildLazyQuery>;
export type UserByEmaildQueryResult = Apollo.QueryResult<Types.UserByEmaildQuery, Types.UserByEmaildQueryVariables>;
export function refetchUserByEmaildQuery(variables?: Types.UserByEmaildQueryVariables) {
      return { query: UserByEmaildDocument, variables: variables }
    }
export const UserByIdDocument = gql`
    query userById($input: String) {
  user(id: $input) {
    ...userWithArticles
  }
}
    ${UserWithArticlesFragmentDoc}`;

/**
 * __useUserByIdQuery__
 *
 * To run a query within a React component, call `useUserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserByIdQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUserByIdQuery(baseOptions?: Apollo.QueryHookOptions<Types.UserByIdQuery, Types.UserByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.UserByIdQuery, Types.UserByIdQueryVariables>(UserByIdDocument, options);
      }
export function useUserByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.UserByIdQuery, Types.UserByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.UserByIdQuery, Types.UserByIdQueryVariables>(UserByIdDocument, options);
        }
export type UserByIdQueryHookResult = ReturnType<typeof useUserByIdQuery>;
export type UserByIdLazyQueryHookResult = ReturnType<typeof useUserByIdLazyQuery>;
export type UserByIdQueryResult = Apollo.QueryResult<Types.UserByIdQuery, Types.UserByIdQueryVariables>;
export function refetchUserByIdQuery(variables?: Types.UserByIdQueryVariables) {
      return { query: UserByIdDocument, variables: variables }
    }
export const UserByUsernameDocument = gql`
    query userByUsername($input: String) {
  user(username: $input) {
    ...userWithArticles
  }
}
    ${UserWithArticlesFragmentDoc}`;

/**
 * __useUserByUsernameQuery__
 *
 * To run a query within a React component, call `useUserByUsernameQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserByUsernameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserByUsernameQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUserByUsernameQuery(baseOptions?: Apollo.QueryHookOptions<Types.UserByUsernameQuery, Types.UserByUsernameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.UserByUsernameQuery, Types.UserByUsernameQueryVariables>(UserByUsernameDocument, options);
      }
export function useUserByUsernameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.UserByUsernameQuery, Types.UserByUsernameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.UserByUsernameQuery, Types.UserByUsernameQueryVariables>(UserByUsernameDocument, options);
        }
export type UserByUsernameQueryHookResult = ReturnType<typeof useUserByUsernameQuery>;
export type UserByUsernameLazyQueryHookResult = ReturnType<typeof useUserByUsernameLazyQuery>;
export type UserByUsernameQueryResult = Apollo.QueryResult<Types.UserByUsernameQuery, Types.UserByUsernameQueryVariables>;
export function refetchUserByUsernameQuery(variables?: Types.UserByUsernameQueryVariables) {
      return { query: UserByUsernameDocument, variables: variables }
    }