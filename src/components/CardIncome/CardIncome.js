import { Card } from "@rneui/themed";
import { View, Text } from "react-native";
import { Button } from "@rneui/base";
import { fontSizes } from "../../constants";
const CardIncome = (props) => {
  const { income, currency, title, onPressCard } = props;
  return (
    <View>
      <Card
        containerStyle={{
          width: 250,
          borderRadius: 10,
          elevation: 10,
          shadowColor: "#52006A",
        }}
      >
        <Card.Title style={{ fontSize: fontSizes.h4, alignSelf: "flex-start" }}>
          {title}
        </Card.Title>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              fontSize: fontSizes.h1,
              marginTop: -6,
              fontWeight: 600,
            }}
          >
            {income}
          </Text>
          <Text
            style={{
              fontSize: fontSizes.h5,
              marginLeft: 6,
              textDecorationLine: "underline",
            }}
          >
            {currency}
          </Text>
        </View>
        <Button
          buttonStyle={{
            backgroundColor: "white",
            alignSelf: "flex-start",
            marginLeft: -10,
            alignItems: "center",
          }}
          titleStyle={{
            color: "#014EB0",
            textAlign: "center",
          }}
          onPress={onPressCard}
        >
          Detail
        </Button>
      </Card>
    </View>
  );
};
export default CardIncome;
