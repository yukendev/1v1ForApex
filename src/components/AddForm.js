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
import DateTimePickerModal from "react-native-modal-datetime-picker";

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
  timeContainer: {
    flexDirection: "row",
    width: "80%",
  },
  timeText: {
    color: "#fff",
    fontSize: 25,
    textDecorationLine: "underline",
    marginLeft: 20,
    position: "absolute",
    bottom: 10,
  },
  timeButtonContainer: {
    backgroundColor: COLOR.YELLOW,
    borderRadius: 3,
    marginVertical: 7,
  },
  timeButtonText: { color: "#fff", fontSize: 25, padding: 3 },
  plusContainer: {
    backgroundColor: COLOR.YELLOW,
    width: 32,
    height: 32,
    borderRadius: 16,
    marginLeft: 20,
    position: "absolute",
    bottom: 6,
  },
  plusText: {
    color: "#fff",
    fontSize: 30,
    padding: 3,
    position: "absolute",
    bottom: -3,
    left: 3.5,
  },
});

export default function AddForm() {
  const navigation = useNavigation();
  const [levelChecked, setLevelChecked] = useState("first");
  const [comment, setComment] = useState("");
  const db = firebase.firestore();
  const currentUser = firebase.auth().currentUser;
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [type, setType] = useState("");

  let level;
  if (levelChecked == "first") {
    level = "誰でも";
  } else if (levelChecked == "second") {
    level = "初心者同士で";
  } else if (levelChecked == "third") {
    level = "上級者求む";
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

  const handleSubmit = (date, type) => {
    if (type == "start") {
      setStartTime(date.toString().substr(16, 5));
    } else if (type == "end") {
      setEndTime(date.toString().substr(16, 5));
    }
    setIsDatePickerVisible(false);
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

      <View style={styles.timeContainer}>
        <View style={styles.timeButtonContainer}>
          <Text style={styles.timeButtonText}>開始時刻</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            setIsDatePickerVisible(true), setType("start");
          }}
        >
          {startTime ? (
            <Text style={styles.timeText}>{startTime}</Text>
          ) : (
            <View style={styles.plusContainer}>
              <Text style={styles.plusText}>+</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.timeContainer}>
        <View style={styles.timeButtonContainer}>
          <Text style={styles.timeButtonText}>終了時刻</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            setIsDatePickerVisible(true), setType("end");
          }}
        >
          {endTime ? (
            <Text style={styles.timeText}>{endTime}</Text>
          ) : (
            <View style={styles.plusContainer}>
              <Text style={styles.plusText}>+</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        locale="en_GB"
        onConfirm={(date) => handleSubmit(date, type)}
        onCancel={() => setIsDatePickerVisible(false)}
        cancelTextIOS="キャンセル"
        confirmTextIOS="決定"
        headerTextIOS={type == "start" ? "開始時刻" : "終了時刻"}
      />

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
              playerLevel: level,
              startTime: startTime,
              endTime: endTime,
              createdAt: timeGetter(),
              comment: comment,
              isEnteried: false,
            })
            .then((docRef) => {
              db.collection("users")
                .doc(currentUser.uid)
                .update({
                  isRecruiting: true,
                  my1v1: docRef.id,
                })
                .then(() => navigation.navigate("Home"))
                .catch((error) => console.log(error));
              db.collection("1v1s").doc(docRef.id).update({
                key: docRef.id,
              });
            })
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
