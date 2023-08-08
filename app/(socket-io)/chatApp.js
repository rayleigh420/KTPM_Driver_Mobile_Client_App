import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, Text, Pressable, SafeAreaView, FlatList } from "react-native";
import { Feather } from "@expo/vector-icons";

import ChatComponent from "../../src/components/ChatComponent";
import { styles } from "../../src/utils/stylesChatApp";
import Modal from "../../src/components/Modal";
import socket from "../../src/utils/socket";
import axios from "../../src/utils/axios";

const Chat = () => {
  //👇🏻 Dummy list of rooms
  // const rooms = [
  //   {
  //     id: "1",
  //     name: "Novu Hangouts",
  //     messages: [
  //       {
  //         id: "1a",
  //         text: "Hello guys, welcome!",
  //         time: "07:50",
  //         user: "Tomer",
  //       },
  //       {
  //         id: "1b",
  //         text: "Hi Tomer, thank you! 😇",
  //         time: "08:50",
  //         user: "David",
  //       },
  //     ],
  //   },
  //   {
  //     id: "2",
  //     name: "Hacksquad Team 1",
  //     messages: [
  //       {
  //         id: "2a",
  //         text: "Guys, who's awake? 🙏🏽",
  //         time: "12:50",
  //         user: "Team Leader",
  //       },
  //       {
  //         id: "2b",
  //         text: "What's up? 🧑🏻‍💻",
  //         time: "03:50",
  //         user: "Victoria",
  //       },
  //     ],
  //   },
  // ];
  const [visible, setVisible] = useState(false);
  const [rooms, setRooms] = useState([]);

  //👇🏻 Runs when the component mounts
  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      const data = await axios.get("/api");
      setRooms(data.data);
    };
    // call the function
    fetchData()
      // make sure to catch any error
      .catch((err) => console.log(JSON.stringify(err)));
  }, []);
  //👇🏻 Runs whenever there is new trigger from the backend
  useEffect(() => {
    socket.on("roomsList", (rooms) => {
      setRooms(rooms);
    });
  }, [socket]);
  console.log(rooms);
  return (
    <SafeAreaView style={styles.chatscreen}>
      <View style={styles.chattopContainer}>
        <View style={styles.chatheader}>
          <Text style={styles.chatheading}>Chats</Text>

          {/* 👇🏻 Logs "ButtonPressed" to the console when the icon is clicked */}
          <Pressable onPress={() => setVisible(true)}>
            <Feather name="edit" size={24} color="green" />
          </Pressable>
        </View>
      </View>

      <View style={styles.chatlistContainer}>
        {rooms.length > 0 ? (
          <FlatList
            data={rooms}
            renderItem={({ item }) => <ChatComponent item={item} />}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <View style={styles.chatemptyContainer}>
            <Text style={styles.chatemptyText}>No rooms created!</Text>
            <Text>Click the icon above to create a Chat room</Text>
          </View>
        )}
      </View>
      {visible ? <Modal setVisible={setVisible} /> : ""}
    </SafeAreaView>
  );
};

export default Chat;
