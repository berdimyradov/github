import { useQuery, useReactiveVar } from "@apollo/client";
import { FontAwesome5 } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import React, { useCallback } from "react";
import { FlatList, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Queries, QueryType } from "../api/GraphQL/Queries";
import { Item } from "../components/Item";
import { Text, View } from "../components/Themed";
import { needleVar } from "../constants/ReactiveVars";

export default function ListScreen() {
  const route = useRoute();
  const needle = useReactiveVar(needleVar);

  const { type }: { type: QueryType } = route.params;
  const { loading, data } = useQuery(Queries[type], {
    variables: { needle, first: 10 },
  });

  const renderItem = useCallback<any>(
    ({ item }) => {
      let itemCmp;
      switch (type) {
        case "repository":
          itemCmp = (
            <Item
              left={
                <Image
                  style={styles.logo}
                  source={{ uri: item.owner.avatarUrl }}
                />
              }
              title={item.nameWithOwner}
              description={item.description}
            />
          );
          break;
        case "issue":
          itemCmp = (
            <Item
              left={<FontAwesome5 name="dot-circle" size={24} color="green" />}
              title={`${item.repository.nameWithOwner}  #${item.number}`}
              description={item.title}
            />
          );
          break;
        case "user":
          itemCmp = (
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
          break;
      }

      return itemCmp;
    },
    [type]
  );

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <FlatList
        contentContainerStyle={styles.listContent}
        data={data?.search.nodes}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={() => {
          if (loading) {
            return (
              <View style={styles.emptyView}>
                <Text>Loading...</Text>
              </View>
            );
          }

          return (
            <View style={styles.emptyView}>
              <Text style={{ fontSize: 32 }}>Find your stuff.</Text>
              <Text style={{ fontSize: 16, color: "#eee" }}>
                Search all of GitHub for Repositories, Issues, Users
              </Text>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
  },
  logo: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  listContent: {
    flexGrow: 1,
  },
  emptyView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
