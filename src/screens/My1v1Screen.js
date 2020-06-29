import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLOR } from "../constants/Colors";
import MyList from "../components/MyList";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLOR.BACKGROUND,
  },
  title: { fontSize: 30, marginBottom: 20 },
  id: {
    fontSize: 25,
    padding: 10,
  },
  idContainer: {
    backgroundColor: COLOR.YELLOW,
    width: "80%",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 20,
  },
});

export default function My1v1() {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>My1v1</Text>
      </View>
      <MyList
        id={"yuk*******"}
        platform={"PC"}
        postedAt={"18:08"}
        playerSkill={"上級者求む"}
        playTime={"16:00~17:00"}
        comment={
          "lorem ipsum（ロレム・イプサム、略してリプサム lipsum ともいう）とは、出版、ウェブデザイン、グラフィックデザインなどの諸分野において使用されている典型的なダミーテキスト。"
        }
      />
      <View style={styles.idContainer}>
        <Text style={styles.id}>相手のID: kjhius45sjhv42</Text>
      </View>
    </View>
  );
}
