import { supabase } from "../superbaseClient.ts";

export const fetchOrders = async () => {
  console.log("Fetching orders...");

  // Get the logged-in user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error("User not logged in:", userError);
    return [];
  }

  // Fetch only orders belonging to the logged-in user
  const { data, error } = await supabase
    .from("order")
    .select(`
      id,
      created_at,
      status,
      user_id,
      payment:payment_id(total_price),
      order_ticket:order_ticket_id(
        quantity,
        unit_price,
        created_at,
        status,
        ticket_pricing:ticket_pricing_id(
          ticket_price,
          vip_price,
          fee,
          created_at
        ),  
        event_ticket:event_ticket_id(
          id,
          name,
          qr_code,
          created_at
        )
      )
    `)
    .eq("user_id", user.id); // Filter orders by logged-in user

  if (error) {
    console.error("Error fetching orders:", error);
    return [];
  }

  console.log("Fetched orders:", data);
  return data;
};
