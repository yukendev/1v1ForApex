import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { COLOR } from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.FORM_BACKGROUND,
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.8,
    width: "80%",
    height: 400,
    borderRadius: 5,
  },
  text: { color: "#fff", fontSize: 20 },
  postContainer: {
    backgroundColor: COLOR.YELLOW,
    alignItems: "center",
    width: "30%",
    borderRadius: 5,
  },
  post: { fontSize: 30, color: "#fff", padding: 5 },
  cansel: { fontSize: 20, color: "#fff", textDecorationLine: "underline" },
});

export default function AddForm() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>プレイヤーレベル</Text>
      <Text style={styles.text}>対戦時間</Text>
      <TouchableOpacity style={styles.postContainer}>
        <Text style={styles.post}>投稿</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.canselContainer}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.cansel}>キャンセル</Text>
      </TouchableOpacity>
    </View>
  );
}
