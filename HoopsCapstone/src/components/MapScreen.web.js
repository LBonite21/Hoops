import React from "react";
import { Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";

export default function MapScreen() {
  const [message, setMessage] = React.useState(
    "Use your browser location to open the surrounding area in Google Maps."
  );
  const [coordinates, setCoordinates] = React.useState(null);

  const locate = async () => {
    try {
      const permission = await Location.requestForegroundPermissionsAsync();
      if (permission.status !== "granted") {
        setMessage("Location permission was not granted.");
        return;
      }
      const result = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      setCoordinates(result.coords);
      setMessage("Location found. Open it in Google Maps to explore nearby courts.");
    } catch (error) {
      setMessage("Your location could not be read in this browser.");
    }
  };

  const openMap = () => {
    if (!coordinates) return;
    const { latitude, longitude } = coordinates;
    Linking.openURL(
      `https://www.google.com/maps/search/basketball+court/@${latitude},${longitude},13z`
    );
  };

  return (
    <View style={styles.container}>
      <Ionicons name="map-outline" size={72} color="#7f0000" />
      <Text style={styles.heading}>Court Map</Text>
      <Text style={styles.message}>{message}</Text>
      <TouchableOpacity onPress={coordinates ? openMap : locate} style={styles.button}>
        <Text style={styles.buttonText}>{coordinates ? "Open Map" : "Use My Location"}</Text>
      </TouchableOpacity>
      <Text style={styles.note}>The interactive in-app map is available on iOS and Android.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", flex: 1, justifyContent: "center", padding: 28 },
  heading: { fontFamily: "OctinCollege-Bold", fontSize: 30, marginTop: 14 },
  message: { color: "#444", lineHeight: 22, marginVertical: 14, maxWidth: 420, textAlign: "center" },
  button: { backgroundColor: "#7f0000", borderRadius: 24, paddingHorizontal: 24, paddingVertical: 12 },
  buttonText: { color: "#fff", fontFamily: "OctinCollege-Bold" },
  note: { color: "#777", fontSize: 12, marginTop: 18, textAlign: "center" },
});
