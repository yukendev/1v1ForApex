import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TabRoute from "./TabRoute";
import Add from "../screens/AddScreen";
import AddButton from "../components/AddButon";
import Help from "../screens/HelpScreen";
import Entry from "../screens/InitialEntryScreen";
import { COLOR } from "../constants/Colors";
import InitialRoute from "./InitialRoute";

const Stack = createStackNavigator();

export default function Route() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Login"
        component={InitialRoute}
        options={{
          title: "1v1 for APEX",
          headerLeft: null,
          headerStyle: { backgroundColor: COLOR.DEEP_RED },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="Home"
        component={TabRoute}
        options={{
          headerRight: () => <AddButton />,
          headerLeft: null,
          title: "1v1 for APEX",
          headerStyle: { backgroundColor: COLOR.DEEP_RED },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="Add"
        component={Add}
        options={{
          headerLeft: null,
          title: "1v1 for APEX",
          headerStyle: { backgroundColor: COLOR.DEEP_RED },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="Help"
        component={Help}
        options={{
          headerLeft: null,
          title: "1v1 for APEX",
          headerStyle: { backgroundColor: COLOR.DEEP_RED },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="Entry"
        component={Entry}
        options={{
          headerLeft: null,
          title: "1v1 for APEX",
          headerStyle: { backgroundColor: COLOR.DEEP_RED },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </Stack.Navigator>
  );
}
