import { gql, TypedDocumentNode } from "@apollo/client";
import { gqlClient } from "./gqlClient";
import { RepositoriesQuery, IssuesQuery, UsersQuery } from "./types"

const getRepositories: TypedDocumentNode<RepositoriesQuery> = gql`
  query ($needle: String!) {
    search(query: $needle, first: 10, type: REPOSITORY) {
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

const getIssues: TypedDocumentNode<IssuesQuery> = gql`
  query ($needle: String!) {
    search(query: $needle, first: 10, type: ISSUE) {
      nodes {
        ... on Issue {
          id
          title
          state
          number
          author {
            login
          }
        }
      }
      issueCount
    }
  }
`;

const getUsers: TypedDocumentNode<UsersQuery> = gql`
  query ($needle: String!) {
    search(query: $needle, first: 10, type: USER) {
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

const fetchRepositories = async (needle: string) => {
  const {
    data: {
      search: { nodes, repositoryCount },
    },
  } = await gqlClient.query({
    query: getRepositories,
    variables: {
      needle,
    },
  });
  // console.log("nodes", repositoryCount, nodes);
  return nodes;
};

const fetchIssues = async (needle: string) => {
  const {
    data: {
      search: { nodes, issueCount },
    },
  } = await gqlClient.query({
    query: getIssues,
    variables: {
      needle,
    },
  });
  // console.log("nodes", issueCount, nodes);
  return nodes;
};

const fetchUsers = async (needle: string) => {
  const {
    data: {
      search: { nodes, userCount },
    },
  } = await gqlClient.query({
    query: getUsers,
    variables: {
      needle,
    },
  });
  return nodes.filter((node) => node.id);
};

export const GitHubService = {
  searchRepositories: fetchRepositories,
  searchIssues: fetchIssues,
  searchUsers: fetchUsers,
};
