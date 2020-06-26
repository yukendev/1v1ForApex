import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { COLOR } from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import RadioButton from "./RadioButton";

const styles = StyleSheet.create({
  container: {
    height: 400,
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLOR.FORM_BACKGROUND,
    opacity: 0.8,
    borderRadius: 10,
  },
  text: { color: "#fff", fontSize: 25 },
  textInput: {
    height: 35,
    width: "80%",
    backgroundColor: "#fff",
    marginBottom: 30,
    fontSize: 20,
    padding: 5,
    borderRadius: 3,
  },
  platformContainer: {},
  platformItem: { flexDirection: "row", marginVertical: 5 },
  buttonText: { color: "#fff", fontSize: 20, marginLeft: 10 },
  editContainer: {
    backgroundColor: COLOR.YELLOW,
    borderRadius: 3,
    marginTop: 30,
  },
  editText: { fontSize: 30, color: "#fff", padding: 7 },
  cansel: {
    fontSize: 20,
    color: "#fff",
    textDecorationLine: "underline",
    marginBottom: 20,
    marginTop: 10,
  },
});

export default function EditForm() {
  const [platformChecked, setPlatformChecked] = useState("first");
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>ID</Text>
      <TextInput style={styles.textInput} />
      <Text style={styles.text}>PlatForm</Text>
      <View style={styles.platformContainer}>
        <View style={styles.platformItem}>
          <RadioButton
            onPress={() => setPlatformChecked("first")}
            checked={platformChecked === "first" ? true : false}
          />
          <Text style={styles.buttonText}>PC</Text>
        </View>
        <View style={styles.platformItem}>
          <RadioButton
            onPress={() => setPlatformChecked("second")}
            checked={platformChecked === "second" ? true : false}
          />
          <Text style={styles.buttonText}>PS4</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.editContainer}>
        <Text style={styles.editText}>編集</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.canselContainer}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.cansel}>キャンセル</Text>
      </TouchableOpacity>
    </View>
  );
}
