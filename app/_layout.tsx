import {Stack} from "expo-router";
import React from "react";

import { SelectedLocationProvider } from "../context/SelectedLocationContext.tsx";
export default function App() {
    return (
        <SelectedLocationProvider>
        <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{headerTitle:"Welcome Screen"}} />
        <Stack.Screen name="auth" options={{headerShown: false}} />
        <Stack.Screen name="home" options={{headerShown: false}} />
        <Stack.Screen name="profile" options={{headerTitle:"Profile Screen"}} />
        <Stack.Screen name="tickets" options={{headerTitle:"Profile Screen"}} />
        <Stack.Screen name="event_details" options={{headerTitle:"Profile Screen"}} />
        <Stack.Screen name="location" options={{headerTitle:"Location Screen"}} />
        
        </Stack>
        </SelectedLocationProvider>
    );
    }