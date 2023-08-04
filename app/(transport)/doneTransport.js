import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@rneui/base";
import { Icon, Divider } from "@rneui/themed";
import { fontSizes, icons } from "../../src/constants";
import { Stack, useRouter } from "expo-router";

export default function SignIn() {
  const navigation = useRouter();
  const [countDown, setCountDown] = useState(30);
  const timer = useRef(countDown);
  useEffect(() => {
    timer.current = setInterval(() => {
      setCountDown((pre) => pre - 1);
    }, 1000);
  }, []);
  useEffect(() => {
    if (countDown === 0) {
      clearInterval(timer.current);
      navigation.push("/");
    }
  }, [countDown]);
  return (
    <View
      style={{
        flex: 1,
        // backgroundColor: "#14BF61",
      }}
    >
      <Stack.Screen
        options={{
          title: "",
          //   headerShown: false,
        }}
      />
      <View>
        <Text>Done</Text>
      </View>
    </View>
  );
}
