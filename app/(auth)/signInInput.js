import {
  View,
  Text,
  Image,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { Button } from "@rneui/base";
import { Icon } from "@rneui/themed";
import { fontSizes, icons } from "../../src/constants";
import { Stack, useRouter } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "../../src/api/testAPI";
import { validateEmail } from "../../src/utils/validates";
import { storeData } from "../../src/utils/asyncStorage";

function typePin() {
  const navigation = useRouter();
  const signInMutation = useMutation({
    mutationFn: ({ email, password }) => signIn({ email, password }),
    onSuccess: (data) => {
      storeData(data.data, "user");
      navigation.push("/profile");
    },
    onError: (err) => {
      if (err.response.status == 401) {
        setError("Password incorrect");
      }
    },
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = () => {
    if (validateEmail(email)) {
      signInMutation.mutate({
        email: email,
        password: password,
      });
    } else {
      setError("Please input valid email");
    }
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <Stack.Screen
        options={{
          title: "Sign In With Grab Account",
          headerStyle: {
            height: 56,
          },
          headerShadowVisible: false,
        }}
      />
      <View>
        <View style={{ marginHorizontal: 30, marginTop: 30 }}>
          <Text style={{ fontSize: fontSizes.h4 }}>Email</Text>
          <TextInput
            placeholder="grab@gmail.com"
            placeholderTextColor={"gray"}
            style={{
              // backgroundColor: "red",
              height: 40,
              width: "100%",
              borderBottomWidth: 1,
              borderBottomColor: "rgba(0,0,0,0.3)",
              marginBottom: 20,
              alignSelf: "center",
              marginTop: 5,
              fontSize: fontSizes.h3,
            }}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={{ marginHorizontal: 30, marginTop: 10 }}>
          <Text style={{ fontSize: fontSizes.h4 }}>Password</Text>
          <TextInput
            textContentType="password"
            secureTextEntry
            style={{
              // backgroundColor: "red",
              height: 40,
              width: "100%",
              borderBottomWidth: 1,
              borderBottomColor: "rgba(0,0,0,0.3)",
              marginBottom: 20,
              alignSelf: "center",
              marginTop: 5,
              fontSize: fontSizes.h3,
            }}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
      </View>
      {error ? (
        <Text
          style={{ marginHorizontal: 30, color: "red", fontSize: fontSizes.h4 }}
        >
          {error}
        </Text>
      ) : (
        <></>
      )}
      <Button
        buttonStyle={{
          marginTop: 20,
          borderRadius: 30,
          height: 55,
          marginHorizontal: 20,
          // width: "maxContent",
          backgroundColor: "#14BF61",
        }}
        // type="clear"
        titleStyle={{
          fontSize: fontSizes.h3,
        }}
        onPress={handleSignIn}
      >
        Sign In
      </Button>
      <Button
        type="clear"
        buttonStyle={{
          marginTop: 20,
          borderRadius: 30,
          height: 55,
          marginHorizontal: 20,
          // width: "maxContent",
          // backgroundColor: "#14BF61",
        }}
        // type="clear"
        titleStyle={{
          fontSize: fontSizes.h3,
          textDecorationLine: "underline",
          color: "gray",
        }}
        onPress={() => {
          navigation.push("/forgotPass");
        }}
      >
        Forgot Password
      </Button>
    </View>
  );
}

export default typePin;
