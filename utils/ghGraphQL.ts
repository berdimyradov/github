import { graphql } from "@octokit/graphql";
import { SearchResultItemConnection } from "@octokit/graphql-schema";

const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `bearer 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`,
  },
});

const queries = {
  repos: `query ($needle: String!) {
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
          languages(first: 1, orderBy: {field: SIZE, direction: DESC}) {
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
  }`,
  issues: `query ($needle: String!) {
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
  }`,
  users: `query ($needle: String!) {
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
  }`,
};

const fetchRepositories = async (needle: string) => {
  const result = await graphqlWithAuth<{ search: SearchResultItemConnection }>({
    query: queries.repos,
    needle,
  });

  // console.log("COUNT", JSON.stringify(result.search.repositoryCount));
  // console.log("Nodes", JSON.stringify(result.search.nodes));
  return result.search.nodes || [];
};

const fetchIssues = async (needle: string) => {
  const result = await graphqlWithAuth<{ search: SearchResultItemConnection }>({
    query: queries.issues,
    needle,
  });

  console.log("Issues:COUNT", JSON.stringify(result.search.issueCount));
  // console.log("Issues:Nodes", JSON.stringify(result.search.nodes));
  return result.search.nodes || [];
};

const fetchUsers = async (needle: string) => {
  const result = await graphqlWithAuth<{ search: SearchResultItemConnection }>({
    query: queries.users,
    needle,
  });

  // console.log("Users:COUNT", JSON.stringify(result.search.userCount));
  // console.log("Users:Nodes", JSON.stringify(result.search.nodes));
  return result.search.nodes?.filter((node) => node?.id) || [];
};

export const GitHubGraphQL = {
  searchRepositories: fetchRepositories,
  searchIssues: fetchIssues,
  searchUsers: fetchUsers,
};
