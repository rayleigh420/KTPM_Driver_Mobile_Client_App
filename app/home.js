import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";

export default function Home() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Link href="/gettingMode" className="font-bold text-red-500">
        Getting Mode
      </Link>
    </View>
  );
}
