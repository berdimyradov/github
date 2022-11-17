import { useQuery, useReactiveVar } from "@apollo/client";
import { useRoute } from "@react-navigation/native";
import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Queries, QueryType } from "../api/GraphQL/Queries";
import { nodeMapper } from "../api/nodeMapper";
import { EmptyList } from "../components/EmptyList";
import { Item } from "../components/Item";
import { needleVar, selectedNodeVar } from "../constants/ReactiveVars";

export default function ListScreen() {
  const route = useRoute();
  const needle = useReactiveVar(needleVar);

  const { type }: { type: QueryType } = route.params;
  const { loading, data } = useQuery(Queries[type], {
    variables: { needle, first: 10 },
  });

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <FlatList
        contentContainerStyle={styles.listContent}
        data={data?.search.nodes.map(nodeMapper)}
        keyExtractor={(item, index) => `${item.id} + ${index}`}
        renderItem={({ item }) => (
          <Item
            {...item}
            onPress={() => {
              selectedNodeVar(
                data?.search.nodes.find((node) => node.id === item.id)
              );
            }}
          />
        )}
        ListEmptyComponent={() => <EmptyList loading={loading} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  listContent: {
    flexGrow: 1,
  },
});
