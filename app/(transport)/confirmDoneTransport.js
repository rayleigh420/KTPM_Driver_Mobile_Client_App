import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@rneui/base";
import { Icon, Divider } from "@rneui/themed";
import { fontSizes, icons } from "../../src/constants";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";

export default function SignIn() {
  const navigation = useRouter();
  const params = useLocalSearchParams();
  const { nameCustomer, price, methodPayment, bookingID } = params;
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#353B47",
      }}
    >
      <Stack.Screen
        options={{
          title: "",
          headerShown: false,
        }}
      />
      <View
        style={{
          flex: 85,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 60,
            marginBottom: 20,
            paddingHorizontal: 20,
          }}
        >
          <Text style={{ fontSize: fontSizes.h3, color: "white" }}>
            {nameCustomer}
          </Text>
          <View
            style={{
              backgroundColor: "#C9D6DE",
              borderRadius: 5,
              width: 40,
              paddingVertical: 2,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "black",
              }}
            >
              {methodPayment}
            </Text>
          </View>
        </View>
        <Divider />
        <View style={{ paddingHorizontal: 20 }}>
          <View style={styles.transportField}>
            <Text style={styles.textField}>Fixed price</Text>
            <Text style={styles.textField}>{price}</Text>
          </View>
          <View style={styles.transportField}>
            <Text style={styles.textField}>Guest registration fee</Text>
            <Text style={styles.textField}>0</Text>
          </View>
          <View style={styles.transportField}>
            <Text style={styles.textField}>Platform fee</Text>
            <Text style={styles.textField}>0</Text>
          </View>
          <View style={styles.transportField}>
            <Text style={styles.textField}>Traffic fee</Text>
            <Text style={styles.textField}>0</Text>
          </View>
          <View style={styles.transportField}>
            <Text style={styles.textField}>Surcharge</Text>
            <Text style={styles.textField}>0</Text>
          </View>
          <Divider />
          <View style={styles.transportField}>
            <Text
              style={[
                styles.textField,
                { fontWeight: 600, fontSize: fontSizes.h1 },
              ]}
            >
              Total revenue
            </Text>
            <Text
              style={[
                styles.textField,
                { fontWeight: 600, fontSize: fontSizes.h1 },
              ]}
            >
              {price} vnd
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 15,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
        }}
      >
        <Button
          buttonStyle={{
            borderRadius: 8,
            width: 150,
            height: 50,
            backgroundColor: "white",
          }}
          titleStyle={{ color: "#6AABFF" }}
          onPress={() => {
            navigation.push("/");
          }}
        >
          Cancel
        </Button>
        <Button
          buttonStyle={{
            borderRadius: 8,
            width: 150,
            height: 50,
            backgroundColor: "#00884B",
          }}
          onPress={() => {
            navigation.push({
              pathname: "/doneTransport",
              params: {
                methodPayment: methodPayment,
                price: price,
                bookingID: bookingID,
              },
            });
          }}
        >
          Confirm
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  transportField: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    justifyContent: "space-between",
  },
  textField: {
    color: "white",
    fontSize: fontSizes.h3,
  },
});
