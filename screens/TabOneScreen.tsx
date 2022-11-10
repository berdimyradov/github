import { FontAwesome5 } from "@expo/vector-icons";
import React, { useState } from "react";
import { SectionList, StyleSheet, Image } from "react-native";
import { Avatar, Card, List, Paragraph, Searchbar } from "react-native-paper";
import { View, Text } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { GitHubGraphQL } from "../utils/ghGraphQL";

const RepositoryCard = (props) => {
  const { nameWithOwner, description, owner, watchers, languages } = props.item;

  return (
    <Card style={styles.card} mode="outlined">
      <Card.Title
        title={nameWithOwner}
        subtitle={description}
        left={() => (
          <Avatar.Image
            size={32}
            source={() => (
              <Image
                style={styles.tinyLogo}
                source={{ uri: owner.avatarUrl }}
              />
            )}
          />
        )}
      />
      <Card.Content style={styles.repoContent}>
        <List.Icon style={styles.listIcon} icon="star-outline" />
        <Paragraph>{watchers.totalCount}</Paragraph>
        <List.Icon
          style={styles.listIcon}
          color={languages.edges[0].node.color}
          icon="circle"
        />
        <Paragraph>{languages.edges[0].node.name}</Paragraph>
      </Card.Content>
    </Card>
  );
};

const IssueCard = (props) => {
  const { title, author } = props.item;
  return (
    <Card style={styles.card} mode="outlined">
      <Card.Title
        title={`${author.login} / ${title}`}
        subtitle={title}
        left={() => <FontAwesome5 name="dot-circle" size={24} color="green" />}
      />
    </Card>
  );
};

const UserCard = (props) => {
  const { bio, avatarUrl, login, name } = props.item;

  return (
    <Card style={styles.card} mode="outlined">
      <Card.Title
        title={name}
        subtitle={login}
        left={() => (
          <Avatar.Image
            size={32}
            source={() => (
              <Image style={styles.tinyLogo} source={{ uri: avatarUrl }} />
            )}
          />
        )}
      />
      <Card.Content style={styles.repoContent}>
        <Paragraph>{bio}</Paragraph>
      </Card.Content>
    </Card>
  );
};

const SectionItem = ({ section, item }) => {
  if (section === "Repositories") {
    return <RepositoryCard item={item} />;
  }

  if (section === "Issues") {
    return <IssueCard item={item} />;
  }

  if (section === "Users") {
    return <UserCard item={item} />;
  }

  return null;
};

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const [searchQuery, setSearchQuery] = useState("react");
  const [data, setData] = useState<{ title: string; data: any[] }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (query) => {
    setData([]);
    setIsLoading(true);

    const needle = query.nativeEvent.text;
    const repos = await GitHubGraphQL.searchRepositories(needle);
    const issues = await GitHubGraphQL.searchIssues(needle);
    const users = await GitHubGraphQL.searchUsers(needle);
    console.log("REPOS", JSON.stringify(repos));
    console.log("ISSUES", JSON.stringify(issues));
    console.log("USERS", JSON.stringify(users));

    setData([
      { title: "Repositories", data: repos },
      { title: "Issues", data: issues },
      { title: "Users", data: users },
    ]);
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <Searchbar
        style={styles.search}
        placeholder="Search in GitHub"
        onChangeText={setSearchQuery}
        onSubmitEditing={onSubmit}
        value={searchQuery}
      />
      {isLoading && (
        <View style={styles.emptyView}>
          <Text>Loading...</Text>
        </View>
      )}

      {(!isLoading && !!data.length) && (
        <SectionList
          sections={data}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item, section }) => (
            <SectionItem section={section.title} item={item} />
          )}
          renderSectionHeader={({ section: { title, data } }) =>
            data.length ? <Text style={styles.sectionHeader}>{title}</Text> : null
          }
        />
      )}

      {!isLoading && !data.length && (
        <View style={styles.emptyView}>
          <Text style={{ fontSize: 32 }}>Find your stuff.</Text>
          <Text style={{ fontSize: 16, color: "#eee" }}>
            Search all of GitHub for Repositories, Issues, Users
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    flex: 1,
  },
  search: {
    marginVertical: 5,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "bold",
  },  card: {
    marginVertical: 5,
  },
  repoContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  listIcon: {
    margin: 0,
  },
  tinyLogo: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  emptyView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
