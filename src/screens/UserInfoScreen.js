import React from "react";
import { View, StyleSheet } from "react-native";
import { COLOR } from "../constants/Colors";
import UserInfoCompo from "../components/UserInfoCompo";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLOR.BACKGROUND,
  },
});

export default function UserInfo() {
  return (
    <View style={styles.container}>
      <UserInfoCompo id="uiahh4ih245" platform="PC" />
    </View>
  );
}
