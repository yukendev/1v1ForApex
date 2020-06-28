import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Route from "./src/routes/Route";
import firebase from "firebase";
import { firebaseConfig } from "./src/firestore/config";

firebase.initializeApp(firebaseConfig);

export default function App() {
  return (
    <NavigationContainer>
      <Route />
    </NavigationContainer>
  );
}
