import React from "react";
import { Image, StyleSheet } from "react-native";
import { Text } from "../Themed";
import { GoToListLink } from "./GoToListLink";
import { Item } from "../Item";

export const UserSectionItem = (props) => {
  const { item } = props;
  if (item.count) {
    return (
      <GoToListLink
        text={`See ${item.count} more users`}
        list={{
          title: "Users",
          type: "user",
        }}
      />
    );
  }

  return (
    <Item
      left={
        item.avatarUrl && (
          <Image
            style={styles.logo}
            source={{
              uri: item.avatarUrl,
            }}
          />
        )
      }
      title={item.name}
      description={item.login}
      footer={item.bio && <Text>{item.bio}</Text>}
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
