import { gql, TypedDocumentNode } from "@apollo/client";
import { RepositoriesQuery, IssuesQuery, UsersQuery } from "../types";

const GET_REPOSITORIES: TypedDocumentNode<RepositoriesQuery> = gql`
  query ($needle: String!, $first: Int!) {
    search(query: $needle, first: $first, type: REPOSITORY) {
      nodes {
        ... on Repository {
          id
          name
          owner {
            avatarUrl
            login
          }
          description
          watchers {
            totalCount
          }
          languages(first: 1, orderBy: { field: SIZE, direction: DESC }) {
            edges {
              node {
                id
                name
                color
              }
            }
          }
          url
          nameWithOwner
        }
      }
      repositoryCount
    }
  }
`;

const GET_ISSUES: TypedDocumentNode<IssuesQuery> = gql`
  query ($needle: String!, $first: Int!) {
    search(query: $needle, first: $first, type: ISSUE) {
      nodes {
        ... on Issue {
          id
          title
          state
          number
          repository {
            nameWithOwner
          }
        }
      }
      issueCount
    }
  }
`;

const GET_USERS: TypedDocumentNode<UsersQuery> = gql`
  query ($needle: String!, $first: Int!) {
    search(query: $needle, first: $first, type: USER) {
      nodes {
        ... on User {
          id
          bio
          avatarUrl
          login
          name
        }
      }
      userCount
    }
  }
`;

export type QueryType =  "repository" | "issue" | "user"

export const Queries: {[key in QueryType]: TypedDocumentNode} = {
  repository: GET_REPOSITORIES,
  issue: GET_ISSUES,
  user: GET_USERS
}