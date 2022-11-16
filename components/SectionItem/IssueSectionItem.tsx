import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { GoToListLink } from "./GoToListLink";
import { Item } from "../Item";

export const IssueSectionItem = (props) => {
  if (props.index === 3) {
    return (
      <GoToListLink
        text={`See ${props.issueCount} more issues`}
        list={{
          title: "Issues",
          type: "issue",
        }}
      />
    );
  }

  if (props.index > 3) {
    return null;
  }

  return (
    <Item
      left={<FontAwesome5 name="dot-circle" size={24} color="green" />}
      title={`${props.item.repository.nameWithOwner}  #${props.item.number}`}
      description={props.item.title}
    />
  );
};
