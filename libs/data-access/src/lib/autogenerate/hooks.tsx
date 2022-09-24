import * as Types from './operations';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
// Generated on 2022-09-24T17:39:23-06:00

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