import { makeVar } from "@apollo/client";
import { Repository, Issue, User } from "@octokit/graphql-schema";

export const needleVar = makeVar("");

export const selectedNodeVar = makeVar<Repository | Issue | User | undefined>(undefined);
