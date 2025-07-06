import { Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import "./global.css";

export default function RootLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen 
          name="(tabs)"
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="movies/[id]"
          options={{ headerShown: false }}
        />
      </Stack>
      <StatusBar hidden={true} />
    </>
  )
}
