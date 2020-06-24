import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { COLOR } from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 40,
    width: 50,
    justifyContent: "center",
    backgroundColor: COLOR.LIGHT_RED,
    alignItems: "center",
    borderRadius: 9,
    margin: 5,
  },
  text: {
    fontSize: 30,
    color: "#fff",
    position: "absolute",
    top: -2.5,
  },
});

export default function AddButton() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("Add")}
    >
      <Text style={styles.text}>+</Text>
    </TouchableOpacity>
  );
}
