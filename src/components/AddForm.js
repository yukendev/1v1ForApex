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
      />

      <TouchableOpacity
        style={styles.postContainer}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.post}>投稿</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.canselContainer}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.cansel}>キャンセル</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
