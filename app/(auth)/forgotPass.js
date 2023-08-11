import {
  View,
  Text,
  Image,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { Button, fonts } from "@rneui/base";
import { Icon } from "@rneui/themed";
import { fontSizes, icons } from "../../src/constants";
import { Stack, useRouter } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import { forgotPass } from "../../src/api/testAPI";
import { validateEmail } from "../../src/utils/validates";

function typePin() {
  const navigation = useRouter();
  const forgotPassMutation = useMutation({
    mutationFn: ({ email }) => forgotPass({ email }),
    onSuccess: (data) => {
      console.log(222, data);
      navigation.push("/signInInput");
    },
    onError: (err) => {
      if (err.response.status == 404) {
        setError(err.response.data.message);
      }
    },
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleResetPass = () => {
    if (validateEmail(email)) {
      forgotPassMutation.mutate({
        email: email,
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
          title: "Forgot Password",
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
        onPress={handleResetPass}
      >
        Reset Password
      </Button>
    </View>
  );
}

export default typePin;
