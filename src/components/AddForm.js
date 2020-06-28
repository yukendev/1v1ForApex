import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { COLOR } from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import RadioButton from "./RadioButton";
import "@firebase/firestore";
import firebase from "firebase";

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.FORM_BACKGROUND,
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.8,
    width: "80%",
    borderRadius: 5,
  },
  text: { color: "#fff", fontSize: 25, marginVertical: 15 },
  postContainer: {
    backgroundColor: COLOR.YELLOW,
    alignItems: "center",
    width: "30%",
    borderRadius: 5,
    marginVertical: 10,
  },
  post: { fontSize: 30, color: "#fff", padding: 5 },
  cansel: {
    fontSize: 20,
    color: "#fff",
    textDecorationLine: "underline",
    marginBottom: 20,
  },
  radioContainer: {
    borderWidth: 2,
    borderColor: COLOR.YELLOW,
    padding: 10,
    borderRadius: 5,
    width: "80%",
  },
  radioItemContainer: {
    flexDirection: "row",
    marginVertical: 5,
  },
  radioText: { color: "#fff", fontSize: 25, marginLeft: 5 },
  radioButton: { backgroundColor: "black", height: 40 },
  comment: {
    height: 70,
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 4,
    marginTop: 20,
    marginBottom: 80,
    fontSize: 20,
    padding: 5,
  },
});

export default function AddForm() {
  const navigation = useNavigation();
  const [levelChecked, setLevelChecked] = useState("first");
  const [timeChecked, setTimeChecked] = useState("first");
  const [comment, setComment] = useState("");
  const db = firebase.firestore();
  const currentUser = firebase.auth().currentUser;

  let Level;
  if (levelChecked == "first") {
    Level = "誰でも";
  } else if (levelChecked == "second") {
    Level = "初心者同士で";
  } else if (levelChecked == "third") {
    Level = "上級者求む";
  }

  let Time;
  if (timeChecked == "first") {
    Time = "制限無し";
  } else if (timeChecked == "second") {
    Time = "1時間以内";
  } else if (timeChecked == "third") {
    Time = "2時間以内";
  }

  let ownerApexId;
  let ownerPlatform;
  db.collection("users")
    .doc(currentUser.uid)
    .get()
    .then(
      (doc) => (
        (ownerApexId = doc.data().apexId), (ownerPlatform = doc.data().platform)
      )
    )
    .catch((error) => console.log(error));

  const timeGetter = () => {
    const now = new Date();
    const Hour = ("00" + now.getHours()).slice(-2);
    const Min = ("00" + now.getMinutes()).slice(-2);
    const Time = `${Hour}:${Min}`;
    return Time;
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.text}>プレイヤーレベル</Text>
      <View style={styles.radioContainer}>
        <View style={styles.radioItemContainer}>
          <RadioButton
            onPress={() => setLevelChecked("first")}
            checked={levelChecked === "first" ? true : false}
          />
          <Text style={styles.radioText}>誰でも</Text>
        </View>
        <View style={styles.radioItemContainer}>
          <RadioButton
            onPress={() => setLevelChecked("second")}
            checked={levelChecked === "second" ? true : false}
          />
          <Text style={styles.radioText}>初心者同士で</Text>
        </View>
        <View style={styles.radioItemContainer}>
          <RadioButton
            onPress={() => setLevelChecked("third")}
            checked={levelChecked === "third" ? true : false}
          />
          <Text style={styles.radioText}>上級者求む</Text>
        </View>
      </View>

      <Text style={styles.text}>対戦時間</Text>

      <View style={styles.radioContainer}>
        <View style={styles.radioItemContainer}>
          <RadioButton
            onPress={() => setTimeChecked("first")}
            checked={timeChecked === "first" ? true : false}
          />
          <Text style={styles.radioText}>制限無し</Text>
        </View>

        <View style={styles.radioItemContainer}>
          <RadioButton
            onPress={() => setTimeChecked("second")}
            checked={timeChecked === "second" ? true : false}
          />
          <Text style={styles.radioText}>1時間以内</Text>
        </View>

        <View style={styles.radioItemContainer}>
          <RadioButton
            onPress={() => setTimeChecked("third")}
            checked={timeChecked === "third" ? true : false}
          />
          <Text style={styles.radioText}>2時間以内</Text>
        </View>
      </View>
      <TextInput
        style={styles.comment}
        autoCapitalize="none"
        multiline={true}
        placeholder="コメント"
        onChangeText={(text) => setComment(text)}
      />

      <TouchableOpacity
        style={styles.postContainer}
        onPress={() =>
          db
            .collection("1v1s")
            .add({
              ownerPlayerId: currentUser.uid,
              ownerApexId: ownerApexId,
              platform: ownerPlatform,
              playerLevel: Level,
              playTime: Time,
              createdAt: timeGetter(),
              comment: comment,
              isEntered: false,
            })
            .then((docRef) =>
              db
                .collection("users")
                .doc(currentUser.uid)
                .update({
                  my1v1: docRef.id,
                })
                .then(() => navigation.navigate("Home"))
                .catch((error) => console.log(error))
            )
            .catch((error) => console.log(error))
        }
      >
        <Text style={styles.post}>投稿</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.canselContainer}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.cansel}>キャンセル</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
