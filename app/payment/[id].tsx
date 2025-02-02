import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { fetchPaymentMethods } from "../../utils/fetchPaymentMethods.ts";
import { Alert, Keyboard, TouchableWithoutFeedback } from "react-native";

import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { supabase } from "../../superbase.ts";

const TicketPayment = () => {
  const { eventData } = useLocalSearchParams();
  const [selectedOption, setSelectedOption] = useState("standard");
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "Credit Card", value: "credit_card" },
    { label: "PayPal", value: "paypal" },
    { label: "Apple Pay", value: "apple_pay" },
  ]);

  useEffect(() => {
    const loadPaymentMethods = async () => {
      const paymentMethods = await fetchPaymentMethods();
      if (paymentMethods.length > 0) {
        setItems(
          paymentMethods.map((method: { name: any; id: any; }) => ({
            label: method.name, // Załóżmy, że kolumna w bazie to "name"
            value: method.id, // Załóżmy, że kolumna w bazie to "id"
          }))
        );
      }
    };

    loadPaymentMethods();
  }, []);

  if (!eventData) {
    return <Text>Event not found</Text>;
  }

  const event = JSON.parse(eventData as string);
  const getUserToken = async () => {
    const { data, error } = await supabase.auth.getSession();
    if (error || !data.session) {
      console.error("User is not logged in or session is missing", error);
      return null;
    }
    return data.session.access_token; // Zwracamy token JWT użytkownika
  };
  
  const getTotalPrice = () => {
    const price =
      selectedOption === "standard"
        ? event.event_ticket?.ticket_pricing?.ticket_price
        : event.event_ticket?.ticket_pricing?.vip_price;

    return price
      ? parseFloat(price) * parseInt(ticketQuantity.toString()) +
          event.event_ticket?.ticket_pricing?.fee
      : 0;
  };

  const getUserId = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) {
      console.error("User is not logged in", error);
      return null;
    }
    return data.user.id; // Pobieramy ID użytkownika
  };
  
  const handlePayment = async () => {
    try {
      if (!paymentMethod) {
        Alert.alert("Error", "Please select a payment method.");
        return;
      }
  
      const token = await getUserToken();
      const userId = await getUserId();
  
      if (!token || !userId) {
        Alert.alert("Error", "User is not authenticated.");
        return;
      }
  
      // Przygotowujemy pojedynczy obiekt ticket_order
      const ticket_order = {
        event_ticekt_id: event.event_ticket.id, // lub inny identyfikator biletu, jeśli taki masz
        quantity: ticketQuantity,
        unit_price:
          selectedOption === "standard"
            ? event.event_ticket.ticket_pricing.ticket_price
            : event.event_ticket.ticket_pricing.vip_price,
        ticket_pricing_id: event.event_ticket.ticket_pricing.id, // musisz mieć tę wartość
        status:"paid",
        creared_at: new Date().toISOString(),
      };
      
      const requestBody = {
        user_id: userId,
        ticket_order, // teraz obiekt zawiera wszystkie wymagane dane
        payment_method_id: paymentMethod,
        total_price: getTotalPrice(),
        event_ticket_id: event.event_ticket.id, // przekazujesz jeśli tabela tego wymaga
      };
      
  
      console.log("🛒 Wysyłane dane do API:", JSON.stringify(requestBody, null, 2));
  
      const response = await fetch(
        "https://azbpvxuvzjcahzrkwuxk.supabase.co/functions/v1/payment-process",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestBody),
        }
      );
  
      const data = await response.json().catch(() => null);
      console.log("📩 Odpowiedź serwera:", data);
  
      if (!response.ok || !data) {
        Alert.alert("Error", "Server error. Please try again.");
        return;
      }
  
      Alert.alert("Success", "Order placed successfully!");
    } catch (error) {
      console.error("Payment error:", error);
      Alert.alert("Error", "Failed to process the payment.");
    }
  };
  
  
  
  

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View style={styles.container}>
      <View style={styles.info_container}>
        <Text style={styles.title}>Ticket: {event.event_ticket.name}</Text>
        <Text style={styles.info}>Category: {event.event_category?.name}</Text>
        <Text style={styles.info}>
          Start date:{" "}
          {new Date(event.start_date).toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </Text>
        <Text style={styles.info}>
          Valid until:{" "}
          {new Date(event.end_date).toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </Text>
        <View style={styles.separator}></View>
      </View>

      <View>
        <Text style={styles.title}>Select pricing option:</Text>
        <View style={styles.segmentedContainer}>
          <TouchableOpacity
            style={[
              styles.segmentButton,
              selectedOption === "standard"
                ? styles.segmentButtonSelected
                : styles.segmentButtonUnselected,
            ]}
            onPress={() => setSelectedOption("standard")}
          >
            <Text
              style={[
                styles.segmentText,
                selectedOption === "standard"
                  ? styles.segmentTextSelected
                  : styles.segmentTextUnselected,
              ]}
            >
              Standard
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.segmentButton,
              selectedOption === "vip"
                ? styles.segmentButtonSelected
                : styles.segmentButtonUnselected,
            ]}
            onPress={() => setSelectedOption("vip")}
          >
            <Text
              style={[
                styles.segmentText,
                selectedOption === "vip"
                  ? styles.segmentTextSelected
                  : styles.segmentTextUnselected,
              ]}
            >
              VIP
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.info}>
          Selected: {selectedOption === "standard" ? "Standard" : "VIP"}
        </Text>
        <Text style={styles.info}>
          Price:{" "}
          {selectedOption === "standard"
            ? event.event_ticket?.ticket_pricing?.ticket_price
            : event.event_ticket?.ticket_pricing?.vip_price}
        </Text>

        <Text style={styles.title}>Input quantity:</Text>
        {/* Input for quantity */}
        <TextInput
          style={styles.quantityInput}
          keyboardType="numeric"
          value={ticketQuantity === 0 ? "" : ticketQuantity.toString()}
          onChangeText={(value) => {
            if (value === "") {
              setTicketQuantity(0);
            } else {
              const newQuantity = parseInt(value, 10);
              if (!isNaN(newQuantity) && newQuantity > 0) {
                if (newQuantity <= event.event_ticket.quantity) {
                  setTicketQuantity(newQuantity);
                } else {
                  setTicketQuantity(event.event_ticket.quantity);
                  Alert.alert("Exceeded ticket limit", `The maximum number of tickets is ${event.event_ticket.quantity}`);
                }
              } else {
                Alert.alert("Invalid ticket quantity", "The number of tickets must be greater than 0.");
              }
            }
          }}
        />

        <Text style={styles.title}>Select payment method:</Text>
        <DropDownPicker
          open={open}
          value={paymentMethod}
          items={items}
          setOpen={setOpen}
          setValue={setPaymentMethod}
          setItems={setItems}
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
          placeholder="Select a payment method"
        />
      </View>

      <View style={styles.separator} />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Fee:</Text>
        <Text style={styles.totalText}>
          {event.event_ticket?.ticket_pricing?.fee}
        </Text>
      </View>
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total price:</Text>
        <Text style={styles.totalAmount}>${getTotalPrice().toFixed(2)}</Text>
      </View>

      <TouchableOpacity style={styles.paymentButton} onPress={handlePayment}>
  <Text style={styles.paymentButtonText}>Confirm Payment</Text>
