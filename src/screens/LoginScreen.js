import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
  ScrollView,
} from "react-native";
import { COLOR } from "../constants/Colors";

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
  },
});

export default function Login({ navigation }) {
  return (
    <ScrollView scrollEnabled={true} contentContainerStyle={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          placeholder="email"
          autoCapitalize="none"
          style={styles.textInput}
        />
        <TextInput
          placeholder="password"
          autoCapitalize="none"
          hf
          style={styles.textInput}
        />
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.buttonText}>ログイン</Text>
        </TouchableOpacity>
        <Button
          title="新規登録"
          color="#fff"
          onPress={() => navigation.navigate("Signup")}
        />
      </View>
    </ScrollView>
  );
}
