import React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";

export const EmptyList = ({ loading }: { loading: boolean }) => {
  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 32 }}>Find your stuff.</Text>
      <Text style={{ fontSize: 16 }}>
        Search all of GitHub for Repositories, Issues, Users
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
