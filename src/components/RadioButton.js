import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { COLOR } from "../constants/Colors";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: 25,
    width: 25,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12.5,
  },
  checkedButton: {
    backgroundColor: COLOR.LIGHT_RED,
    height: 15,
    width: 15,
    borderRadius: 7.5,
  },
  unCheckedButton: {
    height: 15,
    width: 15,
    borderRadius: 7.5,
  },
});

export default function RadioBUtton({ onPress, checked }) {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress()}>
      {checked ? (
        <View style={styles.checkedButton}></View>
      ) : (
        <View style={styles.unCheckedButton}></View>
      )}
    </TouchableOpacity>
  );
}
