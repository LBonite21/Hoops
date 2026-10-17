import React from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { AuthContext } from "./context";

export default function SignUpScreen() {
  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const { signUp } = React.useContext(AuthContext);

  const register = () => {
    if (!email.includes("@") || username.trim().length < 3 || password.length < 4) {
      setError("Enter a valid email, username, and password of at least 4 characters.");
      return;
    }
    setError("");
    signUp(email, username, password);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.form} keyboardShouldPersistTaps="handled">
        <Image style={styles.logo} source={require("../../images/logo.png")} />
        <Image style={styles.title} source={require("../../images/signup.png")} />
        <Field label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
        <Field label="Username" value={username} onChangeText={setUsername} />
        <Field label="Password" value={password} onChangeText={setPassword} secureTextEntry />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <TouchableOpacity onPress={register} style={styles.button}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function Field({ label, ...props }) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput autoCapitalize="none" style={styles.input} {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  form: { alignItems: "center", flexGrow: 1, justifyContent: "center", padding: 32 },
  logo: { height: 100, resizeMode: "contain", width: 100 },
  title: { height: 65, marginBottom: 20, resizeMode: "contain", width: 290 },
  field: { alignSelf: "stretch", marginBottom: 18 },
  label: {
    fontFamily: "OctinCollege-Bold",
    fontSize: 17,
    letterSpacing: 1.5,
    marginBottom: 6,
    textTransform: "uppercase",
  },
  input: { borderBottomColor: "#222", borderBottomWidth: 2, fontSize: 17, paddingVertical: 8 },
  error: { color: "#b00020", marginBottom: 14, textAlign: "center" },
  button: { backgroundColor: "#7f0000", borderRadius: 24, paddingHorizontal: 30, paddingVertical: 13 },
  buttonText: { color: "#fff", fontFamily: "OctinCollege-Bold", fontSize: 18 },
});
