import { View, Text, Image, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Button } from "@rneui/base";
import { Icon, Divider } from "@rneui/themed";
import { fontSizes, icons } from "../../src/constants";
import { Stack, useRouter } from "expo-router";

export default function SignIn() {
  const navigation = useRouter();
  const [show, setShow] = useState(false);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <Stack.Screen
        options={{
          title: "Earnings yesterday",
          headerStyle: {
            height: 56,
            backgroundColor: "white",
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
            Net income
          </Text>
          <Text>10 jobs</Text>
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
        }}
      >
        <View>
          <Button
            buttonStyle={{
              justifyContent: "space-between",
              paddingHorizontal: 20,
              paddingVertical: 20,
              backgroundColor: "white",
            }}
            titleStyle={{ color: "black" }}
            onPress={() => {
              setShow(!show);
            }}
          >
            Income details
            <Icon
              type="font-awesome-5"
              name={show ? "angle-up" : "angle-down"}
              color="#0B0B0B"
            />
          </Button>
          {show ? (
            <View>
              <View>
                <View style={styles.detailIncome}>
                  <Text style={{ fontSize: fontSizes.h3, fontWeight: 400 }}>
                    Net income from customers
                  </Text>

                  <Text style={{ fontSize: fontSizes.h3, fontWeight: 400 }}>
                    999.999
                  </Text>
                </View>
                <View style={styles.detailIncome}>
                  <Text style={styles.textDetailIncome}>Ride price</Text>
                  <Text style={styles.textDetailIncome}>999.999</Text>
                </View>
                <View style={styles.detailIncome}>
                  <Text style={styles.textDetailIncome}>
                    Application fees and taxes
                  </Text>
                  <Text style={styles.textDetailIncome}>-12.999</Text>
                </View>
                <View style={styles.detailIncome}>
                  <Text style={styles.textDetailIncome}>
                    High demand surcharge
                  </Text>
                  <Text style={styles.textDetailIncome}>67.789</Text>
                </View>
              </View>
              <Divider
                style={{
                  marginTop: 20,
                  marginVertical: 10,
                  marginHorizontal: 10,
                }}
              />
              <View>
                <View style={styles.detailIncome}>
                  <Text style={{ fontSize: fontSizes.h3, fontWeight: 400 }}>
                    Net income from delivery
                  </Text>

                  <Text style={{ fontSize: fontSizes.h3, fontWeight: 400 }}>
                    999.999
                  </Text>
                </View>
                <View style={styles.detailIncome}>
                  <Text style={styles.textDetailIncome}>Ride price</Text>
                  <Text style={styles.textDetailIncome}>999.999</Text>
                </View>
                <View style={styles.detailIncome}>
                  <Text style={styles.textDetailIncome}>
                    Income from delivery
                  </Text>
                  <Text style={styles.textDetailIncome}>12.999</Text>
                </View>
                <View style={styles.detailIncome}>
                  <Text style={styles.textDetailIncome}>
                    Application fees and taxes
                  </Text>
                  <Text style={styles.textDetailIncome}>-67.789</Text>
                </View>
              </View>
              <Divider
                style={{
                  marginTop: 20,
                  marginVertical: 20,
                  marginHorizontal: 10,
                }}
              />
              <View style={styles.detailIncome}>
                <Text style={{ fontSize: fontSizes.h3, fontWeight: 400 }}>
                  Bonus
                </Text>

                <Text style={{ fontSize: fontSizes.h3, fontWeight: 400 }}>
                  99.999
                </Text>
              </View>
            </View>
          ) : (
            <></>
          )}
        </View>
        {!show ? (
          <Divider style={{ marginHorizontal: 10 }} />
        ) : (
          <Divider style={{ marginTop: 20, marginHorizontal: 10 }} />
        )}
        <View
          style={{
            justifyContent: "space-between",
            paddingHorizontal: 20,
            flexDirection: "row",
            marginTop: 20,
          }}
        >
          <Text style={{ fontSize: fontSizes.h3, fontWeight: 600 }}>
            Net income
          </Text>

          <Text style={{ fontSize: fontSizes.h2, fontWeight: 600 }}>
            999.999
          </Text>
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
