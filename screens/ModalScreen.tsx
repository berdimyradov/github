import { useReactiveVar } from "@apollo/client";
import { FontAwesome, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Platform, StyleSheet } from "react-native";
import {
  Avatar,
  Caption,
  Text,
  Title,
  TouchableRipple
} from "react-native-paper";
import { View } from "../components/Themed";
import { selectedNodeVar } from "../constants/ReactiveVars";
import { numberToString } from "../utils/numberToString";

export const MenuItemIcon = ({ color, children }: any) => {
  return (
    <View style={[styles.menuItemIcon, { backgroundColor: color }]}>
      {children}
    </View>
  );
};

export default function ModalScreen() {
  const selectedNode = useReactiveVar(selectedNodeVar);

  console.log("DATA", selectedNode);

  if (selectedNode?.__typename !== "Repository") {
    return <Text>{JSON.stringify(selectedNode)}</Text>
  }

  return (
    <View style={styles.container}>
      <View style={styles.userInfoSection}>
        <View style={{ flexDirection: "row", marginTop: 15 }}>
          <Avatar.Image
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
            }}
            source={{
              uri: selectedNode.owner.avatarUrl,
            }}
            size={50}
          />
          <View style={{ marginLeft: 20 }}>
            <Title style={[styles.title]}>{selectedNode.name}</Title>
            <Caption style={styles.caption}>{selectedNode.owner.login}</Caption>
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <FontAwesome name="info-circle" size={24} color="#7d7d7d" />
          <Text style={{ color: "#777777", marginLeft: 20 }}>
            {selectedNode.description}
          </Text>
        </View>
        <View style={styles.row}>
          <FontAwesome5 name="link" size={24} color="#7d7d7d" />
          <Text style={{ color: "#777777", marginLeft: 20 }}>
            {selectedNode.homepageUrl}
          </Text>
        </View>
      </View>

      <View style={styles.infoBoxWrapper}>
        <View
          style={[
            styles.infoBox,
            {
              borderRightColor: "#dddddd",
              borderRightWidth: 1,
            },
          ]}
        >
          <Title>{numberToString(selectedNode.stargazers.totalCount)}</Title>
          <FontAwesome5 name="star" size={24} color="#7d7d7d" />
        </View>
        <View style={styles.infoBox}>
          <Title>{numberToString(selectedNode.forkCount)}</Title>
          <FontAwesome5 name="code-branch" size={24} color="#7d7d7d" />
        </View>
      </View>

      <View style={styles.menuWrapper}>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <MenuItemIcon color="#00d52f">
              <FontAwesome5 name="dot-circle" size={24} color="white" />
            </MenuItemIcon>
            <Text style={styles.menuItemText}>Issues</Text>
            <Text style={styles.menuItemNumber}>
              {selectedNode.issues.totalCount}
            </Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <MenuItemIcon color="#006fff">
              <Ionicons name="git-pull-request" size={24} color="white" />
            </MenuItemIcon>
            <Text style={styles.menuItemText}>Pull Requests</Text>
            <Text style={styles.menuItemNumber}>
              {selectedNode.pullRequests.totalCount}
            </Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <MenuItemIcon color="#31343d">
              <FontAwesome name="tag" size={24} color="white" />
            </MenuItemIcon>
            <Text style={styles.menuItemText}>Releases</Text>
            <Text style={styles.menuItemNumber}>
              {selectedNode.releases.totalCount}
            </Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <MenuItemIcon color="#ffcb00">
              <FontAwesome name="eye" size={24} color="white" />
            </MenuItemIcon>
            <Text style={styles.menuItemText}>Watchers</Text>
            <Text style={styles.menuItemNumber}>
              {selectedNode.watchers.totalCount}
            </Text>
          </View>
        </TouchableRipple>
      </View>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
    justifyContent: "space-between",
    alignItems: "center",
  },
  menuItemText: {
    flexGrow: 1,
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
  menuItemNumber: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
  menuItemIcon: {
    width: 36,
    height: 36,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    height: 100,
    marginVertical: 10,
    flexDirection: "row",
    shadowColor: "#999",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  cardImgWrapper: {
    flex: 1,
  },
  cardImg: {
    height: "100%",
    width: "100%",
    alignSelf: "center",
    borderRadius: 8,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  cardInfo: {
    flex: 2,
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: "#fff",
  },
  cardTitle: {
    fontWeight: "bold",
  },
  cardDetails: {
    fontSize: 12,
    color: "#444",
  },
});
