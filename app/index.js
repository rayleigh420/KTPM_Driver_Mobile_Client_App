import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, View } from "react-native";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-red-400">Router</Text>
      <Link href="/home">Home page</Link>
      <Link href="/signUp" className="mt-[20px]">
        SignUp
      </Link>
      <Link href="/signIn" className="mt-[20px] text-blue-500">
        SignIn
      </Link>
      <Link href="/typePass" className="mt-[20px] text-blue-500">
        TypePass
      </Link>
      <Link href="/signInInput" className="mt-[20px]">
        signInInput
      </Link>
      <Link href="/forgotPass" className="mt-[20px]">
        forgot password
      </Link>
      <Link href="/ICToday" className="mt-[20px]">
        Today Income
      </Link>
      <Link href="/ICYesterday" className="mt-[20px]">
        Yesterday Income
      </Link>
      <Link href="/ICHistory" className="mt-[20px]">
        History Income
      </Link>
      <StatusBar style="auto" />
    </View>
  );
}
