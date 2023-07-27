import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Slot, Stack } from "expo-router";
import { NativeWindStyleSheet } from "nativewind";

const queryClient = new QueryClient();

NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function HomeLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack />
    </QueryClientProvider>
  );
}
