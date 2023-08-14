import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@rneui/base";
import { Icon, Divider } from "@rneui/themed";
import { fontSizes, icons } from "../../src/constants";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import _ from "lodash";
import { getLocationString } from "../../src/api/mapAPI";
import { getData } from "../../src/utils/asyncStorage";
import { useSocket } from "../../src/utils/SocketContext";

export default function SignIn() {
  const navigation = useRouter();
  const [countDown, setCountDown] = useState(30);
  const timer = useRef(countDown);
  const [dataUserBooking, setDataUserBooking] = useState(null);
  const { socketRef, connectSocket, disconnectSocket } = useSocket();

  useEffect(() => {
    timer.current = setInterval(() => {
      setCountDown((pre) => pre - 1);
    }, 1000);
  }, []);
  useEffect(() => {
    if (countDown === 0) {
      clearInterval(timer.current);
      navigation.push("/");
    }
  }, [countDown]);
  useEffect(() => {
    (async () => {
      const dataUserBookingTemp = await getData("dataUserBooking");
      setDataUserBooking(dataUserBookingTemp);
    })();
  }, []);

  const { data: destinationString } = useQuery({
    queryKey: ["locationString", dataUserBooking?.destination],
    queryFn: () =>
      getLocationString(
        dataUserBooking?.destination?.lat,
        dataUserBooking?.destination?.lon
      ),
  });
  const { data: pickUpString } = useQuery({
    queryKey: ["locationString", dataUserBooking?.pickup],
    queryFn: () =>
      getLocationString(
        dataUserBooking?.pickup?.lat,
        dataUserBooking?.pickup?.lon
      ),
  });
  return (
    <View
      style={{
        flex: 1,
        // backgroundColor: "#14BF61",
      }}
    >
      <Stack.Screen
        options={{
          title: "",
          headerShown: false,
        }}
      />
      <View style={{ flex: 30, backgroundColor: "#1C2135" }}>
        <TouchableOpacity
          style={{
            position: "absolute",
            top: 40,
            right: 30,
          }}
          onPress={() => {
            navigation.back();
          }}
        >
          <Icon
            name="x-circle"
            type="feather"
            backgroundColor="#AEB6C9"
            style={{ borderRadius: 100 }}
          />
        </TouchableOpacity>
        <View
          style={{
            height: 140,
            width: "100%",
            // backgroundColor: "green",
            marginTop: 70,
            paddingLeft: 40,
          }}
        >
          <Text style={{ color: "white", fontSize: fontSizes.h6 }}>vnd</Text>
          <Text style={{ fontSize: 38, color: "white" }}>
            {dataUserBooking?.price}
          </Text>
          <Text style={{ color: "white", fontSize: fontSizes.h5 }}>
            Net income
          </Text>
          <View
            style={{
              backgroundColor: "#C9D6DE",
              borderRadius: 5,
              width: 40,
              paddingVertical: 2,
              marginTop: 20,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "black",
              }}
            >
              {dataUserBooking?.paymentMethod}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{ flex: 70, backgroundColor: "#2D3247", paddingHorizontal: 20 }}
      >
        <View style={{ width: "100%" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              marginVertical: 20,
            }}
          >
            <Icon name="user" type="feather" color="white" />
            <Text
              style={{
                fontSize: fontSizes.h2,
                fontWeight: 600,
                color: "white",
              }}
            >
              GrabBike
            </Text>
          </View>
          <Divider />
          <View style={{ marginTop: 20 }}>
            {/* <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 30,
              }}
            >
              <Text
                style={{
                  fontWeight: 600,
                  color: "white",
                  fontSize: fontSizes.h4,
                }}
              >
                0.16
              </Text>
              <Text style={{ color: "white" }}> km from you</Text>
            </View> */}

            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <View
                style={{
                  height: 110,
                  width: 20,
                  marginTop: 5,
                  marginRight: 10,
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    height: 20,
                    width: 20,
                    borderRadius: 100,
                    backgroundColor: "green",
                  }}
                >
                  <View
                    style={{
                      height: 5,
                      width: 5,
                      borderRadius: 100,
                      backgroundColor: "white",
                      alignSelf: "center",
                      marginTop: 8,
                    }}
                  />
                </View>
                <View
                  style={{ width: 1, backgroundColor: "white", height: 70 }}
                />
                <View
                  style={{
                    height: 20,
                    width: 20,
                    borderRadius: 100,
                    backgroundColor: "red",
                  }}
                >
                  <View
                    style={{
                      height: 5,
                      width: 5,
                      borderRadius: 100,
                      backgroundColor: "white",
                      alignSelf: "center",
                      marginTop: 8,
                    }}
                  />
                </View>
              </View>
              <View style={{ height: 100, width: "90%" }}>
                <View style={{ height: 88 }}>
                  <Text
                    style={{
                      color: "white",
                      fontSize: fontSizes.h1,
                      fontWeight: 600,
                    }}
                  >
                    {_.trim(_.split(pickUpString, ",")[0])}
                  </Text>
                  <Text style={{ color: "white" }}>{pickUpString}</Text>
                </View>
                <View>
                  <Text
                    style={{
                      color: "white",
                      fontSize: fontSizes.h1,
                      fontWeight: 600,
                    }}
                  >
                    {_.trim(_.split(destinationString, ",")[0])}
                  </Text>
                  <Text style={{ color: "white" }}>{destinationString}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={{ marginTop: "75%" }}>
          <Button
            buttonStyle={{
              backgroundColor: "#009A4F",
              borderRadius: 5,
              height: 50,
              alignItems: "center",
              justifyContent: "space-between",
            }}
            titleStyle={{ marginLeft: 30 }}
            onPress={() => {
              clearInterval(timer.current);
              socketRef.current.emit("driverResponse", {
                status: "accept",
              });
              navigation.push({
                pathname: "/progressTransport",
                params: {
                  pickUpLocation: pickUpString,
                  destinationLocation: destinationString,
                  nameCustomer: dataUserBooking?.customer?.username,
                  price: +dataUserBooking?.price,
                  methodPayment: dataUserBooking?.paymentMethod,
                  customerId: dataUserBooking?.customerId,
                  destinationLatitude: dataUserBooking?.destination?.lat,
                  destinationLongitude: dataUserBooking?.destination?.lon,
                },
              });
            }}
          >
            <View />
            Accept
            <View
              style={{
                height: 30,
                width: 30,
                borderRadius: 100,
                backgroundColor: "#007437",
              }}
            >
              <Text
                style={{
                  alignSelf: "center",
                  marginTop: 5,
                  color: "white",
                  fontWeight: 600,
                }}
              >
                {countDown}
              </Text>
            </View>
          </Button>
        </View>
      </View>
    </View>
  );
}
