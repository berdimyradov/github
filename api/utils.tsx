import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { Repository, Issue, User } from "@octokit/graphql-schema";
import React from "react";
import { Image, Text, StyleSheet, View } from "react-native";

type Input = Repository | Issue | User;

type Output = {
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

export const nodeMapper = (item: Input): Output => {
  if (item.__typename === "Repository") {
    return {
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
      left: <FontAwesome5 name="dot-circle" size={24} color="green" />,
      title: `${item.repository.nameWithOwner}  #${item.number}`,
      description: item.title,
    };
  }
  if (item.__typename === "User") {
    return {
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
