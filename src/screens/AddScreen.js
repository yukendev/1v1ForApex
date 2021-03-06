import React from "react";
import { StyleSheet, ScrollView } from "react-native";
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
    <ScrollView scrollEnabled={true} contentContainerStyle={styles.container}>
      <AddForm />
    </ScrollView>
  );
}
