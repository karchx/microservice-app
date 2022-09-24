import * as Types from './types';

// Generated on 2022-09-23T20:23:56-06:00

export type ArticleWithCommentsFragment = { __typename?: 'Article', _id: string, body: string, description: string, favoritesCount: number, tagList: Array<string | null>, title: string, comments: Array<{ __typename?: 'Comment', _id: string, body: string, createdAt: string, author: { __typename?: 'User', _id: string, image?: string | null, username: string } }> };

export type CommentWithAuthorFragment = { __typename?: 'Comment', _id: string, body: string, createdAt: string, author: { __typename?: 'User', _id: string, image?: string | null, username: string } };

export type UserFragment = { __typename?: 'User', _id: string, bio?: string | null, email: string, image?: string | null, username: string, updatedAt: string };

export type AuthorFragment = { __typename?: 'User', _id: string, image?: string | null, username: string };

export type MeQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', _id: string, bio?: string | null, email: string, image?: string | null, username: string, updatedAt: string, feed: Array<{ __typename?: 'Article', _id: string, body: string, description: string, favoritesCount: number, tagList: Array<string | null>, title: string, comments: Array<{ __typename?: 'Comment', _id: string, body: string, createdAt: string, author: { __typename?: 'User', _id: string, image?: string | null, username: string } }> }>, articles: Array<{ __typename?: 'Article', _id: string, body: string, description: string, favoritesCount: number, tagList: Array<string | null>, title: string, comments: Array<{ __typename?: 'Comment', _id: string, body: string, createdAt: string, author: { __typename?: 'User', _id: string, image?: string | null, username: string } }> }> } };
