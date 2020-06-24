import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TabRoute from "./TabRoute";
import InitialRoute from "../routes/InitialRoute";
import Add from "../screens/AddScreen";
import AddButton from "../components/AddButon";

import { COLOR } from "../constants/Colors";

const Stack = createStackNavigator();

export default function Route() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={InitialRoute}
        options={{
          title: "1v1 for APEX",
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
    </Stack.Navigator>
  );
}
