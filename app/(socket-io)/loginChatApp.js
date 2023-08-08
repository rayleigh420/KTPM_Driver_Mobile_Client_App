import React, { useState } from "react";
import {
  Text,
  SafeAreaView,
  View,
  TextInput,
  Pressable,
  Alert,
} from "react-native";

import { styles } from "../../src/utils/stylesChatApp";
import { useRouter } from "expo-router";
import { storeData } from "../../src/utils/asyncStorage";

const Login = () => {
  const navigation = useRouter();
  const [username, setUsername] = useState("");

  //👇🏻 checks if the input field is empty
  const handleSignIn = () => {
    if (username.trim()) {
      //👇🏻 Logs the username to the console
      console.log({ username });
      storeData(username, "username");
      navigation.push("/chatApp");
    } else {
      Alert.alert("Username is required.");
    }
  };

  return (
    <View style={styles.loginscreen}>
      <View style={styles.loginscreen}>
        <Text style={styles.loginheading}>Sign in</Text>
        <View style={styles.logininputContainer}>
          <TextInput
            autoCorrect={false}
            placeholder="Enter your username"
            style={styles.logininput}
            onChangeText={(value) => setUsername(value)}
          />
        </View>

        <Pressable onPress={handleSignIn} style={styles.loginbutton}>
          <View>
            <Text style={styles.loginbuttonText}>Get Started</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default Login;
