import {Stack} from "expo-router";

export default function App() {
    return (
        <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{headerTitle:"Welcome Screen"}} />
        <Stack.Screen name="auth" options={{headerTitle:"Login Screen"}} />
        <Stack.Screen name="home" options={{headerTitle:"Home Screen"}} />
        <Stack.Screen name="profile" options={{headerTitle:"Profile Screen"}} />
        <Stack.Screen name="tickets" options={{headerTitle:"Profile Screen"}} />
        <Stack.Screen name="event_details" options={{headerTitle:"Profile Screen"}} />
        </Stack>
    );
    }