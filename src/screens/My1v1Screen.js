import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { COLOR } from "../constants/Colors";
import MyList from "../components/MyList";
import "@firebase/firestore";
import firebase from "firebase";
import IdMosaic from "../functions/IdMosaic";

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: COLOR.BACKGROUND,
    justifyContent: "center",
  },
  container: {
    alignItems: "center",
  },
  title: { fontSize: 30, marginBottom: 20 },
  id: {
    fontSize: 25,
    padding: 10,
  },
  idContainer: {
    backgroundColor: COLOR.YELLOW,
    width: "80%",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 20,
  },
  deleteContainer: {
    backgroundColor: COLOR.DEEP_RED,
    borderRadius: 3,
    marginTop: 20,
  },
  deleteText: { fontSize: 25, color: "#fff", padding: 7 },
  nonWrapper: { flex: 1, alignItems: "center", justifyContent: "center" },
  nonText: { fontSize: 25 },
});

export default function My1v1({ navigation }) {
  const db = firebase.firestore();
  const currentUser = firebase.auth().currentUser;
  const [id, setId] = useState("");
  const [platform, setPlatform] = useState("");
  const [postedAt, setPostedAt] = useState("");
  const [playerSkill, setPlayerSkill] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [comment, setComment] = useState("");
  const [my1v1, setMy1v1] = useState("");
  const [isRecruiting, setIsRecruiting] = useState("");
  const [enteredPlayer, setEnteredPlayer] = useState("");

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      if (currentUser) {
        await db
          .collection("users")
          .doc(currentUser.uid)
          .get()
          .then((doc) => {
            if (doc.data().my1v1) {
              db.collection("1v1s")
                .doc(doc.data().my1v1)
                .get()
                .then((doc) => {
                  setId(doc.data().ownerApexId);
                  setPlatform(doc.data().platform);
                  setPostedAt(doc.data().createdAt);
                  setPlayerSkill(doc.data().playerLevel);
                  setStartTime(doc.data().startTime);
                  setEndTime(doc.data().endTime);
                  setComment(doc.data().comment);
                  setEnteredPlayer(doc.data().enteredPlayer);
                })
                .then(() => console.log("success"))
                .catch((error) => console.log(error));
            }
            db.collection("users")
              .doc(currentUser.uid)
              .get()
              .then((doc) => {
                setMy1v1(doc.data().my1v1);
                setIsRecruiting(doc.data().isRecruiting);
              })
              .then(() => console.log("success"))
              .catch((error) => console.log(error));
          });
      }
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.wrapper}>
      {my1v1 ? (
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>My1v1</Text>
          </View>
          <MyList
            id={isRecruiting ? id : IdMosaic(id)}
            platform={platform}
            postedAt={postedAt}
            playerSkill={playerSkill}
            startTime={startTime}
            endTime={endTime}
            comment={comment}
          />
          <View style={styles.idContainer}>
            {isRecruiting ? (
              enteredPlayer ? (
                <Text style={styles.id}>相手のID: {enteredPlayer}</Text>
              ) : (
                <Text style={styles.id}>エントリーされていません</Text>
              )
            ) : (
              <Text style={styles.id}>相手のID: {id}</Text>
            )}
          </View>

          <TouchableOpacity
            style={styles.deleteContainer}
            onPress={() => {
              if (isRecruiting) {
                db.collection("1v1s")
                  .doc(my1v1)
                  .delete()
                  .then(() =>
                    db
                      .collection("users")
                      .doc(currentUser.uid)
                      .update({
                        my1v1: "",
                        isRecruiting: false,
                      })
                      .then(() => setMy1v1(""))
                  )
                  .catch((error) => console.log(error));
              } else {
                db.collection("users")
                  .doc(currentUser.uid)
                  .update({
                    my1v1: "",
                    isPlaying: false,
                    isRecruiting: false,
                  })
                  .then(() => setMy1v1(""));
              }
            }}
          >
            <Text style={styles.deleteText}>削除する</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.nonWrapper}>
          <Text style={styles.nonText}>1v1がありません</Text>
        </View>
      )}
    </View>
  );
}
