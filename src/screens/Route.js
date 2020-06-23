import React from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import TabRoute from "./TabRoute";
import Add from "./AddScreen";
import AddButton from "../components/AddButon";
import { COLOR } from "../constants/Colors";

const Stack = createStackNavigator();

export default function Route() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={TabRoute}
        options={{
          headerRight: () => <AddButton />,
          title: "1v1 for APEX",
          headerStyle: { backgroundColor: COLOR.DEEP_RED },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen name="Add" component={Add} />
    </Stack.Navigator>
  );
}
