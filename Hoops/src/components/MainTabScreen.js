import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import NewsScreen from "./NewsScreen";
import MapScreen from "./MapScreen";

const Tab = createBottomTabNavigator();

export default function MainTabScreen({ navigation }) {
  return (
    // Screen Tab
    <Tab.Navigator
      initialRouteName="Map"
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: "#7f0000" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontFamily: "OctinCollege-Bold" },
        tabBarActiveTintColor: "#7f0000",
        headerLeft: () => (
          <Ionicons.Button
            name="menu"
            size={26}
            color="#fff"
            backgroundColor="#7f0000"
            onPress={() => navigation.openDrawer()}
          />
        ),
        tabBarIcon: ({ color, size }) => (
          <Ionicons
            name={route.name === "Map" ? "map" : "newspaper-outline"}
            color={color}
            size={size}
          />
        ),
      })}
    >
      <Tab.Screen name="Map" component={MapScreen} options={{ title: "Hoops" }} />
      <Tab.Screen name="News" component={NewsScreen} options={{ title: "Basketball News" }} />
    </Tab.Navigator>
  );
}
