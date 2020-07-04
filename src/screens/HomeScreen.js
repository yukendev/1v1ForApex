import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  Button,
} from "react-native";
import { COLOR } from "../constants/Colors";
import List from "../components/List";
import "@firebase/firestore";
import firebase from "firebase";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: COLOR.BACKGROUND,
  },
});

export default function Home({ navigation }) {
  const db = firebase.firestore();
  const currentUser = firebase.auth().currentUser;
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState([]);
  let DATA = [];

  const onRefresh = async () => {
    setRefreshing(true);
    await db
      .collection("1v1s")
      .get()
      .then(function (querySnapshot) {
        DATA = [];
        querySnapshot.forEach(function (doc) {
          DATA.push(doc.data());
          setRefreshing(false);
        });
        setData(DATA);
        DATA = [];
      });
  };

  // useEffect(() => {
  //   db.collection("1v1s")
  //     .get()
  //     .then(function (querySnapshot) {
  //       querySnapshot.forEach((doc) => {
  //         DATA.push(doc.data());
  //       });
  //       setData(DATA);
  //       DATA = [];
  //     });
  // });

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      await db
        .collection("1v1s")
        .get()
        .then(function (querySnapshot) {
          DATA = [];
          querySnapshot.forEach((doc) => {
            DATA.push(doc.data());
          });
        });
      setData(DATA);
    });
    DATA = [];
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <List
            id={item.ownerApexId}
            platform={item.platform}
            postedAt={item.createdAt}
            playerSkill={item.playerLevel}
            startTime={item.startTime}
            endTime={item.endTime}
            comment={item.comment}
            uid={item.key}
            ownerApexId={item.ownerApexId}
          />
        )}
        keyExtractor={(item) => item.key}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}
