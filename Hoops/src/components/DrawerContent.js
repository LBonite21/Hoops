import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { AuthContext } from "./context";

export function DrawerContent(props) {
  const { signOut } = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View style={styles.profile}>
          <Image source={require("../../images/logo.png")} style={styles.avatar} />
          <View>
            <Text style={styles.name}>Hoops</Text>
            <Text style={styles.caption}>Find your next court</Text>
          </View>
        </View>
        <DrawerItem
          icon={({ color, size }) => (
            <MaterialCommunityIcons name="map-outline" color={color} size={size} />
          )}
          label="Map"
          onPress={() => props.navigation.navigate("HomeDrawer", { screen: "Map" })}
        />
        <DrawerItem
          icon={({ color, size }) => (
            <MaterialCommunityIcons
              name="newspaper-variant-outline"
              color={color}
              size={size}
            />
          )}
          label="News"
          onPress={() => props.navigation.navigate("HomeDrawer", { screen: "News" })}
        />
      </DrawerContentScrollView>
      <View style={styles.signOut}>
        <DrawerItem
          icon={({ color, size }) => (
            <MaterialCommunityIcons name="logout" color={color} size={size} />
          )}
          label="Sign out"
          onPress={signOut}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  profile: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 18,
    paddingVertical: 24,
  },
  avatar: { height: 54, resizeMode: "contain", width: 54 },
  name: { fontFamily: "OctinCollege-Bold", fontSize: 20 },
  caption: { color: "#666", marginTop: 2 },
  signOut: { borderTopColor: "#eee", borderTopWidth: 1, paddingBottom: 12 },
});
