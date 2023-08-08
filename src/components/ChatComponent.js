import { View, Text, Pressable } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../utils/stylesChatApp";
import { useRouter } from "expo-router";

const ChatComponent = ({ item }) => {
  const navigation = useRouter();
  const [messages, setMessages] = useState({});

  //👇🏻 Retrieves the last message in the array from the item prop
  useLayoutEffect(() => {
    setMessages(item.messages[item.messages.length - 1]);
  }, []);

  ///👇🏻 Navigates to the Messaging screen
  const handleNavigation = () => {
    navigation.push({
      pathname: "/messagingChatApp",
      params: {
        id: item.id,
        name: item.name,
      },
    });
  };

  return (
    <Pressable style={styles.cchat} onPress={handleNavigation}>
      <Ionicons
        name="person-circle-outline"
        size={45}
        color="black"
        style={styles.cavatar}
      />

      <View style={styles.crightContainer}>
        <View>
          <Text style={styles.cusername}>{item.roomName}</Text>

          <Text style={styles.cmessage}>
            {messages?.text ? messages.text : "Tap to start chatting"}
          </Text>
        </View>
        <View>
          <Text style={styles.ctime}>
            {messages?.time ? messages.time : "now"}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ChatComponent;
