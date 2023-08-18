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
import { fontSizes, icons, images } from "../../src/constants";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useSocket } from "../../src/utils/SocketContext";
import { removeData, storeData } from "../../src/utils/asyncStorage";

export default function SignIn() {
  const navigation = useRouter();
  const [countDown, setCountDown] = useState(5);
  const timer = useRef(countDown);
  const { socketRef, connectSocket, disconnectSocket } = useSocket();
  useEffect(() => {
    timer.current = setInterval(() => {
      setCountDown((pre) => pre - 1);
    }, 1000);
  }, []);
  useEffect(() => {
    if (countDown === 0) {
      clearInterval(timer.current);
      handleReturnGettingMode();
    }
  }, [countDown]);
  const params = useLocalSearchParams();
  const { price, methodPayment } = params;
  const handleReturnGettingMode = async () => {
    navigation.push("/gettingMode");
    clearInterval(timer.current);
    connectSocket();
    if (socketRef.current) {
      socketRef.current.on("rideRequest", (data) => {
        navigation.push({
          pathname: "/gettingTransport",
        });
        removeData("dataUserBooking");
        storeData(data, "dataUserBooking");
      });
    }
  };
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
            alignItems: "center",
            marginTop: 60,
            marginBottom: 20,
            paddingHorizontal: 20,
          }}
        >
          <Text
            style={{ fontSize: fontSizes.h3, color: "white", fontWeight: 600 }}
          >
            Completed the ride
          </Text>
        </View>
        <View
          style={{
            height: "24%",
            width: "100%",
            backgroundColor: "white",
            alignSelf: "center",
          }}
        >
          <Image
            source={images.doneTransport}
            resizeMode="contain"
            style={{ width: "100%", height: "100%" }}
          />
        </View>
        <View
          style={{
            height: "40%",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: fontSizes.h2, color: "white" }}>
            Net Income
          </Text>
          <Text style={{ fontSize: 36, color: "white" }}>{price} vnd</Text>
          <View
            style={{
              backgroundColor: "#C9D6DE",
              borderRadius: 5,
              width: 40,
              paddingVertical: 2,
              marginTop: 15,
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
      <View style={{ paddingHorizontal: 20 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 15,
          }}
        >
          <View
            style={{
              height: 20,
              width: 20,
              borderRadius: 100,
              backgroundColor: "#33BAC2",
              justifyContent: "center",
              marginRight: 10,
              opacity: 0.6,
            }}
          >
            <Icon
              type="font-awesome-5"
              name="info"
              color="white"
              iconStyle={{ fontSize: fontSizes.h6, alignItems: "center" }}
            />
          </View>
          <Text
            style={{
              fontSize: fontSizes.h5,
              color: "white",
              opacity: 0.6,
            }}
          >
            You can view the transaction details in the Trip History
          </Text>
        </View>
        <Button
          buttonStyle={{
            width: "100%",
            height: 50,
            backgroundColor: "#00823C",
            borderRadius: 40,
            paddingHorizontal: 20,
            alignSelf: "center",
            marginBottom: 20,
            alignItems: "center",
            justifyContent: "space-between",
          }}
          titleStyle={{ fontSize: fontSizes.h3 }}
          onPress={handleReturnGettingMode}
        >
          <View />
          Done
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
