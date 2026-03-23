import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ChatProvider } from './chatContext';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ChatProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="booting" />
          <Stack.Screen name="login" />
          <Stack.Screen name="home" />
          <Stack.Screen name="chat" />
        </Stack>
      </ChatProvider>
    </GestureHandlerRootView>
  );
}