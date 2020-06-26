import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { COLOR } from "../constants/Colors";
import EditForm from "../components/EditForm";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLOR.BACKGROUND,
  },
});

export default function Edit() {
  return (
    <ScrollView scrollEnabled={true} contentContainerStyle={styles.container}>
      <Text>Edit</Text>
      <EditForm />
    </ScrollView>
  );
}
