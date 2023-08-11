import React, { useState, useEffect } from "react";
import {
  Platform,
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  Alert,
} from "react-native";
import * as Location from "expo-location";
import { ViewMap } from "../../src/components";
import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import { Button, Divider } from "@rneui/base";
import { Icon } from "@rneui/themed";
import { images, fontSizes } from "../../src/constants";
import { TouchableOpacity } from "react-native";
import socket from "../../src/utils/socket";

function progressTransport() {
  const navigation = useRouter();
  const services = [
    {
      id: 1,
      title: "Chat",
      icon: "comment",
    },
    {
      id: 2,
      title: "Free call",
      icon: "phone",
    },
    {
      id: 3,
      title: "Support center",
      icon: "question-circle",
    },
    {
      id: 5,
      title: "More",
      icon: "bolt",
    },
  ];
  const [status, setStatus] = useState(1);
  const handleClickButtonProgress = () => {
    if (status === 1) {
      setStatus(2);
    } else if (status === 2) {
      setStatus(3);
    } else
      navigation.push({
        pathname: "/confirmDoneTransport",
        params: {
          nameCustomer: nameCustomer,
          price: price,
          methodPayment: methodPayment,
        },
      });
  };
  const params = useLocalSearchParams();
  const {
    pickUpLocation,
    destinationLocation,
    nameCustomer,
    price,
    methodPayment,
  } = params;
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Stack.Screen
        options={{
          title: "",
          // headerShadowVisible: false,
          headerShown: false,
        }}
      />
      <View className="h-full">
        <ViewMap
          targetAddress={"227 Nguyen Van Cu"}
          marginBottomViewMap={300}
        />
      </View>
      <View
        style={{
          height: "50%",
          width: "100%",
          position: "absolute",
          bottom: 0,
          left: 0,
          alignItems: "center",
        }}
      >
        <View
          style={{
            height: "20%",
            backgroundColor: "white",
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 10,
            justifyContent: "space-between",
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Icon
              type="font-awesome-5"
              name="motorcycle"
              iconStyle={{ fontSize: fontSizes.h4 }}
              color={"black"}
            />
            <Text style={{ fontSize: fontSizes.h5 }}>GrabBike</Text>
          </View>
          <Text
            style={{
              fontSize: fontSizes.h3,
              fontWeight: 600,
              color: "#007437",
            }}
          >
            {status !== 3 ? "Pick up customer" : "Delivered customer"}
          </Text>
          <View style={{ alignItems: "center" }}>
            <Button
              buttonStyle={{
                height: 40,
                width: 40,
                borderRadius: 100,
                backgroundColor: "#1270C6",
              }}
            >
              <Icon
                type="feather"
                name="navigation"
                iconStyle={{ fontSize: fontSizes.h4 }}
                color={"white"}
              />
            </Button>
            <Text style={{ fontSize: fontSizes.h5 }}>Directional</Text>
          </View>
        </View>
        <Divider />
        <View
          style={{
            height: "40%",
            backgroundColor: "white",
            width: "100%",
            paddingHorizontal: 10,
            gap: 10,
          }}
        >
          <Text style={{ fontSize: fontSizes.h3 }}>{nameCustomer}</Text>
          <Text style={{ fontSize: fontSizes.h2, fontWeight: 600 }}>
            {pickUpLocation}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                textDecorationLine: "underline",
                fontSize: fontSizes.h3,
              }}
            >
              {price} vnd
            </Text>
            <View
              style={{
                backgroundColor: "#C9D6DE",
                borderRadius: 5,
                width: 40,
                paddingVertical: 2,
                marginLeft: 10,
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
        </View>
        <Divider />
        <View
          style={{
            height: "40%",
            backgroundColor: "white",
            width: "100%",
          }}
        >
          <View
            style={{
              paddingTop: 10,
              height: 85,
              backgroundColor: "white",
              width: "100%",
              alignItems: "flex-start",
              flexDirection: "row",
              borderRadius: 8,
              justifyContent: "space-evenly",
              // paddingVertical: 30,
            }}
          >
            {services &&
              services.length > 0 &&
              services.map((item) => {
                return (
                  <View
                    key={item.id}
                    style={{
                      maxWidth: 70,
                      alignItems: "center",
                    }}
                  >
                    <Button
                      buttonStyle={{
                        height: 45,
                        width: 45,
                        borderRadius: 100,
                        backgroundColor: "#E8E8E8",
                      }}
                      onPress={() => {
                        if (item.id === 1) {
                          navigation.push("/messagingChatApp");
                        } else {
                          Alert.alert("You clicked " + item.title);
                        }
                      }}
                    >
                      <Icon
                        name={item.icon}
                        type="font-awesome"
                        iconStyle={{
                          fontSize: fontSizes.h2,
                        }}
                      />
                    </Button>
                    <Text
                      style={{
                        fontSize: 10,
                        color: "black",
                        textAlign: "center",
                      }}
                    >
                      {item.title}
                    </Text>
                  </View>
                );
              })}
          </View>
          <Button
            buttonStyle={{
              width: "80%",
              height: 50,
              backgroundColor: "#00823C",
              borderRadius: 40,
              paddingHorizontal: 20,
              alignSelf: "center",
            }}
            titleStyle={{ fontSize: fontSizes.h3 }}
            onPress={handleClickButtonProgress}
          >
            {status === 1 ? "Arrived" : status === 2 ? "Picked up" : "Paid"}
          </Button>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({});

export default progressTransport;
