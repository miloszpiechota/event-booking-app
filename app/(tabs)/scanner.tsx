import React, { useEffect, useState } from "react";
import { Buffer } from "buffer";
import * as Crypto from "expo-crypto";
import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { CameraView, Camera } from "expo-camera";
import { supabase } from "../../superbaseClient.ts";
import Constants from "expo-constants";

const QrScanner = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [ticketInfo, setTicketInfo] = useState<any>(null);

  const secretKey = Constants.expoConfig?.extra?.QR_SECRET_KEY ?? "dev-secret";

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarcodeScanned = async ({ data }: { data: string }) => {
    setScanned(true);

    try {
      console.log("📦 Received QR data:", data);

      const token = data.includes("token=") ? data.split("token=")[1] : data;
      console.log("🔑 Extracted token:", token);

      if (!token) {
        Alert.alert("Error", "Cannot read token from QR code.");
        return;
      }

      let decoded: string;
      try {
        decoded = Buffer.from(token, "base64").toString("utf-8");
        console.log("📜 Decoded payload JSON:", decoded);
      } catch {
        Alert.alert("Error", "Token is not valid base64.");
        return;
      }

      let payload: any;
      try {
        payload = JSON.parse(decoded);
        console.log("📦 Parsed payload object:", payload);
      } catch {
        Alert.alert("Error", "Could not parse token data.");
        return;
      }

      const { ticketName, eventName, issuedAt, checksum } = payload;

      if (!ticketName || !eventName || !issuedAt || !checksum) {
        Alert.alert("Error", "QR code is missing required fields.");
        return;
      }

      const raw = `${ticketName}:${eventName}:${issuedAt}`;
      const expectedChecksum = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        raw + secretKey
      );

      console.log("🔐 Expected checksum:", expectedChecksum);
      console.log("🧾 Provided checksum:", checksum);

      if (expectedChecksum !== checksum) {
        Alert.alert("Error", "QR code has been tampered with or is invalid.");
        return;
      }

      // 🔍 Look up ticket in DB
      console.log("🔍 Looking for ticket with qr_code:", token);

      const { data: rawTickets, error } = await supabase
        .from("order_ticket")
        .select(`
          id,
          status,
          quantity,
          unit_price,
          event_ticket: event_ticket_id (
            id,
            name,
            qr_code
          )
        `);

      if (error) {
        console.error("❌ Supabase query error:", error);
        Alert.alert("Error", "Failed to fetch data from database.");
        return;
      }

      const matchingTickets = rawTickets.filter(
        (t) => t.event_ticket?.qr_code === token
      );

      console.log("🔍 Matching tickets:", matchingTickets);

      if (matchingTickets.length === 0) {
        Alert.alert("Not Found", "Ticket does not exist in the database.");
        return;
      }

      if (matchingTickets.length > 1) {
        console.warn("⚠️ Multiple tickets found with same QR:", matchingTickets);
        Alert.alert("Error", "Multiple tickets found with the same QR code.");
        return;
      }

      const ticket = matchingTickets[0];

      if (!ticket) {
        Alert.alert("Not Found", "Ticket does not exist in the database.");
        return;
      }

      if (ticket.status !== "paid") {
        Alert.alert("Invalid Ticket", "This ticket has already been used.");
        return;
      }

      setTicketInfo(ticket);
    } catch (err) {
      console.error("❌ QR parsing error:", err);
      Alert.alert("Error", "Could not read data from QR code.");
    }
  };

  const handleAuthorizeAccess = async () => {
    if (!ticketInfo) return;

    console.log("🛠️ Attempting to update ticket with ID:", ticketInfo.id);

    const { data, error } = await supabase
      .from("order_ticket")
      .update({ status: "checked_in" })
      .eq("id", ticketInfo.id)
      .select();

    console.log("📥 Update result:", data);

    if (error) {
      console.error("❌ Supabase update error:", error);
      Alert.alert("Error", "Failed to update ticket status.");
    } else if (!data || data.length === 0) {
      Alert.alert("Error", "Ticket record not found for update.");
    } else {
      Alert.alert("Success", "Ticket has been authorized and checked in.");
      setTicketInfo(null);
      setScanned(false);
    }
  };

  if (hasPermission === null) return <Text>Requesting camera access...</Text>;
  if (hasPermission === false) return <Text>No camera access</Text>;

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
      />

      {ticketInfo && (
        <View style={styles.ticketBox}>
          <Text style={styles.header}>✅ Ticket Found</Text>
          <Text>Ticket ID: {ticketInfo.id}</Text>
          <Text>Quantity: {ticketInfo.quantity}</Text>
          <Text>Unit Price: {ticketInfo.unit_price} zł</Text>
          <Text>Name: {ticketInfo.event_ticket?.name}</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={handleAuthorizeAccess}
          >
            <Text style={styles.buttonText}>Authorize Entry</Text>
          </TouchableOpacity>
        </View>
      )}

      {scanned && !ticketInfo && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => setScanned(false)}
        >
          <Text style={styles.buttonText}>Scan Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default QrScanner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "flex-end",
    padding: 20,
  },
  ticketBox: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
  },
  header: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
  },
  button: {
    marginTop: 16,
    padding: 12,
    backgroundColor: "#2D0C57",
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
