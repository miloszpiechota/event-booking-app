import { View, Text, StyleSheet } from "react-native";

export default function TicketsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Tickets Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  text: { fontSize: 24, fontWeight: "bold" },
});
