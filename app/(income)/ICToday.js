import {
  View,
  Text,
  TextInput,
  Image,
  FlatList,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Button } from "@rneui/base";
import { Icon, Tab, TabView } from "@rneui/themed";
import { fontSizes, images } from "../../src/constants";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { titleHeader } from "../../src/utils/titleHeaderDynamic";
import { ButtonIncome, CardIncome } from "../../src/components";

export default function ICtoday() {
  const navigation = useRouter();
  const [index, setIndex] = React.useState(0);
  const router = useRouter();
  const params = useLocalSearchParams();
  const incomes = [
    {
      id: 1,
      income: 222.222,
      currency: "vnd",
      type: 1,
      title: "Earnings today",
      path: "/ICToday",
    },
    {
      id: 2,
      income: 333.333,
      currency: "vnd",
      type: 0,
      title: "Earnings yesterday",
      path: "/ICYesterday",
    },
    {
      id: 3,
      income: 444.444,
      currency: "vnd",
      type: -1,
      title: "History",
      path: "/ICHistory",
    },
  ];
  return (
    <>
      <TabView
        value={index}
        onChange={setIndex}
        animationType="spring"
        disableSwipe
      >
        <TabView.Item style={{ backgroundColor: "red", width: "100%" }}>
          <SafeAreaView
            style={{
              flex: 1,
              backgroundColor: "white",
            }}
          >
            <Stack.Screen
              options={{
                title: !params.name ? "Income" : params.name,
                headerStyle: {
                  height: 56,
                  backgroundColor: "white",
                },
                headerShadowVisible: false,
              }}
            />
            <View
              style={{ flex: 25, backgroundColor: "white", paddingBottom: 10 }}
            >
              <FlatList
                horizontal
                // inverted
                data={incomes}
                renderItem={({ item }) => (
                  <CardIncome
                    income={item.income}
                    currency={item.currency}
                    title={item.title}
                    onPressCard={() => navigation.push(item?.path)}
                  />
                )}
                keyExtractor={(item, index) => index}
                showsHorizontalScrollIndicator={false}
              />
            </View>
            <View style={{ flex: 75, backgroundColor: "white" }}>
              <ButtonIncome
                title="The ride has been completed"
                value="5 rides"
              />
              <ButtonIncome title="Working capital" value="đ 222.222" />
            </View>
          </SafeAreaView>
        </TabView.Item>
        <TabView.Item style={{ backgroundColor: "blue", width: "100%" }}>
          <View
            style={{
              flex: 1,
              backgroundColor: "white",
            }}
          ></View>
        </TabView.Item>
        <TabView.Item
          style={{ backgroundColor: "white", width: "100%" }}
        ></TabView.Item>
      </TabView>
      <Tab
        value={index}
        onChange={(e) => {
          router.setParams({ name: titleHeader(e) });
          setIndex(e);
        }}
        disableIndicator
        style={{
          backgroundColor: "white",
        }}
      >
        <Tab.Item
          title="Income"
          icon={(active) => ({
            name: "dollar-sign",
            type: "font-awesome-5",
            color: active ? "#14BF61" : "gray",
          })}
          titleStyle={(active) => ({
            color: active ? "#14BF61" : "gray",
            fontSize: 12,
          })}
        />
        <Tab.Item
          title="Bonus"
          titleStyle={(active) => ({
            color: active ? "#14BF61" : "gray",
            fontSize: 12,
          })}
          icon={(active) => ({
            name: "gem",
            type: "font-awesome-5",
            color: active ? "#14BF61" : "gray",
          })}
        />
        <Tab.Item
          title="Wallet"
          titleStyle={(active) => ({
            color: active ? "#14BF61" : "gray",
            fontSize: 12,
          })}
          icon={(active) => ({
            name: "wallet",
            type: "font-awesome-5",
            color: active ? "#14BF61" : "gray",
          })}
        />
      </Tab>
    </>
  );
}
