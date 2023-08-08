import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, View } from "react-native";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-red-400">Router</Text>
      <Link href="/home">Home page</Link>
      <Link href="/chatApp">Chat app using socket io</Link>
      <Link href="/loginChatApp">Login chat app</Link>
      <Link href="/messagingChatApp">messagingChatApp</Link>
      <StatusBar style="auto" />
    </View>
  );
}
