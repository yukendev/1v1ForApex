import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import My1v1Screen from "../screens/My1v1Screen";
import UserInfoScreen from "../screens/UserInfoScreen";
import Ionicons from "react-native-vector-icons/FontAwesome";
import { COLOR } from "../constants/Colors";

const Tab = createBottomTabNavigator();

export default function Route() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;
          let color;

          if (route.name === "Home") {
            color = focused ? "#fff" : COLOR.LIGHT_RED;
            iconName = "list";
          } else if (route.name === "My1v1") {
            color = focused ? "#fff" : COLOR.LIGHT_RED;
            iconName = "sticky-note";
          } else {
            color = focused ? "#fff" : COLOR.LIGHT_RED;
            iconName = "user";
          }
          return <Ionicons name={iconName} size={25} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "#fff",
        inactiveTintColor: COLOR.LIGHT_RED,
        style: {
          backgroundColor: COLOR.DEEP_RED,
        },
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="My1v1" component={My1v1Screen} />
      <Tab.Screen name="UserInfo" component={UserInfoScreen} />
    </Tab.Navigator>
  );
}