</TouchableOpacity>

    </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  paymentButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  paymentButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  info_container: {
    width: "100%",
    padding: 15,
    marginVertical: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
  },
  title: { fontSize: 22, fontWeight: "bold", marginTop: 10 },
  info: { fontSize: 16, color: "#333", marginTop: 15 },
  segmentedContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  segmentButton: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#333",
    alignItems: "center",
  },
  segmentButtonSelected: {
    backgroundColor: "#333",
  },
  segmentButtonUnselected: {
    backgroundColor: "white",
  },
  segmentText: {
    fontSize: 16,
  },
  segmentTextSelected: {
    color: "white",
  },
  segmentTextUnselected: {
    color: "black",
  },
  separator: {
    height: 1,
    backgroundColor: "black",

    marginTop:30
  },
  quantityInput: {
    width: "100%",
    height: 40,
    marginVertical: 10,
    paddingLeft: 10,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 16,
  },
  dropdown: {
    backgroundColor: "#f9f9f9",
    borderColor: "#ddd",
    borderRadius: 10,
    marginTop: 10,
    width: "100%",
    height: 40,
  },
  dropdownContainer: {
    backgroundColor: "#fff",
    borderColor: "#ddd",
    borderRadius: 10,
    
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    
  },
  totalText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4a79d9",
  },
});

export default TicketPayment;
