import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { fetchPaymentMethods } from "../../utils/fetchPaymentMethods.ts";
import { Alert, Keyboard, TouchableWithoutFeedback } from "react-native";

import {
  
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
      // 1. Check if payment method is selected
      if (!paymentMethod) {
        Alert.alert("Error", "Please select a payment method.");
        return;
      }
  
      // 2. Get the user's authentication token and ID
      const token = await getUserToken();
      const userId = await getUserId();
  
      if (!token || !userId) {
        Alert.alert("Error", "User is not authenticated.");
        return;
      }
  
      // 3. Prepare the ticket_order object with the required fields
      const ticket_order = {
        event_ticket_id: event.event_ticket.id, // Use the event's ticket ID
        quantity: ticketQuantity, // Number of tickets
        unit_price:
          selectedOption === "standard"
            ? event.event_ticket.ticket_pricing.ticket_price
            : event.event_ticket.ticket_pricing.vip_price, // Price based on selected option
        ticket_pricing_id: event.event_ticket.ticket_pricing.id, // ID of the ticket pricing
        status: "paid", // Payment status
        created_at: new Date().toISOString(), // Current timestamp for created_at
      };
  
      // 4. Create the request body
      const requestBody = {
        user_id: userId, // The user's ID
        ticket_order: ticket_order, // Ticket order details
        payment_method_id: paymentMethod, // Payment method ID
        total_price: getTotalPrice(), // Total price for the order
        event_ticket_id: event.event_ticket.id, // Event ticket ID (for the order)
      };
  
      // 5. Log the data being sent to the API
      console.log("🛒 Wysyłane dane do API:", JSON.stringify(requestBody, null, 2));
  
      // 6. Call the API to process the payment
      const response = await fetch(
        "https://azbpvxuvzjcahzrkwuxk.supabase.co/functions/v1/payment-process",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Authorization token
          },
          body: JSON.stringify(requestBody), // Send the request body to the API
        }
      );
  
      // 7. Parse the response
      const data = await response.json().catch(() => null);
      console.log("📩 Odpowiedź serwera:", data);
  
      // 8. Check if the response was successful
      if (!response.ok || !data) {
        Alert.alert("Error", "Server error. Please try again.");
        return;
      }
  
      // 9. If successful, show success message
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
