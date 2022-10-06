import * as Types from './types';

// Generated on 2022-10-05T19:18:48-06:00

export type ArticleWithCommentsFragment = { __typename?: 'Article', _id: string, body: string, description: string, favoritesCount: number, tagList: Array<string | null>, title: string, slug: string, createdAt: string, comments: Array<{ __typename?: 'Comment', _id: string, body: string, createdAt: string, author: { __typename?: 'User', _id: string, image?: string | null, username: string } }> };

export type ArticleWithAuthorFragment = { __typename?: 'Article', _id: string, body: string, description: string, favoritesCount: number, tagList: Array<string | null>, title: string, slug: string, createdAt: string, author: { __typename?: 'User', _id: string, image?: string | null, username: string } };

export type ArticleFragment = { __typename?: 'Article', _id: string, body: string, description: string, favoritesCount: number, tagList: Array<string | null>, title: string, slug: string, createdAt: string };

export type CommentWithAuthorFragment = { __typename?: 'Comment', _id: string, body: string, createdAt: string, author: { __typename?: 'User', _id: string, image?: string | null, username: string } };

export type CommentDeletedFragment = { __typename?: 'Comment', _id: string, body: string, createdAt: string, deletedAt?: string | null };

export type ProfileFragment = { __typename?: 'Profile', _id: string, bio: string, following: boolean, image: string, username: string };

export type UserFragment = { __typename?: 'User', _id: string, bio?: string | null, email: string, image?: string | null, username: string, updatedAt: string };

export type AuthorFragment = { __typename?: 'User', _id: string, image?: string | null, username: string };

export type UserWithArticlesFragment = { __typename?: 'User', _id: string, bio?: string | null, email: string, image?: string | null, username: string, updatedAt: string, articles: Array<{ __typename?: 'Article', _id: string, body: string, description: string, favoritesCount: number, tagList: Array<string | null>, title: string, slug: string, createdAt: string, comments: Array<{ __typename?: 'Comment', _id: string, body: string, createdAt: string, author: { __typename?: 'User', _id: string, image?: string | null, username: string } }> }> };

export type AddFavoriteMutationVariables = Types.Exact<{
  input: Types.Scalars['String'];
}>;


export type AddFavoriteMutation = { __typename?: 'Mutation', addFavorite: { __typename?: 'Article', _id: string, body: string, description: string, favoritesCount: number, tagList: Array<string | null>, title: string, slug: string, createdAt: string, comments: Array<{ __typename?: 'Comment', _id: string, body: string, createdAt: string, author: { __typename?: 'User', _id: string, image?: string | null, username: string } }> } };

export type AddFollowMutationVariables = Types.Exact<{
  input: Types.Scalars['String'];
}>;


export type AddFollowMutation = { __typename?: 'Mutation', addFollow: { __typename?: 'Profile', _id: string, bio: string, following: boolean, image: string, username: string } };

export type CreateArticleMutationVariables = Types.Exact<{
  input: Types.ArticleCreateInput;
}>;


export type CreateArticleMutation = { __typename?: 'Mutation', createArticle: { __typename?: 'Article', _id: string, body: string, description: string, favoritesCount: number, tagList: Array<string | null>, title: string, slug: string, createdAt: string, author: { __typename?: 'User', _id: string, image?: string | null, username: string } } };

export type CreateCommentMutationVariables = Types.Exact<{
  input: Types.CommentCreateInput;
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'Comment', _id: string, body: string, createdAt: string, author: { __typename?: 'User', _id: string, image?: string | null, username: string } } };

export type DeleteArticleMutationVariables = Types.Exact<{
  input: Types.Scalars['String'];
}>;


export type DeleteArticleMutation = { __typename?: 'Mutation', deleteArticle: { __typename?: 'Article', _id: string, body: string, description: string, favoritesCount: number, tagList: Array<string | null>, title: string, slug: string, createdAt: string, author: { __typename?: 'User', _id: string, image?: string | null, username: string } } };

export type DeleteCommentMutationVariables = Types.Exact<{
  input: Types.CommentDeleteInput;
}>;


export type DeleteCommentMutation = { __typename?: 'Mutation', deleteComment: { __typename?: 'Comment', _id: string, body: string, createdAt: string, deletedAt?: string | null } };

export type LoginMutationVariables = Types.Exact<{
  input: Types.LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'Token', access_token: string } };

export type RemoveFavoriteMutationVariables = Types.Exact<{
  input: Types.Scalars['String'];
}>;


export type RemoveFavoriteMutation = { __typename?: 'Mutation', removeFavorite: { __typename?: 'Article', _id: string, body: string, description: string, favoritesCount: number, tagList: Array<string | null>, title: string, slug: string, createdAt: string, comments: Array<{ __typename?: 'Comment', _id: string, body: string, createdAt: string, author: { __typename?: 'User', _id: string, image?: string | null, username: string } }> } };

