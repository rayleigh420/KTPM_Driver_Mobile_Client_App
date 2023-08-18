import { View, Text, TextInput, Image } from "react-native";
import React, { useState } from "react";
import { Button } from "@rneui/base";
import { Icon } from "@rneui/themed";
import { fontSizes, images } from "../../src/constants";
import { validateEmail } from "../../src/utils/validates";
import { Stack, useRouter } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import { signUp } from "../../src/api/testAPI";
import axios from "../../src/utils/axios";

import { LogBox } from "react-native";
import { storeData } from "../../src/utils/asyncStorage";

LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

export default function SignUp() {
  const navigation = useRouter();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errorEmail, setErrorEmail] = useState("");

  const [showError, setShowError] = useState(false);

  const signUpMutation = useMutation({
    mutationFn: ({ email, role }) => signUp({ email, phone, role }),
    onSuccess: (data) => {
      navigation.push("/typePass");
      storeData(email, "emailSignUp");
      // console.log(data);
    },
    onError: (err) => {
      if (err.response.status !== 200) {
        setErrorEmail(err.response.data.message);
        setShowError(true);
      }
    },
  });

  const handleSubmitEmail = async () => {
    if (validateEmail(email)) {
      signUpMutation.mutate({
        email: email,
        role: "driver",
      });
    } else {
      setErrorEmail("Invalid email");
      setShowError(true);
    }
  };
  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
      }}
    >
      <Stack.Screen
        options={{
          title: "",
          headerStyle: {
            height: 56,
          },
          headerShadowVisible: false,
          headerRight: () => {
            return (
              <View
                style={{
                  // height: 56,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  minWidth: 295,
                }}
              >
                <Text
                  style={{
                    fontSize: fontSizes.h3,
                    fontWeight: 700,
                    marginRight: 20,
                  }}
                >
                  Get Started
                </Text>
              </View>
            );
          },
        }}
      />
      <View
        style={{
          height: 100,
          marginTop: 30,
        }}
      >
        <Text
          style={{
            fontSize: fontSizes.h4,
            marginLeft: 20,
          }}
        >
          Email
        </Text>
        <View
          style={{
            // flexDirection: "row",
            marginTop: 20,
            marginHorizontal: 20,
          }}
        >
          <TextInput
            placeholder="grab@gmail.com"
            placeholderTextColor={"gray"}
            style={{
              fontSize: fontSizes.h3,
              borderBottomWidth: 1,
              borderBottomColor: showError ? "red" : "gray",
            }}
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setShowError(false);
            }}
          />
          {showError && (
            <Text style={{ marginTop: 10, color: "red" }}>{errorEmail}</Text>
          )}
        </View>
      </View>
      <View
        style={{
          height: 80,
          marginTop: 10,
        }}
      >
        <Text
          style={{
            fontSize: fontSizes.h4,
            marginLeft: 20,
          }}
        >
          Phone
        </Text>
        <View
          style={{
            // flexDirection: "row",
            marginTop: 20,
            marginHorizontal: 20,
          }}
        >
          <TextInput
            placeholder="099999999"
            placeholderTextColor={"gray"}
            keyboardType="number-pad"
            style={{
              fontSize: fontSizes.h3,
              borderBottomWidth: 1,
              // borderBottomColor: showError ? "red" : "gray",
            }}
            value={phone}
            onChangeText={(text) => {
              setPhone(text);
              // setShowError(false);
            }}
          />
          {/* {showError && (
            <Text style={{ marginTop: 10, color: "red" }}>{errorEmail}</Text>
          )} */}
        </View>
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          marginBottom: 35,
        }}
      >
        <Button
          title={"Sign Up"}
          buttonStyle={{
            borderRadius: 30,
            height: 55,
            marginHorizontal: 20,
            backgroundColor: "#14BF61",
          }}
          titleStyle={{
            fontSize: fontSizes.h2,
          }}
          onPress={handleSubmitEmail}
        />
      </View>
    </View>
  );
}
