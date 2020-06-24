import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLOR } from "../constants/Colors";
import AddForm from "../components/AddForm";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLOR.BACKGROUND,
  },
});

export default function Add() {
  return (
    <View style={styles.container}>
      <AddForm />
    </View>
  );
}
