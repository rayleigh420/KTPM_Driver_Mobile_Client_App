import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Slot, Stack } from "expo-router";
import { NativeWindStyleSheet } from "nativewind";
import { MenuProvider } from "react-native-popup-menu";
import { SocketProvider } from "../src/utils/SocketContext";

const queryClient = new QueryClient();

NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function HomeLayout() {
  return (
    <SocketProvider>
      <QueryClientProvider client={queryClient}>
        <MenuProvider>
          <Stack />
        </MenuProvider>
      </QueryClientProvider>
    </SocketProvider>
  );
}