export type RemoveFollowMutationVariables = Types.Exact<{
  input: Types.Scalars['String'];
}>;


export type RemoveFollowMutation = { __typename?: 'Mutation', removeFollow: { __typename?: 'Profile', _id: string, bio: string, following: boolean, image: string, username: string } };

export type UpdateArticleMutationVariables = Types.Exact<{
  input: Types.ArticleUpdateInput;
}>;


export type UpdateArticleMutation = { __typename?: 'Mutation', updateArticle: { __typename?: 'Article', _id: string, body: string, description: string, favoritesCount: number, tagList: Array<string | null>, title: string, slug: string, createdAt: string, author: { __typename?: 'User', _id: string, image?: string | null, username: string } } };

export type UpdateUserMutationVariables = Types.Exact<{
  input: Types.UserUpdateInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', _id: string, bio?: string | null, email: string, image?: string | null, username: string, updatedAt: string } };

export type ArticlesQueryVariables = Types.Exact<{
  input?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type ArticlesQuery = { __typename?: 'Query', articles: Array<{ __typename?: 'Article', _id: string, body: string, description: string, favoritesCount: number, tagList: Array<string | null>, title: string, slug: string, createdAt: string, comments: Array<{ __typename?: 'Comment', _id: string, body: string, createdAt: string, author: { __typename?: 'User', _id: string, image?: string | null, username: string } }>, author: { __typename?: 'User', _id: string, image?: string | null, username: string } } | null> };

export type ArticlesWithAuthorsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ArticlesWithAuthorsQuery = { __typename?: 'Query', articles: Array<{ __typename?: 'Article', _id: string, body: string, description: string, favoritesCount: number, tagList: Array<string | null>, title: string, slug: string, createdAt: string, author: { __typename?: 'User', _id: string, image?: string | null, username: string } } | null> };

export type MeQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', _id: string, bio?: string | null, email: string, image?: string | null, username: string, updatedAt: string, feed: Array<{ __typename?: 'Article', _id: string, body: string, description: string, favoritesCount: number, tagList: Array<string | null>, title: string, slug: string, createdAt: string, comments: Array<{ __typename?: 'Comment', _id: string, body: string, createdAt: string, author: { __typename?: 'User', _id: string, image?: string | null, username: string } }> }>, articles: Array<{ __typename?: 'Article', _id: string, body: string, description: string, favoritesCount: number, tagList: Array<string | null>, title: string, slug: string, createdAt: string, comments: Array<{ __typename?: 'Comment', _id: string, body: string, createdAt: string, author: { __typename?: 'User', _id: string, image?: string | null, username: string } }> }> } };

export type UserProfileQueryVariables = Types.Exact<{
  input: Types.Scalars['String'];
}>;


export type UserProfileQuery = { __typename?: 'Query', profile: { __typename?: 'Profile', _id: string, bio: string, following: boolean, image: string, username: string } };

export type UserByEmaildQueryVariables = Types.Exact<{
  input?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type UserByEmaildQuery = { __typename?: 'Query', user: { __typename?: 'User', _id: string, bio?: string | null, email: string, image?: string | null, username: string, updatedAt: string, articles: Array<{ __typename?: 'Article', _id: string, body: string, description: string, favoritesCount: number, tagList: Array<string | null>, title: string, slug: string, createdAt: string, comments: Array<{ __typename?: 'Comment', _id: string, body: string, createdAt: string, author: { __typename?: 'User', _id: string, image?: string | null, username: string } }> }> } };

export type UserByIdQueryVariables = Types.Exact<{
  input?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type UserByIdQuery = { __typename?: 'Query', user: { __typename?: 'User', _id: string, bio?: string | null, email: string, image?: string | null, username: string, updatedAt: string, articles: Array<{ __typename?: 'Article', _id: string, body: string, description: string, favoritesCount: number, tagList: Array<string | null>, title: string, slug: string, createdAt: string, comments: Array<{ __typename?: 'Comment', _id: string, body: string, createdAt: string, author: { __typename?: 'User', _id: string, image?: string | null, username: string } }> }> } };

export type UserByUsernameQueryVariables = Types.Exact<{
  input?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type UserByUsernameQuery = { __typename?: 'Query', user: { __typename?: 'User', _id: string, bio?: string | null, email: string, image?: string | null, username: string, updatedAt: string, articles: Array<{ __typename?: 'Article', _id: string, body: string, description: string, favoritesCount: number, tagList: Array<string | null>, title: string, slug: string, createdAt: string, comments: Array<{ __typename?: 'Comment', _id: string, body: string, createdAt: string, author: { __typename?: 'User', _id: string, image?: string | null, username: string } }> }> } };
