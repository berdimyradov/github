import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, TouchableHighlight } from "react-native";
import { QueryType } from "../../api/GraphQL/Queries";
import { Text, View } from "../Themed";

type Props = {
  text: string;
  list: {
    title: string;
    type: QueryType
  }
}

export const GoToListLink = ({ text, list }: Props) => {
  const navigation = useNavigation();
  // console.log("NAV", navigation);

  return (
    <TouchableHighlight
      onPress={() => {
        navigation.push("List", list);
      }}
    >
      <View style={styles.container}>
        <Text style={styles.text}>{text}</Text>
        <FontAwesome5 name="angle-right" size={24} color="#c2c2c2" />
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
  },
});
