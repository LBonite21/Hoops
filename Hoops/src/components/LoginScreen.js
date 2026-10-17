import React from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { AuthContext } from "./context";

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const { signIn } = React.useContext(AuthContext);

  const login = () => {
    if (!username.trim() || password.length < 4) {
      setError("Enter a username and a password of at least 4 characters.");
      return;
    }
    setError("");
    signIn(username, password);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.form}>
          <Image style={styles.logo} source={require("../../images/logo.png")} />
          <Image style={styles.title} source={require("../../images/Title.png")} />
          <Text style={styles.label}>Username</Text>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={setUsername}
            style={styles.input}
            value={username}
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            onChangeText={setPassword}
            onSubmitEditing={login}
            secureTextEntry
            style={styles.input}
            value={password}
          />
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <TouchableOpacity onPress={login} style={styles.primaryButton}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Sign Up Screen")}>
            <Text style={styles.link}>Create an account</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", justifyContent: "center" },
  form: { alignItems: "center", paddingHorizontal: 32 },
  logo: { height: 130, resizeMode: "contain", width: 130 },
  title: { height: 70, resizeMode: "contain", width: 290, marginBottom: 24 },
  label: {
    alignSelf: "stretch",
    fontFamily: "OctinCollege-Bold",
    fontSize: 17,
    letterSpacing: 1.5,
    marginBottom: 8,
    textTransform: "uppercase",
  },
  input: {
    alignSelf: "stretch",
    borderBottomColor: "#222",
    borderBottomWidth: 2,
    fontSize: 17,
    marginBottom: 22,
    paddingHorizontal: 4,
    paddingVertical: 8,
  },
  error: { color: "#b00020", marginBottom: 14, textAlign: "center" },
  primaryButton: {
    alignItems: "center",
    backgroundColor: "#7f0000",
    borderRadius: 24,
    minWidth: 150,
    paddingHorizontal: 28,
    paddingVertical: 13,
  },
  buttonText: { color: "#fff", fontFamily: "OctinCollege-Bold", fontSize: 18 },
  link: { color: "#7f0000", fontWeight: "600", marginTop: 22 },
});
