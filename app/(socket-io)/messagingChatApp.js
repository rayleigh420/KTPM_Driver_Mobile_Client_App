import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, TextInput, Text, FlatList, Pressable } from "react-native";
import { getData } from "../../src/utils/asyncStorage";
import MessageComponent from "../../src/components/MessageComponent";
import { styles } from "../../src/utils/stylesChatApp";
import { useLocalSearchParams } from "expo-router";
import socket from "../../src/utils/socket";

const Messaging = () => {
  const [chatMessages, setChatMessages] = useState([
    {
      id: "1",
      text: "Hello guys, welcome!",
      time: "07:50",
      user: "Tomer",
    },
    {
      id: "2",
      text: "Hi Tomer, thank you! 😇",
      time: "08:50",
      user: "David",
    },
  ]);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState("");
  const params = useLocalSearchParams();

  //👇🏻 Access the chatroom's name and id
  const { name, id } = params;

  //👇🏻 This function gets the username saved on AsyncStorage
  const getUsername = async () => {
    const data = await getData("username");
    if (data !== null) {
      setUser(data);
    }
  };

  //👇🏻 Sets the header title to the name chatroom's name
  useEffect(() => {
    // navigation.setOptions({ title: name });
    //👇🏻 Sends the id to the server to fetch all its messages
    socket.emit("findRoom", id);
    socket.on("foundRoom", (roomChats) => setChatMessages(roomChats));
    getUsername();
  }, []);

  //👇🏻 This runs when the messages are updated.
  useEffect(() => {
    socket.on("foundRoom", (roomChats) => setChatMessages(roomChats));
  }, [socket]);

  /*👇🏻 
        This function gets the time the user sends a message, then 
        logs the username, message, and the timestamp to the console.
     */
  const handleNewMessage = () => {
    const hour =
      new Date().getHours() < 10
        ? `0${new Date().getHours()}`
        : `${new Date().getHours()}`;

    const mins =
      new Date().getMinutes() < 10
        ? `0${new Date().getMinutes()}`
        : `${new Date().getMinutes()}`;

    // console.log({
    //   message,
    //   user,
    //   timestamp: { hour, mins },
    // });
    socket.emit("newMessage", {
      message,
      room_id: id,
      user,
      timestamp: { hour, mins },
    });
  };

  return (
    <View style={styles.messagingscreen}>
      <View
        style={[
          styles.messagingscreen,
          { paddingVertical: 15, paddingHorizontal: 10 },
        ]}
      >
        {chatMessages[0] ? (
          <FlatList
            data={chatMessages}
            renderItem={({ item }) => (
              <MessageComponent item={item} user={user} />
            )}
            keyExtractor={(item) => item.id}
          />
        ) : (
          ""
        )}
      </View>

      <View style={styles.messaginginputContainer}>
        <TextInput
          style={styles.messaginginput}
          onChangeText={(value) => setMessage(value)}
        />
        <Pressable
          style={styles.messagingbuttonContainer}
          onPress={handleNewMessage}
        >
          <View>
            <Text style={{ color: "#f2f0f1", fontSize: 20 }}>SEND</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default Messaging;
