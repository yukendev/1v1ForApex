import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { COLOR } from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import "@firebase/firestore";
import firebase from "firebase";
import RadioButton from "./RadioButton";

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  infoContainer: {
    backgroundColor: COLOR.FORM_BACKGROUND,
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.8,
    width: "80%",
    height: 400,
    borderRadius: 5,
  },
  id: {
    fontSize: 25,
    width: 200,
    backgroundColor: "#fff",
    padding: 3,
    borderRadius: 3,
  },
  logoutContainer: {
    backgroundColor: COLOR.YELLOW,
    marginTop: 5,
    marginBottom: 10,
    borderRadius: 3,
  },
  logout: { color: "#fff", fontSize: 25, padding: 10 },
  help: { color: "#fff", fontSize: 15, textDecorationLine: "underline" },
  platformItem: { flexDirection: "row", marginVertical: 5 },
  buttonText: {
    color: "#fff",
    fontSize: 21,
    marginLeft: 10,
    marginHorizontal: 5,
  },
  idTitle: { fontSize: 31, color: "#fff", marginRight: 10 },
  idContainer: { flexDirection: "row", marginBottom: 30 },
  platformContainer: { flexDirection: "row", marginBottom: 40 },
});

export default function UserInfo() {
  const navigation = useNavigation();
  const db = firebase.firestore();
  const currentUser = firebase.auth().currentUser;
  const [apexId, setApexId] = useState("");
  const [platform, setPlatform] = useState("");
  const [platformChecked, setPlatformChecked] = useState("");

  const radioPress = (type) => {
    setPlatformChecked(type);
    setPlatform(platformChecked === "first" ? "PS4" : "PC");
  };

  const createAlert = () => {
    Alert.alert("ユーザー情報を更新しました", "", {
      cancelable: false,
    });
  };

  const defaultPlatform = () => {
    if (platformChecked === "first") {
      return "PC";
    } else if (platformChecked === "second") {
      return "PS4";
    } else {
      return "";
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      if (currentUser) {
        db.collection("users")
          .doc(currentUser.uid)
          .get()
          .then(async (doc) => {
            setApexId(await doc.data().apexId);
            if (doc.data().platform === "PC") {
              setPlatformChecked("first");
            } else if (doc.data().platform === "PS4") {
              setPlatformChecked("second");
            } else {
              setPlatformChecked("");
            }
            setPlatform(defaultPlatform());
          });
      }
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.wrapper}>
      {currentUser ? (
        <View style={styles.infoContainer}>
          <View style={styles.idContainer}>
            <Text style={styles.idTitle}>ID:</Text>
            <TextInput
              style={styles.id}
              defaultValue={apexId}
              onChangeText={(text) => setApexId(text)}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.platformContainer}>
            <View style={styles.platformItem}>
              <RadioButton
                onPress={() => {
                  radioPress("first");
                }}
                checked={platformChecked === "first" ? true : false}
              />
              <Text style={styles.buttonText}>PC</Text>
            </View>
            <View style={styles.platformItem}>
              <RadioButton
                onPress={() => {
                  radioPress("second");
                }}
                checked={platformChecked === "second" ? true : false}
              />
              <Text style={styles.buttonText}>PS4</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.logoutContainer}
            onPress={() => {
              db.collection("users")
                .doc(currentUser.uid)
                .update({
                  platform: platform,
                  apexId: apexId,
                })
                .then(() => createAlert())
                .catch((error) => console.log(error));
            }}
          >
            <Text style={styles.logout}>変更する</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.logoutContainer}
            onPress={() =>
              firebase
                .auth()
                .signOut()
                .then(
                  db.collection("users").doc(currentUser.uid).update({
                    onBoarding: false,
                  }),
                  navigation.navigate("Login")
                )
            }
          >
            <Text style={styles.logout}>ログアウト</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.helpContainer}
            onPress={() => navigation.navigate("Help")}
          >
            <Text style={styles.help}>ヘルプ</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.logoutContainer}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.logout}>ログイン</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
