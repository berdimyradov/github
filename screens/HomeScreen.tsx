import { useLazyQuery, useReactiveVar } from "@apollo/client";
import React, { useMemo, useState } from "react";
import { SafeAreaView, SectionList, StyleSheet } from "react-native";
import { Searchbar } from "react-native-paper";
import { Queries } from "../api/GraphQL/Queries";
import { SectionItem } from "../components/SectionItem";
import { Text, View } from "../components/Themed";
import { needleVar } from "../constants/ReactiveVars";
import { RootScreenProps } from "../types";

export default function HomeScreen({ navigation }: RootScreenProps<"Home">) {
  const needle = useReactiveVar(needleVar);
  const [search, setSearch] = useState(needleVar);

  const options = { variables: { needle } };
  const [getRs, r] = useLazyQuery(Queries.repository, options);
  const [getIs, i] = useLazyQuery(Queries.issue, options);
  const [getUs, u] = useLazyQuery(Queries.user, options);

  const onSubmit = (query) => {
    needleVar(query.nativeEvent.text);
    getRs();
    getIs();
    getUs();
  };

  const isLoading = r.loading || i.loading || u.loading;
  const isCalled = r.called || i.called || u.called;
  const sections: { title: string; data: {}[]; count: number }[] =
    useMemo(() => {
      if (isLoading || !isCalled) {
        return [];
      }
      return [
        {
          title: "Repositories",
          data: r.data?.search.nodes || [],
          count: r.data?.search.repositoryCount || 0,
        },
        {
          title: "Issues",
          data: i.data?.search.nodes.filter((node) => node.id) || [],
          count: i.data?.search.issueCount || 0,
        },
        {
          title: "Users",
          data: u.data?.search.nodes.filter((node) => node.id) || [],
          count: u.data?.search.userCount || 0,
        },
      ];
    }, [r.data, i.data, u.data]);

  return (
    <SafeAreaView style={styles.container}>
      <Searchbar
        style={styles.search}
        placeholder="Search in GitHub"
        onChangeText={setSearch}
        onSubmitEditing={onSubmit}
        value={search}
      />

      <SectionList
        contentContainerStyle={styles.listContent}
        sections={sections}
        keyExtractor={(item, index) => item.id + index}
        renderItem={(el) => {
          const { item, section, index } = el;
          return <SectionItem section={section} item={item} index={index} />;
        }}
        renderSectionHeader={({ section: { title, data } }) =>
          data.length ? <Text style={styles.sectionHeader}>{title}</Text> : null
        }
        stickySectionHeadersEnabled={false}
        ListEmptyComponent={() => {
          if (isLoading) {
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
  },
  search: {
    marginVertical: 5,
  },
  listContent: {
    flexGrow: 1,
  },
  sectionHeader: {
    marginTop: 25,
    marginBottom: 15,
    marginStart: 15,
    fontSize: 20,
    fontWeight: "bold",
  },
  emptyView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
