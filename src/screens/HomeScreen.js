import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { COLOR } from "../constants/Colors";
import List from "../components/List";
import { DATA } from "../dummies/ListData";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: COLOR.BACKGROUND,
  },
});

export default function Home() {
  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <List
            id={item.id}
            platform={item.platform}
            postedAt={item.postedAt}
            playerSkill={item.playerSkill}
            playTime={item.playTime}
            comment={item.comment}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
