export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
// Generated on 2022-09-24T20:17:21-06:00

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Article = {
  __typename?: 'Article';
  _id: Scalars['String'];
  author: User;
  authorId: Scalars['String'];
  body: Scalars['String'];
  comments: Array<Comment>;
  createdAt: Scalars['String'];
  deletedAt?: Maybe<Scalars['String']>;
  description: Scalars['String'];
  favoritesCount: Scalars['Int'];
  slug: Scalars['String'];
  tagList: Array<Maybe<Scalars['String']>>;
  title: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type ArticleCreateInput = {
  body: Scalars['String'];
  description: Scalars['String'];
  tagList?: InputMaybe<Array<Scalars['String']>>;
  title: Scalars['String'];
};

export type ArticleUpdateInput = {
  body?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  slug: Scalars['String'];
  tagList?: InputMaybe<Array<Scalars['String']>>;
  title?: InputMaybe<Scalars['String']>;
};

export type Comment = {
  __typename?: 'Comment';
  _id: Scalars['String'];
  author: User;
  authorId: Scalars['String'];
  body: Scalars['String'];
  createdAt: Scalars['String'];
  deletedAt?: Maybe<Scalars['String']>;
};

export type CommentCreateInput = {
  body: Scalars['String'];
  slug: Scalars['String'];
};

export type CommentDeleteInput = {
  id: Scalars['String'];
  slug: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addFavorite: Article;
  addFollow: Profile;
  createArticle: Article;
  createComment: Comment;
  createUser: User;
  deleteArticle: Article;
  deleteComment: Comment;
  login: Token;
  removeFavorite: Article;
  removeFollow: Profile;
  updateArtcile: Article;
  updateUser: User;
};


export type MutationAddFavoriteArgs = {
  slug: Scalars['String'];
};


export type MutationAddFollowArgs = {
  username: Scalars['String'];
};


export type MutationCreateArticleArgs = {
  createArticleData: ArticleCreateInput;
};


export type MutationCreateCommentArgs = {
  cretaeCommentData: CommentCreateInput;
};


export type MutationCreateUserArgs = {
  createUserData: UserCreateInput;
};


export type MutationDeleteArticleArgs = {
  slug: Scalars['String'];
};


export type MutationDeleteCommentArgs = {
  deleteCommentData: CommentDeleteInput;
};


export type MutationLoginArgs = {
  loginData: LoginInput;
};


export type MutationRemoveFavoriteArgs = {
  slug: Scalars['String'];
};


export type MutationRemoveFollowArgs = {
  username: Scalars['String'];
};


export type MutationUpdateArtcileArgs = {
  updateArticleData: ArticleUpdateInput;
};


export type MutationUpdateUserArgs = {
  updateUserData: UserUpdateInput;
};

export type Profile = {
  __typename?: 'Profile';
  _id: Scalars['String'];
  bio: Scalars['String'];
  following: Scalars['Boolean'];
  image: Scalars['String'];
  username: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  articles: Array<Maybe<Article>>;
  me: User;
  profile: Profile;
  user: User;
};


export type QueryArticlesArgs = {
  slug?: InputMaybe<Scalars['String']>;
};


export type QueryProfileArgs = {
  username: Scalars['String'];
};


export type QueryUserArgs = {
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type Token = {
  __typename?: 'Token';
  access_token: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['String'];
  articles: Array<Article>;
  bio?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  feed: Array<Article>;
  image?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type UserCreateInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type UserUpdateInput = {
  bio?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  image?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  username: Scalars['String'];
};
