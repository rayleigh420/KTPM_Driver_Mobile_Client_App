import React, { useState, useEffect, useRef } from "react";
import {
  Platform,
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  Alert,
  TouchableOpacity,
  Animated,
} from "react-native";
import * as Location from "expo-location";
import { ViewMap } from "../../src/components";
import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import { Button, Divider } from "@rneui/base";
import { Icon } from "@rneui/themed";
import { images, fontSizes } from "../../src/constants";
import { useSocket } from "../../src/utils/SocketContext";
import { BackHandler } from "react-native";
import { ButtonGoogleMap } from "../../src/components";
import SlidingUpPanel from "rn-sliding-up-panel";

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
  const { socketRef, connectSocket, disconnectSocket } = useSocket();
  const [location, setLocation] = useState(null);
  const timer = useRef(null);
  const panelRef = useRef(null);
  const handleClickButtonProgress = async () => {
    if (status === 1) {
      setStatus(2);
    } else if (status === 2) {
      setStatus(3);
    } else {
      clearInterval(timer.current);
      timer.current = null;
      navigation.push({
        pathname: "/confirmDoneTransport",
        params: {
          nameCustomer: nameCustomer,
          price: price,
          methodPayment: methodPayment,
        },
      });
    }
  };
  const params = useLocalSearchParams();
  const {
    pickUpLocation,
    destinationLocation,
    nameCustomer,
    price,
    methodPayment,
    customerId,
    destinationLatitude,
    destinationLongitude,
    pickUpLatitude,
    pickUpLongitude,
  } = params;
  useEffect(() => {
    panelRef.current.show();
    const backAction = () => {
      // Đặt hành động bạn muốn thực hiện ở đây khi người dùng nhấn nút Back
      // Ví dụ: thông báo hoặc không thực hiện gì cả.
      return true; // Trả về true để chặn việc điều hướng trở lại màn hình trước
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    const updateLocation = async () => {
      try {
        let { status: statusLocation } =
          await Location.requestForegroundPermissionsAsync();
        if (statusLocation !== "granted") {
          setErrorMsg("Permission to access location was denied");
          console.log("Fail");
          return;
        }
        let result = await Location.getCurrentPositionAsync({});
        setLocation({
          latitude: result.coords.latitude,
          longitude: result.coords.longitude,
        });
        if (status === 1) {
          if (socketRef.current) {
            socketRef.current.emit("updateLocationDriver", {
              customerId: customerId,
              location: {
                lat: result.coords.latitude,
                lon: result.coords.longitude,
              },
            });
          }
        }
      } catch (error) {
        console.log(error);
        // navigation.goBack();
      }
    };
    if (timer.current === null) {
      timer.current = setInterval(updateLocation, 5000);
    }

    return () => {
      clearInterval(timer.current);
      timer.current = null;
      backHandler.remove();
    };
  }, []);

  useEffect(() => {
    if (location) {
      if (
        location.latitude === destinationLatitude &&
        location.longitude === destinationLongitude
      ) {
        clearInterval(timer.current);
        timer.current = null;
      }
    }
  }, [location]);
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
          targetAddress={status !== 3 ? pickUpLocation : destinationLocation}
          marginBottomViewMap={70}
          isMapViewDirection
          locationCustom={location}
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
          // backgroundColor: "red",
        }}
      >
        <SlidingUpPanel
          ref={panelRef}
          draggableRange={{ top: 390, bottom: 80 }}
          animatedValue={new Animated.Value(180)}
          showBackdrop={false}
          friction={0.2}
        >
          <>
            <View
              style={{
                height: 80,
                backgroundColor: "white",
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 10,
                justifyContent: "space-between",
                // backgroundColor: "blue",
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
              <View
                style={{ alignItems: "center", justifyContent: "flex-end" }}
              >
                <View
                  style={{
                    height: 6,
                    width: 40,
                    backgroundColor: "gray",
                    borderRadius: 5,
                    marginBottom: 15,
                    opacity: 0.5,
                  }}
                />
                <Text
                  style={{
                    fontSize: fontSizes.h3,
                    fontWeight: 600,
                    color: "#007437",
                  }}
                >
                  {status !== 3 ? "Pick up customer" : "Delivered customer"}
                </Text>
              </View>
              <ButtonGoogleMap
                latitude={status !== 3 ? pickUpLatitude : destinationLatitude}
                longitude={
                  status !== 3 ? pickUpLongitude : destinationLongitude
                }
                // label={status !== 3 ? pickUpLocation : destinationLocation}
              />
            </View>
            <Divider />
            <View
              style={{
                height: 150,
                backgroundColor: "white",
                width: "100%",
                paddingHorizontal: 10,
                gap: 10,
              }}
            >
              <Text style={{ fontSize: fontSizes.h3 }}>{nameCustomer}</Text>
              <Text style={{ fontSize: fontSizes.h2, fontWeight: 600 }}>
                {status !== 3 ? pickUpLocation : destinationLocation}
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
                height: 100,
                // backgroundColor: "green",
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
          </>
        </SlidingUpPanel>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({});

export default progressTransport;
