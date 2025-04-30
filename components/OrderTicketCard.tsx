import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Alert,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import ViewShot from "react-native-view-shot";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import styles from "./OrderTicketCard.styles.js";

const OrderTicketCard = ({ ticket, userId }) => {
  const [showQr, setShowQr] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const qrAnim = useRef(new Animated.Value(0)).current;
  const viewShotRef = useRef(null);
  const qrCodeRef = useRef(null);

  const event = ticket?.event_ticket;
  const pricing = ticket?.ticket_pricing;

  const toggleQr = () => {
    setShowQr(!showQr);
    Animated.timing(qrAnim, {
      toValue: showQr ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const qrData = JSON.stringify({
    ticketId: ticket.id,
    userId,
    eventName: event?.name,
    quantity: ticket.quantity,
    type: ticket.unit_price === pricing?.vip_price ? "VIP" : "Standard",
  });

  const formatDate = (date: string) =>
    date ? new Date(date).toLocaleDateString("pl-PL") : "N/A";

  const generatePdf = async () => {
    try {
      const uri = await qrCodeRef.current.capture();
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const html = `
        <html><body>
        <h1>Bilet</h1>
        <p><strong>Wydarzenie:</strong> ${event?.name}</p>
        <p><strong>Ilość:</strong> ${ticket.quantity}</p>
        <img src="data:image/png;base64,${base64}" />
        </body></html>
      `;
      const { uri: pdfUri } = await FileSystem.printToFileAsync({ html });
      await Sharing.shareAsync(pdfUri);
    } catch (err) {
      Alert.alert("Błąd", "Nie udało się wygenerować PDF.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <TouchableOpacity style={styles.ticketInfo} onPress={() => setModalVisible(true)}>
          <Text style={styles.label}>NAZWA</Text>
          <Text style={styles.value}>{event?.name || "Brak"}</Text>

          <Text style={styles.label}>DATA</Text>
          <Text style={styles.value}>{formatDate(event?.created_at)}</Text>

          <Text style={styles.label}>ILOŚĆ</Text>
          <Text style={styles.value}>{ticket.quantity}</Text>

          <Text style={styles.label}>TYP</Text>
          <Text style={styles.value}>
            {ticket.unit_price === pricing?.vip_price ? "VIP" : "Standard"}
          </Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={generatePdf}>
              <Text style={styles.buttonText}>Pobierz PDF</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={toggleQr}>
              <Text style={styles.buttonText}>
                {showQr ? "Ukryj kod QR" : "Pokaż kod QR"}
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        <Animated.View
          style={[
            styles.qrSection,
            {
              height: qrAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 180],
              }),
            },
          ]}
        >
          {showQr && (
            <ViewShot ref={viewShotRef} options={{ format: "jpg", quality: 0.9 }}>
              <QRCode value={qrData} size={150} />
            </ViewShot>
          )}
        </Animated.View>

        {/* Ukryta sekcja PDF */}
        <View style={{ position: "absolute", top: -9999, left: -9999 }}>
          <ViewShot ref={qrCodeRef} options={{ format: "png", quality: 1 }}>
            <QRCode value={qrData} size={150} />
          </ViewShot>
        </View>

        {/* Modal */}
        <Modal visible={modalVisible} transparent animationType="slide">
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Szczegóły biletu</Text>
                <Text style={styles.modalText}>Nazwa: {event?.name}</Text>
                <Text style={styles.modalText}>
                  Data: {formatDate(event?.created_at)}
                </Text>
                <Text style={styles.modalText}>
                  Typ: {ticket.unit_price === pricing?.vip_price ? "VIP" : "Standard"}
                </Text>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.buttonText}>Zamknij</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    </View>
  );
};

export default OrderTicketCard;
