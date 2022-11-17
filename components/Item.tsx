import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  ImageSourcePropType,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import { Text, View } from "./Themed";

type Props = {
  source?: ImageSourcePropType;
  left: React.ReactNode;
  title: string;
  description: string;
  footer?: React.ReactNode;
};

export const Item = (props: Props) => {
  const { left, title, description, footer } = props;
  const navigation = useNavigation();

  return (
    <TouchableHighlight
      onPress={() => {
        navigation.navigate("Modal");
      }}
    >
      <View style={styles.container}>
        <View style={styles.left}>{left}</View>
        <View style={styles.right}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
          </View>
          <Text style={styles.description}>{description}</Text>
          {footer}
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderColor: "#f2f2f2",
    borderBottomWidth: 1,
  },
  left: {
    marginTop: 15,
    marginStart: 15,
  },
  right: {
    flexShrink: 1,
    padding: 15,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
  },
  description: {
    marginVertical: 5,
    color: "#7d7d7d",
  },
});
