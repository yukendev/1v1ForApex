import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLOR } from "../constants/Colors";
import AddButton from "./AddButon";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.DEEP_RED,
    height: 90,
    alignItems: "center",
  },
  text: {
    color: "#fff",
    position: "absolute",
    bottom: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  addButton: {
    position: "absolute",
    right: 10,
    bottom: 3,
  },
});

onPress = () => {
  const navigation = useNavigation();
  navigation.navigate("Add");
};

export default function Header() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>1v1 for APEX</Text>
      <View style={styles.addButton}>
        <AddButton onPress={() => onPress()} />
      </View>
    </View>
  );
}
