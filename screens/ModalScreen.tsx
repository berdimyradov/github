import { useRoute } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";
import { Item } from "../components/Item";
import { Text, View } from "../components/Themed";

export default function ModalScreen() {
  const route = useRoute();

  return (
    <View style={styles.container}>
      <Item {...route.params} />
      <Text>{JSON.stringify(route.params)}</Text>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
