import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import COlOR, { COLOR } from "../constants/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLOR.BACKGROUND,
  },
});

export default function HelpScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Help</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Text>戻る</Text>
      </TouchableOpacity>
    </View>
  );
}
