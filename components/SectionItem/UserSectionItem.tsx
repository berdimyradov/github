import React from "react";
import { Image, StyleSheet } from "react-native";
import { Text } from "../Themed";
import { GoToListLink } from "./GoToListLink";
import { Item } from "../Item";

export const UserSectionItem = (props) => {
  if (props.index === 3) {
    return (
      <GoToListLink
        text={`See ${props.userCount} more users`}
        list={{
          title: "Users",
          type: "user",
        }}
      />
    );
  }

  if (props.index > 3) {
    return null;
  }

  return (
    <Item
      left={
        <Image style={styles.logo} source={{ uri: props.item.avatarUrl }} />
      }
      title={props.item.name}
      description={props.item.login}
      footer={<Text>{props.item.bio}</Text>}
    />
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
});
