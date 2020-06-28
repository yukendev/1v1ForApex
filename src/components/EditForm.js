import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { COLOR } from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import RadioButton from "./RadioButton";
import "@firebase/firestore";
import firebase from "firebase";

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

export default function EditForm({ text, route, cansel, initial }) {
  const currentUser = firebase.auth().currentUser;
  const [platformChecked, setPlatformChecked] = useState("first");
  const [id, setId] = useState("");
  const navigation = useNavigation();
  const db = firebase.firestore();

  const [defaultValue, setDefaultValue] = useState("");

  db.collection("users")
    .doc(currentUser.uid)
    .get()
    .then((doc) => setDefaultValue(doc.data().apexId));
  return (
    <View style={styles.container}>
      <Text style={styles.text}>ID</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={(id) => setId(id)}
        autoCapitalize="none"
        defaultValue={defaultValue}
      />
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
      <TouchableOpacity
        style={styles.editContainer}
        onPress={() =>
          db
            .collection("users")
            .doc(currentUser.uid)
            .update({
              apexId: id,
              platform: platformChecked === "first" ? "PC" : "PS4",
            })
            .then(() => navigation.navigate("Home"))
            .catch((error) => console.log(error))
        }
      >
        <Text style={styles.editText}>{text}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.canselContainer}
        onPress={() =>
          initial
            ? db
                .collection("users")
                .doc(currentUser.uid)
                .update({
                  apexId: "",
                  platform: "",
                })
                .then(() => navigation.navigate(route))
                .catch((error) => console.log(error))
            : navigation.goBack()
        }
      >
        <Text style={styles.cansel}>{cansel}</Text>
      </TouchableOpacity>
    </View>
  );
}
