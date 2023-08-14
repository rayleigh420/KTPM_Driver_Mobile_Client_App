import { Link, Redirect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, View } from "react-native";

export default function App() {
  return <Redirect href="/home" />;
  // return (

  //   <View className="flex-1 items-center justify-center bg-white gap-3">
  //     <Text className="text-red-400">Router</Text>
  //     <Link href="/home">Home page</Link>
  //     <Link href="/signUp">SignUp</Link>
  //     <Link href="/signIn">SignIn</Link>
  //     <Link href="/typePass">TypePass</Link>
  //     <Link href="/signInInput">signInInput</Link>
  //     <Link href="/forgotPass">forgot password</Link>
  //     <Link href="/ICToday">Today Income</Link>
  //     <Link href="/ICYesterday">Yesterday Income</Link>
  //     <Link href="/ICHistory">History Income</Link>
  //     <Link href="/gettingMode" className="font-bold text-red-500">
  //       Getting Mode
  //     </Link>
  //     <Link href="/gettingTransport" className="font-bold text-red-500">
  //       Getting Transport
  //     </Link>
  //     <Link href="/confirmDoneTransport">Confirm Done Transport</Link>
  //     <Link href="/doneTransport">Done Transport</Link>
  //     <Link href="/progressTransport">Progress Transport</Link>
  //   </View>
  // );
}
