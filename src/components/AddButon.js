import React, { useEffect } from "react";
import { Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { COLOR } from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import "@firebase/firestore";
import firebase from "firebase";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 40,
    width: 50,
    justifyContent: "center",
    backgroundColor: COLOR.LIGHT_RED,
    alignItems: "center",
    borderRadius: 9,
    margin: 5,
  },
  text: {
    fontSize: 30,
    color: "#fff",
    position: "absolute",
    top: -2.5,
  },
});

export default function AddButton() {
  const navigation = useNavigation();
  const db = firebase.firestore();
  const currentUser = firebase.auth().currentUser;

  const createAlert = () => {
    Alert.alert("My1v1は一つまでです", "", {
      cancelable: false,
    });
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={async () => {
        if (currentUser) {
          await db
            .collection("users")
            .doc(currentUser.uid)
            .get()
            .then((doc) => {
              if (
                doc.data().isPlaying == true ||
                doc.data().isRecruiting == true
              ) {
                createAlert();
              } else {
                db.collection("users")
                  .doc(currentUser.uid)
                  .get()
                  .then((doc) => {
                    if (doc.data().onBoarding == false) {
                      navigation.navigate("Entry");
                    } else {
                      navigation.navigate("Add");
                    }
                  });
              }
            });
        } else {
          navigation.navigate("Login");
        }
      }}
    >
      <Text style={styles.text}>+</Text>
    </TouchableOpacity>
  );
}
