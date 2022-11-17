import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { Repository, Issue, User } from "@octokit/graphql-schema";
import React from "react";
import { Image, Text, StyleSheet, View } from "react-native";
import { QueryType } from "./GraphQL/Queries";

type Input = Repository | Issue | User;

type Output = {
  id: string;
  type: QueryType;
  left: any;
  title: string;
  description: string;
  footer?: React.ReactNode;
};

const octokitIcon =
  "https://docs.github.com/assets/cb-600/images/site/favicon.png";
const defaultTitle = "No title";
const defaultDescription = "Ooops! Somehow GitHub returned empty node";
const defaultFooter = "Defected object";

const makeId = () => {
  let ID = "";
  let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  for (var i = 0; i < 12; i++) {
    ID += characters.charAt(Math.floor(Math.random() * 36));
  }
  return ID;
};

export const nodeMapper = (item: Input): Output => {
  if (item.__typename === "Repository") {
    return {
      id: item.id,
      type: "repository",
      left: (
        <Image style={styles.logo} source={{ uri: item.owner.avatarUrl }} />
      ),
      title: item.nameWithOwner,
      description: item.description || "",
      footer: (
        <View style={styles.footer}>
          <FontAwesome name="star-o" size={24} color="#7d7d7d" />
          <Text style={styles.metaInfoText}>{item.watchers.totalCount}</Text>
          <FontAwesome
            name="circle"
            size={24}
            color={item.languages?.edges[0].node.color}
          />
          <Text style={styles.metaInfoText}>
            {item.languages?.edges[0].node.name}
          </Text>
        </View>
      ),
    };
  }
  if (item.__typename === "Issue") {
    return {
      id: item.id,
      type: "issue",
      left: <FontAwesome5 name="dot-circle" size={24} color="green" />,
      title: `${item.repository.nameWithOwner}  #${item.number}`,
      description: item.title,
    };
  }
  if (item.__typename === "User") {
    return {
      id: item.id,
      type: "user",
      left: (
        <Image
          style={styles.logo}
          source={{ uri: item.avatarUrl || octokitIcon }}
        />
      ),
      title: item.name || defaultTitle,
      description: item.login || defaultDescription,
      footer: <Text>{item.bio || defaultFooter}</Text>,
    };
  }

  return {
    id: makeId(),
    type: "user",
    left: <Image style={styles.logo} source={{ uri: octokitIcon }} />,
    title: defaultTitle,
    description: defaultDescription,
    footer: <Text>{defaultFooter}</Text>,
  };
};

const styles = StyleSheet.create({
  logo: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
  },
  metaInfoText: {
    color: "#7d7d7d",
    fontSize: 12,
    marginHorizontal: 5,
  },
});
