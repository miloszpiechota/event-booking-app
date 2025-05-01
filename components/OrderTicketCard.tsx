import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import styles from "./OrderTicketCard.styles";

const OrderTicketCard = ({ ticket, userId, event }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const qrCodeRef = useRef(null);

  const formatDate = (date: string) =>
    date
      ? new Date(date).toLocaleDateString("pl-PL", {
          weekday: "long",
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : "Brak";

  const formatTime = (date: string) =>
    date
      ? new Date(date).toLocaleTimeString("pl-PL", {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "Brak";

  const isVip = ticket.unit_price === ticket.ticket_pricing?.vip_price;
  const qrData = JSON.stringify({
    ticketId: ticket.id,
    userId,
    eventName: event?.name,
    quantity: ticket.quantity,
    type: isVip ? "VIP" : "Standard",
  });

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => setModalVisible(true)}
    >
      {event?.image_url && (
        <Image source={{ uri: event.image_url }} style={styles.cardImage} />
      )}

      {/* VIP badge */}
      {isVip && (
        <View style={styles.vipBadge}>
          <Text style={styles.vipText}>🔥 VIP</Text>
        </View>
      )}

      {/* Ticket quantity */}
      {ticket.quantity > 1 && (
        <View style={styles.quantityBadge}>
          <Text style={styles.quantityText}>x{ticket.quantity}</Text>
        </View>
      )}

      {/* Overlay with event name and date */}
      <View style={styles.overlay}>
        <Text style={styles.cardTitle}>{event?.name}</Text>
        <Text style={styles.cardDate}>{formatDate(event?.start_date)}</Text>
      </View>

      {/* Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{event?.name}</Text>
              <Text style={styles.modalText}>
                📍 {event?.location?.city_name}, {event?.location?.street_name}
              </Text>
              <Text style={styles.modalText}>
                🗓 {formatDate(event?.start_date)} | 🕒 {formatTime(event?.start_date)}
              </Text>
              <Text style={styles.modalText}>
                🎟 Ilość: {ticket.quantity} ({isVip ? "VIP" : "Standard"})
              </Text>
              <Text style={styles.modalText}>
                💰 Cena: {(ticket.quantity * ticket.unit_price).toFixed(2)} zł
              </Text>
              <View style={styles.qrContainer}>
                <QRCode value={qrData} size={160} />
                <Text style={styles.qrNote}>Pokaż ten kod QR przy wejściu</Text>
              </View>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Zamknij</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </TouchableOpacity>
  );
};

export default OrderTicketCard;
