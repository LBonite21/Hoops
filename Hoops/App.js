import "react-native-gesture-handler";

import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Hoops from "./src/components/Hoops";

export default function App() {
  const [fontsLoaded] = useFonts({
    "OctinCollege-Reg": require("./fonts/OctinCollege-Regular.otf"),
    "OctinCollege-Bold": require("./fonts/OctinCollege-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#7f0000" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <Hoops />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loading: { flex: 1, alignItems: "center", justifyContent: "center" },
});

