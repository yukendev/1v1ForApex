import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { COLOR } from "../constants/Colors";
import Ionicons from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import "@firebase/firestore";
import firebase from "firebase";
import IdMosaic from "../functions/IdMosaic";

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.FORM_BACKGROUND,
    width: "80%",
    borderRadius: 5,
    opacity: 0.8,
    marginVertical: 10,
    marginLeft: "auto",
    marginRight: "auto",
  },
  mineContainer: {
    backgroundColor: COLOR.FORM_BACKGROUND,
    width: "80%",
    borderRadius: 5,
    opacity: 0.8,
    marginVertical: 10,
    marginLeft: "auto",
    marginRight: "auto",
    borderWidth: 6,
    borderColor: COLOR.DEEP_RED,
  },
  userInfo: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  request: {
    flexDirection: "row",
    width: "85%",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  userId: { color: "#fff", fontSize: 20 },
  platform: {
    fontSize: 20,
    padding: 3,
  },
  platformContainer: {
    backgroundColor: COLOR.YELLOW,
    borderRadius: 5,
  },
  postedAt: { color: "#fff", fontSize: 20 },
  playerSkill: {
    color: "#fff",
    fontSize: 20,
    borderColor: COLOR.DEEP_RED,
    borderRadius: 5,
    borderWidth: 3,
    padding: 2,
  },
  playTime: {
    color: "#fff",
    fontSize: 20,
    borderColor: COLOR.DEEP_RED,
    borderRadius: 5,
    borderWidth: 3,
    padding: 2,
  },
  comment: { fontSize: 18, padding: 15 },
  commentContainer: {
    marginTop: 30,
    backgroundColor: "#fff",
    width: "90%",
    borderRadius: 5,
    marginRight: "auto",
    marginLeft: "auto",
    marginBottom: 30,
  },
  openButton: {
    width: "100%",
    alignItems: "center",
  },
  entryText: {
    color: COLOR.DEEP_RED,
    fontSize: 25,
    padding: 10,
  },
  entryContainer: {
    backgroundColor: COLOR.YELLOW,
    width: "70%",
    marginRight: "auto",
    marginLeft: "auto",
    alignItems: "center",
    marginVertical: 10,
    borderRadius: 5,
  },
});

export default function List({
  id,
  platform,
  postedAt,
  playerSkill,
  startTime,
  endTime,
  comment,
  uid,
  ownerApexId,
}) {
  const navigation = useNavigation();
  const [isOpened, setIsOpened] = useState(false);
  const db = firebase.firestore();
  const currentUser = firebase.auth().currentUser;
  let iconName = isOpened ? "caret-up" : "caret-down";
  let apexId = "";
  const [isMine, setIsMine] = useState(false);

  const createAlert = () => {
    Alert.alert("My1v1は一つまでです", "", {
      cancelable: false,
    });
  };

  useEffect(() => {
    if (currentUser) {
      db.collection("users")
        .doc(currentUser.uid)
        .get()
        .then((doc) => {
          apexId = doc.data().apexId;
          if (ownerApexId == apexId) {
            setIsMine(true);
          }
        });
    }
  });
  return (
    <View style={isMine ? styles.mineContainer : styles.container}>
      <View style={styles.userInfo}>
        <Text style={styles.userId}>{IdMosaic(id)}</Text>
        <View style={styles.platformContainer}>
          <Text style={styles.platform}>{platform}</Text>
        </View>
        <Text style={styles.postedAt}>{postedAt}</Text>
      </View>
      <View style={styles.request}>
        <Text style={styles.playerSkill}>{playerSkill}</Text>
        <Text style={styles.playTime}>
          {startTime}~{endTime}
        </Text>
      </View>
      {isOpened ? (
        <View style={styles.commentContainer}>
          <Text style={styles.comment}>{comment}</Text>
        </View>
      ) : null}

      <TouchableOpacity
        style={styles.openButton}
        onPress={() => setIsOpened(!isOpened)}
      >
        <Ionicons name={iconName} size={30} color={"#fff"} />
      </TouchableOpacity>
      {isMine ? (
        <View></View>
      ) : (
        <TouchableOpacity
          style={styles.entryContainer}
          onPress={() => {
            if (currentUser) {
              db.collection("users")
                .doc(currentUser.uid)
                .get()
                .then((doc) => {
                  if (doc.data().onBoarding == false) {
                    navigation.navigate("Entry");
                  } else {
                    if (
                      doc.data().isPlaying == true ||
                      doc.data().isRecruiting == true
                    ) {
                      createAlert();
                    } else {
                      db.collection("users")
                        .doc(currentUser.uid)
                        .update({
                          isPlaying: true,
                          my1v1: uid,
                        })
                        .then(() => console.log("success"))
                        .catch((error) => console.log(error));
                      db.collection("1v1s")
                        .doc(uid)
                        .update({
                          enteredPlayer: apexId,
                          enteredPlayerId: currentUser.uid,
                          isEntried: true,
                        })
                        .then(() => navigation.navigate("My1v1"))
                        .catch((error) => console.log(error));
                    }
                  }
                });
            } else {
              navigation.navigate("Login");
            }
          }}
        >
          <Text style={styles.entryText}>エントリーする！</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

// db.collection("users")
//   .doc(currentUser.uid)
//   .update({
//     isPlaying: true,
//     my1v1: uid,
//   })
//   .then(() => console.log("success"))
//   .catch((error) => console.log(error));
// db.collection("1v1s")
//   .doc(uid)
//   .update({
//     enteredPlayer: apexId,
//     enteredPlayerId: currentUser.uid,
//     isEntried: true,
//   })
//   .then(() => navigation.navigate("My1v1"))
//   .catch((error) => console.log(error));
