import React from "react";
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const LINKS = [
  {
    title: "NBA News",
    description: "Scores, schedules, standings, and the latest league stories.",
    url: "https://www.nba.com/news",
  },
  {
    title: "WNBA News",
    description: "The latest stories, scores, and updates from the WNBA.",
    url: "https://www.wnba.com/news",
  },
  {
    title: "USA Basketball",
    description: "National team news and basketball development updates.",
    url: "https://www.usab.com/news",
  },
];

export default function NewsScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Basketball News</Text>
      <Text style={styles.intro}>
        The original news API is no longer bundled with the app. These reliable sources open in your browser.
      </Text>
      {LINKS.map((item) => (
        <View key={item.url} style={styles.card}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <TouchableOpacity onPress={() => Linking.openURL(item.url)} style={styles.button}>
            <Text style={styles.buttonText}>View More</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#f6f6f6", flexGrow: 1, padding: 18 },
  heading: { fontFamily: "OctinCollege-Bold", fontSize: 30, marginBottom: 8 },
  intro: { color: "#555", lineHeight: 21, marginBottom: 18 },
  card: { backgroundColor: "#fff", borderRadius: 12, elevation: 2, marginBottom: 14, padding: 18 },
  title: { fontFamily: "OctinCollege-Bold", fontSize: 21, marginBottom: 8 },
  description: { color: "#444", lineHeight: 21 },
  button: { alignSelf: "flex-start", backgroundColor: "#7f0000", borderRadius: 5, marginTop: 16, padding: 10 },
  buttonText: { color: "#fff", fontFamily: "OctinCollege-Bold", letterSpacing: 1 },
});
