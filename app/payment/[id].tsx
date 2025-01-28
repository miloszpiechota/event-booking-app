import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { fetchPaymentMethods } from "@/utils/fetchPaymentMethods";
import { Keyboard, TouchableWithoutFeedback } from "react-native";

import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const TicketPayment = () => {
  const { eventData } = useLocalSearchParams();
  const [selectedOption, setSelectedOption] = useState("standard");
  const [ticketQuantity, setTicketQuantity] = useState(0);
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
      console.log(paymentMethods);
    };

    loadPaymentMethods();
  }, []);

  if (!eventData) {
    return <Text>Event not found</Text>;
  }

  const event = JSON.parse(eventData as string);

  const getTotalPrice = () => {
    const price =
      selectedOption === "standard"
        ? event.event_ticket?.ticket_pricing?.ticket_price
        : event.event_ticket?.ticket_pricing?.vip_price;

    return price
      ? parseFloat(price) * parseInt(ticketQuantity) +
          event.event_ticket?.ticket_pricing?.fee
      : 0;
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View style={styles.container}>
      <View style={styles.info_container}>
        <Text style={styles.title}>Ticket: {event.name}</Text>
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
          value={ticketQuantity}
          onChangeText={(text) => {
            const numericValue = text.replace(/[^0-9]/g, ""); // Remove non-numeric characters
            setTicketQuantity(numericValue === "" ? "1" : numericValue);
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
    </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
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
    marginVertical: 12,
  },
  quantityInput: {
    width: "80%",
    height: 40,
    marginVertical: 10,
    paddingLeft: 10,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 16,
  },
  dropdown: {
    backgroundColor: "#f9f9f9",
    borderColor: "#ddd",
    borderRadius: 10,
    marginTop: 10,
  },
  dropdownContainer: {
    backgroundColor: "#fff",
    borderColor: "#ddd",
    borderRadius: 10,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
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
