const uri = "https://api.github.com/graphql";

const headers = new Headers();
headers.append(
  "Authorization",
  "bearer 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"
);
headers.append("Content-Type", "application/json");

const queries = {
  repositories: `
  query ($query: String!) {
    search(query: $query, first: 10, type: REPOSITORY) {
      edges {
        node {
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
      }
    }
  }
  `,
  issues: `
query ($query: String!) {
  search(query: $query, first: 10, type: ISSUE) {
    edges {
      node {
        ... on Issue {
          id
          title
          author {
            login
          }
        }
      }
    }
  }
}
`,
  users: `
  query ($query: String!) {
    search(query: $query, first: 10, type: USER) {
      edges {
        node {
          ... on User {
            id
            bio
            avatarUrl
            login
            name
          }
        }
      }
    }
  }
  `,
};

const fetchRepositories = async (needle: string) => {
  return await fetch(uri, {
    method: "POST",
    headers,
    body: JSON.stringify({
      query: queries.repositories,
      variables: { query: needle },
    }),
    redirect: "follow",
  })
    .then((response) => response.text())
    .then((result) =>
      JSON.parse(result).data.search.edges.map((edge) => edge.node)
    )
    .catch((error) => console.log("error", error));
};

const fetchIssues = async (needle: string) => {
  return await fetch(uri, {
    method: "POST",
    headers,
    body: JSON.stringify({
      query: queries.issues,
      variables: { query: needle },
    }),
    redirect: "follow",
  })
    .then((response) => response.text())
    .then((result) => {
      console.log("issues", result);
      return JSON.parse(result).data.search.edges.map((edge) => edge.node);
    })
    .catch((error) => console.log("error", error));
};

const fetchUsers = async (needle: string) => {
  return await fetch(uri, {
    method: "POST",
    headers,
    body: JSON.stringify({
      query: queries.users,
      variables: { query: needle },
    }),
    redirect: "follow",
  })
    .then((response) => response.text())
    .then((result) =>
      JSON.parse(result)
        .data.search.edges.map((edge) => edge.node)
        .filter((node) => node.id)
    )
    .catch((error) => console.log("error", error));
};

export const GitHubGraphQL = {
  searchRepositories: fetchRepositories,
  searchIssues: fetchIssues,
  searchUsers: fetchUsers,
};
