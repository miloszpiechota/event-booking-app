import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import DropDownPicker from "react-native-dropdown-picker";

import { fetchPaymentMethods } from "../../utils/fetchPaymentMethods.ts";
import { handlePayment } from "../../utils/payment.ts";
import { supabase } from "../../superbaseClient.ts";

const TicketPayment = () => {
  const { eventData } = useLocalSearchParams();
  const [selectedOption, setSelectedOption] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ticketQuantityInput, setTicketQuantityInput] = useState("1");

  const event = eventData ? JSON.parse(eventData as string) : null;

  useEffect(() => {
    const loadMethods = async () => {
      const methods = await fetchPaymentMethods();
      if (methods?.length) {
        setItems(
          methods.map((m) => ({
            label: m.name,
            value: m.id,
          }))
        );
      }
    };
    loadMethods();
  }, []);

  const getTotalPrice = () => {
    const quantity = parseInt(ticketQuantityInput) || 1;
    const unit =
      selectedOption === "standard"
        ? event.event_ticket.ticket_pricing.ticket_price
        : event.event_ticket.ticket_pricing.vip_price;

    const fee = event.event_ticket.ticket_pricing.fee || 0;
    return parseFloat(unit) * quantity + fee;
  };

  const getUserToken = async () => {
    const { data, error } = await supabase.auth.getSession();
    return data?.session?.access_token || null;
  };

  const getUserId = async () => {
    const { data, error } = await supabase.auth.getUser();
    return data?.user?.id || null;
  };

  const onSubmit = async () => {
    if (!paymentMethod) {
      Alert.alert("Błąd", "Wybierz metodę płatności.");
      return;
    }
    const quantity = parseInt(ticketQuantityInput);
    if (!quantity || quantity <= 0) {
      Alert.alert("Błąd", "Podaj prawidłową liczbę biletów.");
      return;
    }

    try {
      setLoading(true);

      const token = await getUserToken();
      const userId = await getUserId();

      if (!token || !userId) {
        Alert.alert("Błąd", "Nie jesteś zalogowany.");
        return;
      }

      const unit_price =
        selectedOption === "standard"
          ? event.event_ticket.ticket_pricing.ticket_price
          : event.event_ticket.ticket_pricing.vip_price;

      await handlePayment({
        event,
        ticketCount: quantity,

        ticketType: selectedOption === "standard" ? "Standard" : "VIP",
        totalPrice: getTotalPrice(),
        paymentMethod, // ← to jest ID metody płatności (np. 3)
      });

      Alert.alert("Sukces", "Zamówienie zostało złożone!");
    } catch (e) {
      console.error(e);
      Alert.alert("Błąd", "Wystąpił problem podczas przetwarzania płatności.");
    } finally {
      setLoading(false);
    }
  };

  if (!event) return <Text>Brak danych wydarzenia</Text>;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.header}>{event.name}</Text>
        <Text style={styles.sub}>Typ: {event.event_category?.name}</Text>

        <Text style={styles.label}>Wybierz typ biletu:</Text>
        <View style={styles.segmentedContainer}>
          <TouchableOpacity
            style={[
              styles.segmentButton,
              selectedOption === "standard"
                ? styles.segmentSelected
                : styles.segmentUnselected,
            ]}
            onPress={() => setSelectedOption("standard")}
          >
            <Text
              style={[
                styles.segmentText,
                selectedOption === "standard"
                  ? styles.textSelected
                  : styles.textUnselected,
              ]}
            >
              Standard
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.segmentButton,
              selectedOption === "vip"
                ? styles.segmentSelected
                : styles.segmentUnselected,
            ]}
            onPress={() => setSelectedOption("vip")}
          >
            <Text
              style={[
                styles.segmentText,
                selectedOption === "vip"
                  ? styles.textSelected
                  : styles.textUnselected,
              ]}
            >
              VIP
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Ilość biletów:</Text>

        <Text style={styles.label}>Ilość biletów:</Text>

<TextInput
  style={styles.input}
  value={ticketQuantityInput}
  onChangeText={(v) => {
    const digitsOnly = v.replace(/[^0-9]/g, "");
    setTicketQuantityInput(digitsOnly);
  }}
  onBlur={() => {
    const parsed = parseInt(ticketQuantityInput);
    const clamped = Math.max(
      1,
      Math.min(event.event_ticket.quantity, parsed || 1)
    );
    setTicketQuantityInput(clamped.toString());
  }}
  keyboardType="numeric"
/>

<Text style={styles.ticketsLeftInfo}>
  Pozostało {event.event_ticket.quantity} biletów
</Text>


        <Text style={styles.label}>Metoda płatności:</Text>
        <DropDownPicker
          open={open}
          value={paymentMethod}
          items={items}
          setOpen={setOpen}
          setValue={setPaymentMethod}
          setItems={setItems}
          style={styles.dropdown}
          placeholder="Wybierz metodę"
        />

        <View style={styles.summary}>
          <Text style={styles.summaryTitle}>Podsumowanie</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Typ biletu:</Text>
            <Text style={styles.summaryValue}>
              {selectedOption === "standard" ? "Standard" : "VIP"}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Ilość:</Text>
            <Text style={styles.summaryValue}>
              {ticketQuantityInput || "1"}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Cena łącznie:</Text>
            <Text style={styles.summaryValue}>
              {getTotalPrice().toFixed(2)} zł
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.ctaButton}
          onPress={onSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.ctaButtonText}>Zatwierdź płatność</Text>
          )}
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default TicketPayment;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  sub: { fontSize: 16, color: "#555" },
  label: { marginTop: 20, fontWeight: "600", fontSize: 16 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  dropdown: {
    marginTop: 10,
    zIndex: 1000,
  },
  segmentedContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    gap: 12, // jeśli gap nie działa w twojej wersji RN, użyj marginRight w jednym przycisku
  },
  
  segmentButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 2,
  },
  
  segmentSelected: {
    backgroundColor: "#001F4D",
    borderColor: "#001F4D",
  },
  
  segmentUnselected: {
    backgroundColor: "transparent",
    borderColor: "#001F4D",
  },
  
  segmentText: {
    fontSize: 16,
    fontWeight: "600",
  },
  
  textSelected: {
    color: "#fff",
  },
  
  textUnselected: {
    color: "#001F4D",
  },
  

  summary: {
    marginTop: 30,
    padding: 16,
    backgroundColor: "#f5f5f5", // jasne tło jak na zdjęciu
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  
  summaryTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: "#001F4D", // granatowy jak w przyciskach
  },
  
  summaryRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  
  summaryLabel: {
    fontWeight: "500",
    color: "#333",
    fontSize: 15,
    flex: 1,
  },
  
  summaryValue: {
    fontWeight: "600",
    color: "#001F4D",
    fontSize: 15,
    flex: 2,
  },
  
  emoji: {
    fontSize: 16,
    marginRight: 6,
  },
  
  ctaButton: {
    marginTop: 30,
    backgroundColor: "#001F4D", // głęboki granat
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  
  ctaButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  ticketsLeftInfo: {
    fontSize: 14,
    color: "#555",
    marginTop: 6,
    marginBottom: 10,
  },
  
  

  button: {
    marginTop: 30,
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "white", fontWeight: "bold", fontSize: 16 },
});
