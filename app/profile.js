import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Button } from "@rneui/base";
import { Icon } from "@rneui/themed";
import { fontSizes, icons } from "../src/constants";
import { Stack, useRouter, router } from "expo-router";
import { EXPO_PUBLIC_API_KEY } from "@env";
import { getData } from "../src/utils/asyncStorage";

export default function Profile() {
  const [dataUser, setDataUser] = useState(null);
  useEffect(() => {
    (async () => {
      const data = await getData("user");
      setDataUser(data);
    })();
  }, []);
  return (
    <View
      style={{
        flex: 1,
        // backgroundColor: "#14BF61",
      }}
    >
      <Stack.Screen
        options={{
          title: "Profile",
          headerStyle: {
            height: 56,
            backgroundColor: "#14BF61",
          },
          // headerShadowVisible: false,
          // headerBackVisible: false,
        }}
      />
      <View
        style={{
          flex: 60,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            color: "black",
            fontSize: fontSizes.h3,
            fontWeight: "400",
          }}
        >
          {dataUser && `Username: ${dataUser.userName}`}
        </Text>
        <Text
          style={{
            color: "black",
            fontSize: fontSizes.h3,
            fontWeight: "400",
          }}
        >
          {dataUser && `Email: ${dataUser.email}`}
        </Text>
      </View>
    </View>
  );
}
