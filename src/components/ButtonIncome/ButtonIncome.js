import { Card, Icon } from "@rneui/themed";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { Button } from "@rneui/base";
import { fontSizes } from "../../constants";
const ButtonIncome = (props) => {
  const { title, value } = props;
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
          flexDirection: "row",
          paddingHorizontal: 15,
          paddingVertical: 20,
        }}
      >
        <View style={{ flex: 90 }}>
          <Text style={{ fontSize: fontSizes.h4 }}>{title}</Text>
          <Text
            style={{ fontSize: fontSizes.h2, fontWeight: 700, marginTop: 10 }}
          >
            {value}
          </Text>
        </View>
        <View style={{ flex: 10 }}>
          <Icon type="font-awesome-5" name="angle-right" color="#0B0B0B" />
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default ButtonIncome;
