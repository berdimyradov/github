import {
  SearchResultItemConnection,
  Repository,
  Issue,
  User,
} from "@octokit/graphql-schema";

type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;

export type RepositoriesQuery = {
  search: Overwrite<SearchResultItemConnection, { nodes: Repository[] }>;
};

export type IssuesQuery = {
  search: Overwrite<SearchResultItemConnection, { nodes: Issue[] }>;
};

export type UsersQuery = {
  search: Overwrite<SearchResultItemConnection, { nodes: User[] }>;
};
