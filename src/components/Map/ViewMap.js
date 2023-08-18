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
import { Icon } from "@rneui/themed";
import { fontSizes } from "../../constants";

export default function ViewMap({
  targetAddress,
  marginBottomViewMap,
  isShowUserLocation,
  isMapViewDirection,
  locationCustom,
}) {
  const [location, setLocation] = useState(
    locationCustom ? locationCustom : null
  );
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
    queryKey: ["distance", targetAddress, location, desCoor],
    queryFn: () => {
      if (location) {
        return calculateDistance({
          origin: location,
          destination: desCoor,
        });
      } else {
        return () => {
          return "0 km";
        };
      }
    },
  });

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          // navigation.goBack();
          console.log("Fail");
          return;
        }

        let result = await Location.getCurrentPositionAsync({});
        if (!locationCustom) {
          setLocation({
            latitude: result.coords.latitude,
            longitude: result.coords.longitude,
          });
        }
      } catch (error) {
        console.log(error);
        // navigation.goBack();
      }
    })();
  }, []);

  const [marginBottom, setMarginBottom] = useState(null);
  return (
    <View className="flex-1" style={{ marginBottom: marginBottomViewMap }}>
      {location ? (
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
          showsUserLocation={isShowUserLocation ? true : false}
          showsMyLocationButton={true}
          userInterfaceStyle="dark"
          showsCompass={true}
          mapPadding={{ top: 400, bottom: 300, right: 20 }}
          style={{ flex: 1, marginBottom: marginBottom }}
        >
          {isMapViewDirection ? (
            <>
              <MapViewDirections
                origin={desCoor}
                destination={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                }}
                apikey={EXPO_PUBLIC_MAP_APIKEY}
                strokeWidth={7}
                strokeColor="#00B0FF"
              />
              <Marker coordinate={desCoor} title="Destination Location" />
            </>
          ) : (
            <></>
          )}
          {!isShowUserLocation ? (
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title={"Current Location " + distance}
            >
              <View
                style={{
                  backgroundColor: "white",
                  borderRadius: 100,
                  borderWidth: 2,
                  borderColor: "#229BEB",
                }}
              >
                <View
                  style={{ height: 30, width: 30, justifyContent: "center" }}
                >
                  <Icon
                    type="font-awesome-5"
                    name="motorcycle"
                    iconStyle={{ fontSize: fontSizes.h3 }}
                  />
                </View>
              </View>
            </Marker>
          ) : (
            <></>
          )}
        </MapView>
      ) : (
        <View className="h-full flex justify-center items-center">
          <ActivityIndicator size="large" color="#00B14F" />
        </View>
      )}
    </View>
  );
}
