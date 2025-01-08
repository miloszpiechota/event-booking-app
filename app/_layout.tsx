import {Stack} from "expo-router";

export default function App() {
    return (
        <Stack>
        <Stack.Screen name="index" options={{headerTitle:"Welcome Screen"}} />
        <Stack.Screen name="auth" options={{headerTitle:"Login Screen"}} />
        <Stack.Screen name="home" options={{headerTitle:"Home Screen"}} />
        </Stack>
    );
    }