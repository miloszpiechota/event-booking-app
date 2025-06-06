import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { fetchOrders } from "../../utils/fetchOrders.ts";
import { fetchEventByTicketId } from "../../utils/fetchEventByTicketId.ts";
import OrderTicketCard from "../../components/OrderTicketCard.tsx";

export default function TicketsScreen() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const orders = await fetchOrders();

      const enrichedTickets = await Promise.all(
        orders
          .filter((order) => order.order_ticket && order.order_ticket.event_ticket)
          .map(async (order) => {
            const event = await fetchEventByTicketId(
              order.order_ticket.event_ticket.id
            );

            return {
              ...order.order_ticket,
              userId: order.user_id,
              orderId: order.id,
              qr_code: order.order_ticket.event_ticket.qr_code,
              event,
            };
          })
      );

      setTickets(enrichedTickets);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#011C40" />
      ) : tickets.length === 0 ? (
        <Text style={styles.empty}>Brak zakupionych biletów.</Text>
      ) : (
        <FlatList
          data={tickets}
          keyExtractor={(item) => `${item.orderId}-${item.id}`}
          renderItem={({ item }) => (
            <OrderTicketCard ticket={item} userId={item.userId} event={item.event} />
          )}
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  empty: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 50,
    color: "#999",
  },
});
