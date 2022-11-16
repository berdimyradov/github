import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { GoToListLink } from "./GoToListLink";
import { Item } from "../Item";

export const IssueSectionItem = (props) => {
  if (props.item.count) {
    return (
      <GoToListLink
        text={`See ${props.item.count} more issues`}
        list={{
          title: "Issues",
          type: "issue",
        }}
      />
    );
  }

  return (
    <Item
      left={<FontAwesome5 name="dot-circle" size={24} color="green" />}
      title={`${props.item.repository.nameWithOwner}  #${props.item.number}`}
      description={props.item.title}
    />
  );
};
