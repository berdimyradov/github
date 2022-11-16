import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Image } from "react-native";
import { Text, View } from "../Themed";
import { GoToListLink } from "./GoToListLink";
import { Item } from "../Item";

export const RepositorySectionItem = (props) => {
  if (props.item.count) {
    return (
      <GoToListLink
        text={`See ${props.item.count} more repositories`}
        list={{
          title: "Repositories",
          type: "repository",
        }}
      />
    );
  }

  return (
    <Item
      left={
        <Image
          style={styles.logo}
          source={{ uri: props.item.owner.avatarUrl }}
        />
      }
      title={props.item.nameWithOwner}
      description={props.item.description}
      footer={
        <View style={styles.footer}>
          <FontAwesome name="star-o" size={24} color="#7d7d7d" />
          <Text style={styles.metaInfoText}>
            {props.item.watchers.totalCount}
          </Text>
          <FontAwesome
            name="circle"
            size={24}
            color={props.item.languages.edges[0].node.color}
          />
          <Text style={styles.metaInfoText}>
            {props.item.languages.edges[0].node.name}
          </Text>
        </View>
      }
    />
  );
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
