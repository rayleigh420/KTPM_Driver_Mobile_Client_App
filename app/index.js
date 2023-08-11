import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, View } from "react-native";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white gap-3">
      <Text className="text-red-400">Router</Text>
      <Link href="/home">Home page</Link>
      <Link href="/gettingMode">Getting Mode</Link>
      <Link href="/gettingTransport">Getting Transport</Link>
      <Link href="/confirmDoneTransport">Confirm Done Transport</Link>
      <Link href="/doneTransport">Done Transport</Link>
      <Link href="/progressTransport">Progress Transport</Link>
      <StatusBar style="auto" />
    </View>
  );
}
