import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import React, { useState } from "react";
import { Button } from "@rneui/base";
import { Icon, Divider } from "@rneui/themed";
import { fontSizes, icons } from "../../src/constants";
import { Stack, useRouter } from "expo-router";
import { ButtonHistory } from "../../src/components";

export default function ICHistory() {
  const navigation = useRouter();
  const [show, setShow] = useState(false);
  const dataRides = [
    {
      id: 1,
      time: "05:60 PM",
      address: "6 Do SOn, p4, q.Tan Binh, TP.HCM",
      fee: 200.999,
      type: "cancel",
      method: "cash",
    },
    {
      id: 2,
      time: "05:60 PM",
      address: "5 Thang Long, p4, q.Tan Binh, TP.HCM",
      fee: 123.999,
      type: "success",
      method: "card",
    },
    {
      id: 3,
      time: "05:60 PM",
      address: "12 Truong SOn, p4, q.Tan Binh, TP.HCM",
      fee: 444.999,
      type: "cancel",
      method: "cash",
    },
    {
      id: 4,
      time: "05:60 PM",
      address: "1 Tan SOn Nhat, p4, q.Tan Binh, TP.HCM",
      fee: 555.999,
      type: "success",
      method: "card",
    },
    {
      id: 5,
      time: "12:00 PM",
      address: "1 Tan SOn Nhat, p4, q.Tan Binh, TP.HCM",
      fee: 555.999,
      type: "success",
      method: "card",
    },
  ];
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <Stack.Screen
        options={{
          title: "History",
          headerStyle: {
            height: 56,
            backgroundColor: "#F3F3F3",
          },
          headerShadowVisible: false,
        }}
      />
      <View
        style={{
          flex: 15,
          marginBottom: 10,
          backgroundColor: "white",
          paddingHorizontal: 20,
          justifyContent: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: fontSizes.h3, fontWeight: 600 }}>
            Total net income
          </Text>
        </View>

        <View
          style={{ flexDirection: "row", marginTop: 10, alignItems: "center" }}
        >
          <Text
            style={{
              fontSize: fontSizes.h1Large,
              marginTop: -6,
              fontWeight: 600,
            }}
          >
            222.222
          </Text>
          <Text
            style={{
              fontSize: fontSizes.h5,
              marginLeft: 6,
              textDecorationLine: "underline",
            }}
          >
            vnd
          </Text>
        </View>
      </View>
      <View style={{ height: 10, backgroundColor: "#E8E8E8", flex: 1 }} />
      <View
        style={{
          flex: 79,
          backgroundColor: "white",
          paddingHorizontal: 20,
        }}
      >
        <View style={{ marginTop: 20 }}>
          <Text
            style={{
              fontSize: fontSizes.h3,
              fontWeight: 600,
            }}
          >
            16 rides completed
          </Text>
          {dataRides && (
            <FlatList
              data={dataRides}
              renderItem={({ item }) => (
                <ButtonHistory
                  time={item.time}
                  address={item.address}
                  type={item.type}
                  fee={item.fee}
                  method={item.method}
                />
              )}
              keyExtractor={(item) => item.id}
              style={{ marginTop: 10, marginBottom: 50 }}
            />
          )}
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  detailIncome: {
    justifyContent: "space-between",
    paddingHorizontal: 20,
    flexDirection: "row",
  },
  textDetailIncome: {
    fontSize: fontSizes.h4,
    fontWeight: 400,
    color: "#919191",
  },
});
