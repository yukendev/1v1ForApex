import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { COLOR } from "../constants/Colors";
import UserInfoCompo from "../components/UserInfoCompo";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.BACKGROUND,
  },
});

export default function UserInfo() {
  return (
    <View style={styles.container}>
      <UserInfoCompo />
    </View>
  );
}
