import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";
import { COLOR } from "../constants/Colors";
import firebase from "firebase";
import "@firebase/firestore";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLOR.BACKGROUND,
  },
  formContainer: {
    height: 500,
    width: 350,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: COLOR.FORM_BACKGROUND,
    opacity: 0.8,
  },
  buttonContainer: {
    backgroundColor: COLOR.YELLOW,
    alignItems: "center",
    width: "40%",
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 27,
    padding: 5,
  },
  textInput: {
    backgroundColor: "#fff",
    width: "85%",
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    fontSize: 20,
    marginBottom: 40,
    padding: 5,
  },
});

export default function Signup({ navigation }) {
  const db = firebase.firestore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const Signup = (email, password) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) =>
        db
          .collection("users")
          .doc(user.user.uid)
          .set({
            email: email,
            password: password,
            onBoarding: true,
          })
          .then(() => navigation.navigate("Entry"))
          .catch((error) => console.log(error))
      )
      .catch((error) => console.log(error));
  };
  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          placeholder="email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          placeholder="password"
          autoCapitalize="none"
          secureTextEntry
          style={styles.textInput}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => Signup(email, password)}
        >
          <Text style={styles.buttonText}>新規登録</Text>
        </TouchableOpacity>
        <Button title="戻る" color="#fff" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
}
