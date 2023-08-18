import React from "react";
import { View, Text } from "react-native";
// import * as Linking from "react-native-linking";
import * as Linking from "expo-linking";
import { Button } from "@rneui/base";
import { Icon } from "@rneui/themed";
import { fontSizes } from "../../constants";

const GoogleMapsRedirect = ({ latitude, longitude, label }) => {
  const openGoogleMaps = () => {
    // const latitude = "YOUR_LATITUDE";
    // const longitude = "YOUR_LONGITUDE";
    // const label = "Location_Label";

    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}&travelmode=driving&dir_action=navigate&destination_place_id=${label}`;

    Linking.openURL(url).catch((err) =>
      console.error("An error occurred", err)
    );
  };

  return (
    <View
      style={{
        alignItems: "center",
      }}
    >
      {/* <Button title="Open Google Maps" onPress={openGoogleMaps} /> */}
      <Button
        buttonStyle={{
          height: 40,
          width: 40,
          borderRadius: 100,
          backgroundColor: "#1270C6",
        }}
        onPress={openGoogleMaps}
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
  );
};

export default GoogleMapsRedirect;
