import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";

const FALLBACK_REGION = {
  latitude: 40.7739,
  longitude: -111.9033,
  latitudeDelta: 0.09,
  longitudeDelta: 0.04,
};

export default function MapScreen() {
  const [region, setRegion] = React.useState(FALLBACK_REGION);
  const [message, setMessage] = React.useState("Finding your location…");
  const [newCourt, setNewCourt] = React.useState(null);

  React.useEffect(() => {
    let active = true;

    async function locateUser() {
      try {
        const permission = await Location.requestForegroundPermissionsAsync();
        if (permission.status !== "granted") {
          if (active) setMessage("Location permission was not granted. Showing the default area.");
          return;
        }
        const result = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
        if (active) {
          setRegion((current) => ({
            ...current,
            latitude: result.coords.latitude,
            longitude: result.coords.longitude,
          }));
          setMessage("");
        }
      } catch (error) {
        if (active) setMessage("Could not read your location. Showing the default area.");
      }
    }

    locateUser();
    return () => {
      active = false;
    };
  }, []);

  const addCourt = () => {
    setNewCourt({ latitude: region.latitude, longitude: region.longitude });
    setMessage("Drag the new marker to the court location.");
  };

  return (
    <View style={styles.container}>
      <MapView
        onRegionChangeComplete={setRegion}
        region={region}
        showsUserLocation
        style={StyleSheet.absoluteFill}
      >
        {newCourt ? (
          <Marker
            coordinate={newCourt}
            draggable
            onDragEnd={(event) => setNewCourt(event.nativeEvent.coordinate)}
            title="New basketball court"
          />
        ) : null}
      </MapView>
      {message ? <Text style={styles.message}>{message}</Text> : null}
      <TouchableOpacity onPress={addCourt} style={styles.button}>
        <Text style={styles.buttonText}>Add Court</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  message: {
    alignSelf: "center",
    backgroundColor: "rgba(255,255,255,0.94)",
    borderRadius: 8,
    margin: 12,
    paddingHorizontal: 14,
    paddingVertical: 9,
    position: "absolute",
    top: 4,
  },
  button: {
    backgroundColor: "#7f0000",
    borderRadius: 22,
    bottom: 20,
    paddingHorizontal: 22,
    paddingVertical: 12,
    position: "absolute",
    right: 18,
  },
  buttonText: { color: "#fff", fontFamily: "OctinCollege-Bold", letterSpacing: 1 },
});
