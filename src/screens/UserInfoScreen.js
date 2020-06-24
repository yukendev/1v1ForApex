import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { COLOR } from "../constants/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLOR.BACKGROUND,
  },
  infoContainer: {
    backgroundColor: COLOR.FORM_BACKGROUND,
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.8,
    width: "80%",
    height: 300,
    borderRadius: 5,
  },
  idContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "90%",
    marginBottom: 20,
  },
  id: { color: "#fff", fontSize: 21 },
  editContainer: {},
  edit: { color: "#fff", fontSize: 21, textDecorationLine: "underline" },
  platformContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "90%",
    marginBottom: 20,
  },
  platform: { color: "#fff", fontSize: 21 },
  logoutContainer: {
    backgroundColor: COLOR.YELLOW,
    marginTop: 30,
    marginBottom: 20,
    borderRadius: 3,
  },
  logout: { color: "#fff", fontSize: 25, padding: 10 },
  helpContainer: {},
  help: { color: "#fff", fontSize: 15, textDecorationLine: "underline" },
});

export default function UserInfo() {
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <View style={styles.idContainer}>
          <Text style={styles.id}>ID: uhiua8y3kjn8qih</Text>
          <TouchableOpacity style={styles.editContainer}>
            <Text style={styles.edit}>編集</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.platformContainer}>
          <Text style={styles.platform}>Platform: PS4</Text>
          <TouchableOpacity style={styles.editContainer}>
            <Text style={styles.edit}>編集</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.logoutContainer}>
          <Text style={styles.logout}>ログアウト</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.helpContainer}>
          <Text style={styles.help}>ヘルプ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
