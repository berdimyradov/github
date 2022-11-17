import { useLazyQuery, useReactiveVar } from "@apollo/client";
import React, { useMemo, useState } from "react";
import {
  NativeSyntheticEvent, SafeAreaView,
  SectionList,
  StyleSheet, TextInputSubmitEditingEventData
} from "react-native";
import { Searchbar } from "react-native-paper";
import { Queries, QueryType } from "../api/GraphQL/Queries";
import { nodeMapper } from "../api/utils";
import { EmptyList } from "../components/EmptyList";
import { GoToListLink } from "../components/GoToListLink";
import { Item } from "../components/Item";
import { Text } from "../components/Themed";
import { needleVar } from "../constants/ReactiveVars";
import { RootScreenProps } from "../types";

type SectionType = {
  title: string;
  data: {}[];
  count?: number;
};

type ItemType = {
  id: string;
  type: QueryType,
  left: React.ReactNode;
  title: string;
  description: string;
  footer: React.ReactNode;
} & { count: number; type: QueryType };

export default function HomeScreen({ navigation }: RootScreenProps<"Home">) {
  const needle = useReactiveVar(needleVar);
  const [search, setSearch] = useState(needleVar);

  const options = { variables: { needle, first: 3 } };
  const [getRs, r] = useLazyQuery(Queries.repository, options);
  const [getIs, i] = useLazyQuery(Queries.issue, options);
  const [getUs, u] = useLazyQuery(Queries.user, options);

  const onSubmit = (
    query: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => {
    needleVar(query.nativeEvent.text);
    getRs();
    getIs();
    getUs();
  };

  const isLoading = r.loading || i.loading || u.loading;
  const isCalled = r.called || i.called || u.called;
  const sections: SectionType[] = useMemo(() => {
    if (isLoading || !isCalled) {
      return [];
    }

    return [
      {
        title: "Repositories",
        data: [
          ...r.data?.search.nodes.map(nodeMapper),
          { count: r.data?.search.repositoryCount, type: "repository" },
        ],
      },
      {
        title: "Issues",
        data: [
          ...i.data?.search.nodes.map(nodeMapper),
          { count: i.data?.search.issueCount, type: "issue" },
        ],
      },
      {
        title: "Users",
        data: [
          ...u.data?.search.nodes.map(nodeMapper),
          { count: u.data?.search.userCount, type: "user" },
        ],
      },
    ];
  }, [r.data, i.data, u.data]);

  const renderItem = ({
    item,
    section,
  }: {
    item: ItemType;
    section: SectionType;
  }) => {
    if (item.count) {
      return (
        <GoToListLink
          text={`See ${item.count} more ${section.title.toLocaleLowerCase()}`}
          list={{
            title: section.title,
            type: item.type,
          }}
        />
      );
    }

    return <Item {...item} />;
  };

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
        keyExtractor={(item, index) => `${item.id} + ${index}`}
        renderSectionHeader={({ section: { title, data } }) =>
          data.length ? <Text style={styles.sectionHeader}>{title}</Text> : null
        }
        renderItem={renderItem}
        stickySectionHeadersEnabled={false}
        ListEmptyComponent={() => <EmptyList loading={isLoading} />}
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
});
