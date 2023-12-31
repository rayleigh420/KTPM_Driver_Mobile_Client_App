import React, { useState, useEffect, useRef } from "react";
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
import { ViewMap } from "../src/components";
import { router, Stack, useRouter } from "expo-router";
import { Button } from "@rneui/base";
import { Icon } from "@rneui/themed";
import { images, fontSizes } from "../src/constants";
import { TouchableOpacity } from "react-native";
import { io } from "socket.io-client";
import { removeData, storeData } from "../src/utils/asyncStorage";
import { useSocket } from "../src/utils/SocketContext";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,
} from "react-native-popup-menu";

function gettingMode() {
  const services = [
    {
      id: 1,
      title: "Service type",
      icon: "car",
    },
    {
      id: 2,
      title: "Favorite destination",
      icon: "bolt",
    },
    {
      id: 3,
      title: "Working capital",
      icon: "briefcase",
    },
    {
      id: 4,
      title: "Automatically receive",
      icon: "bolt",
    },
    {
      id: 5,
      title: "More",
      icon: "bolt",
    },
  ];
  const { socketRef, connectSocket, disconnectSocket } = useSocket();
  const [status, setStatus] = useState(false);
  const navigation = useRouter();
  const handleClickStatus = () => {
    if (status === true) {
      setStatus(false);
      if (socketRef.current) {
        disconnectSocket();
      }
    } else if (status === false) {
      setStatus(true);
    }
  };
  useEffect(() => {
    (async () => {
      if (status === true) {
        connectSocket();
        if (socketRef.current) {
          socketRef.current.on("rideRequest", (data) => {
            // console.log("Data ride request: ", data);
            navigation.push({
              pathname: "/gettingTransport",
            });
            storeData(data, "dataUserBooking");
          });
        }
      }
    })();
  }, [status]);
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
          headerBackVisible: false,
        }}
      />
      <View className="h-full">
        <ViewMap targetAddress={"227 Nguyen Van Cu"} isShowUserLocation />
      </View>
      <View
        style={{
          height: 100,
          width: "100%",
          // backgroundColor: "w",
          position: "absolute",
          top: 50,
          left: 0,
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
          paddingHorizontal: 15,
        }}
      >
        <Button
          containerStyle={{
            borderRadius: 30,
          }}
          buttonStyle={{
            backgroundColor: "white",
            borderColor: "gray",
            borderWidth: 1,
            borderRadius: 30,
            width: 130,
            height: 50,
          }}
          titleStyle={{ color: "black", marginLeft: 5, fontWeight: 600 }}
          onPress={() => {
            navigation.push("/ICToday");
          }}
        >
          <Icon
            type="feather"
            name="bar-chart-2"
            color={"black"}
            style={{ alignSelf: "center" }}
          />
          Income
        </Button>
        <Menu>
          <MenuTrigger>
            <Image
              source={images.avatar}
              style={{
                height: 65,
                width: 65,
                borderRadius: 100,
              }}
            />
            <View
              style={{
                height: 15,
                width: 15,
                borderRadius: 100,
                backgroundColor: "#FF564D",
                position: "absolute",
                top: 4,
                right: 4,
                borderWidth: 2,
                borderColor: "white",
              }}
            />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: 70,
                height: 30,
                backgroundColor: "white",
                paddingHorizontal: 5,
                borderRadius: 20,
                marginTop: -10,
              }}
            >
              <Icon
                type="font-awesome"
                name="star"
                iconStyle={{
                  color: "#FFC232",
                  marginHorizontal: 5,
                  fontSize: 15,
                }}
              />
              <Text style={{ fontSize: fontSizes.h4, fontWeight: 600 }}>
                4.96
              </Text>
            </View>
          </MenuTrigger>
          <MenuOptions
            style={{
              position: "absolute",
              top: 60,
              left: 0,
              backgroundColor: "white",
              width: 200,
              paddingHorizontal: 10,
              paddingVertical: 10,
              borderRadius: 10,
            }}
          >
            <MenuOption
              onSelect={() => {
                navigation.push("/profile");
              }}
              text="Profile"
            />
            <MenuOption
              onSelect={() => {
                router.replace("/signIn");
                removeData("user");
              }}
            >
              <Text style={{ color: "red" }}>Log out</Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </View>
      <View
        style={{
          height: 255,
          width: "100%",
          position: "absolute",
          bottom: 0,
          left: 0,
          alignItems: "center",
          paddingHorizontal: 10,
        }}
      >
        <View
          style={{
            height: 50,
            width: "100%",
          }}
        >
          {!status ? (
            <Button
              buttonStyle={{
                backgroundColor: "#1A1A1A",
                borderColor: "gray",
                borderWidth: 1,
                borderRadius: 30,
                minWidth: 130,
                height: 50,
                alignSelf: "center",
              }}
              titleStyle={{
                color: "white",
                marginLeft: 5,
                fontWeight: 600,
                fontSize: fontSizes.h5,
              }}
              onPress={handleClickStatus}
            >
              <Icon
                type="feather"
                name="power"
                color={"black"}
                style={{ alignSelf: "center" }}
                iconStyle={{ color: "white" }}
              />
              Enable connection
            </Button>
          ) : (
            <Button
              buttonStyle={{
                backgroundColor: "#00864C",
                borderRadius: 100,
                width: 48,
                height: 48,
                alignItems: "center",
              }}
              onPress={handleClickStatus}
            >
              <Icon
                type="feather"
                name="power"
                color={"black"}
                style={{ alignSelf: "center" }}
                iconStyle={{ color: "white", marginBottom: 2 }}
              />
            </Button>
          )}
        </View>
        <View
          style={{
            marginTop: 12,
            height: 50,
            backgroundColor: "white",
            width: "100%",
            alignItems: "center",
            flexDirection: "row",
            borderRadius: 8,
          }}
        >
          <View
            style={{
              height: 12,
              width: 12,
              borderRadius: 100,
              backgroundColor: !status ? "#FF564D" : "#00864C",
              marginHorizontal: 15,
            }}
          />
          <Text
            style={{ fontSize: fontSizes.h3, color: "black", fontWeight: 600 }}
          >
            {!status ? "You are offline." : "You are online."}
          </Text>
        </View>
        <View
          style={{
            marginTop: 10,
            height: 135,
            backgroundColor: "white",
            width: "100%",
            alignItems: "flex-start",
            flexDirection: "row",
            borderRadius: 8,
            justifyContent: "space-evenly",
            paddingVertical: 30,
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
                    onPress={() => Alert.alert("You clicked " + item.title)}
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
      </View>
    </View>
  );
}
const styles = StyleSheet.create({});

export default gettingMode;
