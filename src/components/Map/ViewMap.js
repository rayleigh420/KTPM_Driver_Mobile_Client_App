import {
  View,
  Text,
  PermissionsAndroid,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Marker, Polygon } from "react-native-maps";
import * as Location from "expo-location";
import MapViewDirections from "react-native-maps-directions";
import { useQuery } from "@tanstack/react-query";
import { calculateDistance, getCoordinates } from "../../api/mapAPI";
import { useNavigation, useRouter } from "expo-router";
import { EXPO_PUBLIC_MAP_APIKEY } from "@env";

export default function ViewMap({ targetAddress }) {
  const [location, setLocation] = useState(null);
  const navigation = useNavigation();

  const {
    data: desCoor,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["find", targetAddress],
    queryFn: () => getCoordinates(targetAddress),
  });

  const { data: distance } = useQuery({
    queryKey: ["distance", targetAddress],
    queryFn: () => {
      if (location) {
        return calculateDistance({
          origin: location,
          destination: desCoor,
        });
      } else {
        return () => {};
      }
    },
  });

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          navigation.goBack();
          console.log("Fail");
          return;
        }

        let result = await Location.getCurrentPositionAsync({});
        setLocation({
          latitude: result.coords.latitude,
          longitude: result.coords.longitude,
        });
      } catch (error) {
        console.log(error);
        navigation.goBack();
      }
    })();
  }, []);

  const [marginBottom, setMarginBottom] = useState(null);

  return (
    <View className="flex-1">
      {location != null ? (
        <MapView
          onMapReady={() => {
            setMarginBottom(5);
          }}
          className="w-full h-full"
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
          showsMyLocationButton={true}
          userInterfaceStyle="dark"
          showsCompass={true}
          mapPadding={{ top: 400, bottom: 300, right: 20 }}
          style={{ flex: 1, marginBottom: marginBottom }}
        >
          {/* <MapViewDirections
            origin={desCoor}
            destination={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            apikey={EXPO_PUBLIC_MAP_APIKEY}
            strokeWidth={7}
            strokeColor="#00B0FF"
          /> */}
          {/* <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title={"Current Location " + distance}
          >
            <View
              style={{
                backgroundColor: "red",
                padding: 10,
                borderRadius: 100,
                opacity: 0.5,
              }}
            >
              <View
                style={{
                  padding: 5,
                  borderRadius: 100,
                  backgroundColor: "blue",
                }}
              />
            </View>
          </Marker> */}
          {/* <Marker coordinate={desCoor} title="Destination Location" /> */}
        </MapView>
      ) : (
        <View className="h-full flex justify-center items-center">
          <ActivityIndicator size="large" color="#00B14F" />
        </View>
      )}
    </View>
  );
}
