import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/LoginScreen";
import Signup from "../screens/SignupScreen";

const Stack = createStackNavigator();

export default function Route() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
}
