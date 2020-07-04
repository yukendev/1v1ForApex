import React from "react";
import { StyleSheet, ScrollView, Button } from "react-native";
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
      <EditForm text="編集" route="Home" cansel="キャンセル" initial={false} />
    </ScrollView>
  );
}
