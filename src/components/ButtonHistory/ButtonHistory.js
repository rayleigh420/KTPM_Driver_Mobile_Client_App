import { Card, Icon } from "@rneui/themed";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { Button } from "@rneui/base";
import { fontSizes } from "../../constants";
const ButtonHistory = (props) => {
  const { time, address, fee, type, method } = props;
  return (
    <TouchableOpacity
      style={{
        width: Dimensions.get("window").width - 40,
        minHeight: 100,
        backgroundColor: "#F3F3F3",
        alignSelf: "center",
        borderRadius: 10,
        marginTop: 10,
      }}
    >
      <View
        style={{
          paddingHorizontal: 15,
          paddingVertical: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Text style={{ fontSize: fontSizes.h4 }}>{time}</Text>
          <Icon type="font-awesome-5" name="angle-right" color="#0B0B0B" />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Text style={{ fontSize: fontSizes.h4, maxWidth: "75%" }}>
            {address}
          </Text>
          {type === "success" ? (
            <Text style={{ fontSize: fontSizes.h4 }}>{fee}</Text>
          ) : (
            <Text
              style={{
                color: "#DE6943",
                fontSize: fontSizes.h4,
                marginTop: 10,
              }}
            >
              Cancel
            </Text>
          )}
        </View>
        {type === "success" ? (
          <View
            style={{
              backgroundColor: method === "cash" ? "#C9D6DE" : "#0069E8",
              borderRadius: 5,
              width: 40,
              paddingVertical: 3,
              marginTop: 5,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: method === "cash" ? "black" : "white",
              }}
            >
              {method === "cash" ? "Cash" : "Card"}
            </Text>
          </View>
        ) : (
          <></>
        )}
      </View>
    </TouchableOpacity>
  );
};
export default ButtonHistory;
