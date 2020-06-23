import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen";
import My1v1Screen from "./My1v1Screen";
import UserInfoScreen from "./UserInfoScreen";
import Ionicons from "react-native-vector-icons/FontAwesome";
import { COLOR } from "../constants/Colors";

const Tab = createBottomTabNavigator();

export default function Route() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: () => {
          let iconName;

          if (route.name === "Home") {
            iconName = "list";
          } else if (route.name === "My1v1") {
            iconName = "sticky-note";
          } else {
            iconName = "user";
          }
          return <Ionicons name={iconName} size={25} color={"#fff"} />;
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
