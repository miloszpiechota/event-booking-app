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
      console.log("📦 Otrzymany QR data:", data);

      const token = data.includes("token=") ? data.split("token=")[1] : data;
      console.log("🔑 Wyodrębniony token:", token);

      if (!token) {
        Alert.alert("Błąd", "Nie można odczytać tokena z kodu QR.");
        return;
      }

      let decoded: string;
      try {
        decoded = Buffer.from(token, "base64").toString("utf-8");
        console.log("📜 Zdekodowany payload JSON:", decoded);
      } catch {
        Alert.alert("Błąd", "Token nie jest prawidłowym ciągiem base64.");
        return;
      }

      let payload: any;
      try {
        payload = JSON.parse(decoded);
        console.log("📦 Rozkodowany payload obiekt:", payload);
      } catch {
        Alert.alert("Błąd", "Nie można sparsować danych z tokena.");
        return;
      }

      const { ticketName, eventName, issuedAt, checksum } = payload;

      if (!ticketName || !eventName || !issuedAt || !checksum) {
        Alert.alert("Błąd", "Brakuje danych w QR.");
        return;
      }

      const raw = `${ticketName}:${eventName}:${issuedAt}`;
      const expectedChecksum = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        raw + secretKey
      );

      console.log("🔐 Oczekiwany checksum:", expectedChecksum);
      console.log("🧾 Otrzymany checksum:", checksum);

      if (expectedChecksum !== checksum) {
        Alert.alert(
          "Błąd",
          "Kod QR został zmodyfikowany lub jest nieprawidłowy."
        );
        return;
      }

      // 🔍 SZUKANIE BILETU W BAZIE
      console.log("🔍 Szukam biletu z qr_code:", token);

      const { data: rawTickets, error } = await supabase.from("order_ticket")
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
        console.error("❌ Błąd zapytania Supabase:", error);
        Alert.alert("Błąd", "Nie udało się pobrać danych z bazy.");
        return;
      }

      // 🔍 Ręczne filtrowanie tylko tych, które mają event_ticket i pasujący qr_code
      const matchingTickets = rawTickets.filter(
        (t) => t.event_ticket?.qr_code === token
      );

      console.log("🔍 Dopasowane bilety:", matchingTickets);

      if (matchingTickets.length === 0) {
        Alert.alert("Nie znaleziono", "Bilet nie istnieje w bazie.");
        return;
      }

      if (matchingTickets.length > 1) {
        console.warn(
          "⚠️ Znaleziono wiele biletów z tym samym QR:",
          matchingTickets
        );
        Alert.alert("Błąd", "Znaleziono wiele biletów z tym samym kodem QR.");
        return;
      }

      const ticket = matchingTickets[0];

      if (error) {
        console.error("❌ Błąd zapytania Supabase:", error);
        Alert.alert("Błąd", "Nie udało się pobrać danych z bazy.");
        return;
      }

      if (!ticket) {
        Alert.alert("Nie znaleziono", "Bilet nie istnieje w bazie.");
        return;
      }

      if (ticket.status !== "paid") {
        Alert.alert("Bilet nieważny", "Ten bilet został już wykorzystany.");
        return;
      }

      setTicketInfo(ticket);
    } catch (err) {
      console.error("❌ Błąd parsowania QR:", err);
      Alert.alert("Błąd", "Nie można odczytać danych z kodu.");
    }
  };

  const handleAuthorizeAccess = async () => {
    if (!ticketInfo) return;
  
    console.log("🛠️ Próbuję zaktualizować ticket o ID:", ticketInfo.id);
  
    const { data, error } = await supabase
      .from("order_ticket")
      .update({ status: "checked_in" })
      .eq("id", ticketInfo.id)
      .select(); // Dodajemy, by zobaczyć co Supabase faktycznie zwraca
  
    console.log("📥 Wynik update:", data);
  
    if (error) {
      console.error("❌ Błąd update Supabase:", error);
      Alert.alert("Błąd", "Nie udało się zaktualizować statusu biletu.");
    } else if (!data || data.length === 0) {
      Alert.alert("Błąd", "Nie znaleziono rekordu do aktualizacji.");
    } else {
      Alert.alert("Sukces", "Bilet został upoważniony i skasowany.");
      setTicketInfo(null);
      setScanned(false);
    }
  };
  

  if (hasPermission === null) return <Text>Proszę o dostęp do kamery...</Text>;
  if (hasPermission === false) return <Text>Brak dostępu do kamery</Text>;

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
      />

      {ticketInfo && (
        <View style={styles.ticketBox}>
          <Text style={styles.header}>✅ Bilet znaleziony</Text>
          <Text>ID biletu: {ticketInfo.id}</Text>
          <Text>Ilość: {ticketInfo.quantity}</Text>
          <Text>Cena jednostkowa: {ticketInfo.unit_price} zł</Text>
          <Text>Nazwa: {ticketInfo.event_ticket?.name}</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={handleAuthorizeAccess}
          >
            <Text style={styles.buttonText}>Upoważnij dostęp</Text>
          </TouchableOpacity>
        </View>
      )}

      {scanned && !ticketInfo && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => setScanned(false)}
        >
          <Text style={styles.buttonText}>Skanuj ponownie</Text>
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
