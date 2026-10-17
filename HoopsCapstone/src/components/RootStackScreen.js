import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "./LoginScreen";
import SignUpScreen from "./SignUpScreen";

const RootStack = createNativeStackNavigator();

const RootStackScreen = ({ navigation }) => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        options={{ headerShown: false }}
        name="Login"
        component={LoginScreen}
      />
      <RootStack.Screen
        component={SignUpScreen}
        name="Sign Up Screen"
        options={{ headerShown: false }}
      />
    </RootStack.Navigator>
  );
};

export default RootStackScreen;
