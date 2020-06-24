import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { COLOR } from "../constants/Colors";
import Ionicons from "react-native-vector-icons/FontAwesome";

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.FORM_BACKGROUND,
    width: "80%",
    borderRadius: 5,
    opacity: 0.8,
    marginVertical: 10,
    marginLeft: "auto",
    marginRight: "auto",
  },
  userInfo: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  request: {
    flexDirection: "row",
    width: "70%",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  userId: { color: "#fff", fontSize: 20 },
  platform: {
    fontSize: 20,
    padding: 3,
  },
  platformContainer: {
    backgroundColor: COLOR.YELLOW,
    borderRadius: 5,
  },
  postedAt: { color: "#fff", fontSize: 20 },
  playerSkill: {
    color: "#fff",
    fontSize: 20,
    borderColor: COLOR.DEEP_RED,
    borderRadius: 5,
    borderWidth: 3,
    padding: 2,
  },
  playTime: {
    color: "#fff",
    fontSize: 20,
    borderColor: COLOR.DEEP_RED,
    borderRadius: 5,
    borderWidth: 3,
    padding: 2,
  },
  comment: { fontSize: 18, padding: 15 },
  commentContainer: {
    marginTop: 30,
    backgroundColor: "#fff",
    width: "90%",
    borderRadius: 2,
    marginRight: "auto",
    marginLeft: "auto",
    marginBottom: 30,
  },
  openButton: {
    width: "100%",
    alignItems: "center",
  },
  entryText: {
    color: COLOR.DEEP_RED,
    fontSize: 25,
    padding: 10,
  },
  entryContainer: {
    backgroundColor: COLOR.YELLOW,
    width: "70%",
    marginRight: "auto",
    marginLeft: "auto",
    alignItems: "center",
    marginVertical: 10,
    borderRadius: 5,
  },
});

export default function List({
  id,
  platform,
  postedAt,
  playerSkill,
  playTime,
  comment,
}) {
  const [isOpened, setIsOpened] = useState(false);
  let iconName = isOpened ? "caret-up" : "caret-down";
  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Text style={styles.userId}>{id}</Text>
        <View style={styles.platformContainer}>
          <Text style={styles.platform}>{platform}</Text>
        </View>
        <Text style={styles.postedAt}>{postedAt}</Text>
      </View>
      <View style={styles.request}>
        <Text style={styles.playerSkill}>{playerSkill}</Text>
        <Text style={styles.playTime}>{playTime}</Text>
      </View>
      {isOpened ? (
        <View style={styles.commentContainer}>
          <Text style={styles.comment}>{comment}</Text>
        </View>
      ) : null}

      <TouchableOpacity
        style={styles.openButton}
        onPress={() => setIsOpened(!isOpened)}
      >
        <Ionicons name={iconName} size={30} color={"#fff"} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.entryContainer}>
        <Text style={styles.entryText}>エントリーする！</Text>
      </TouchableOpacity>
    </View>
  );
}