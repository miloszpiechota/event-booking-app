import { supabase } from "../superbaseClient.ts";

export const fetchUserTickets = async (userId: string) => {
  const { data, error } = await supabase
    .from("ticket_order")
    .select(`
      id,
      quantity,
      unit_price,
      status,
      created_at,
      qr_code,
      event_ticket: event_ticket_id (
        id,
        event: event_id (
          name,
          start_date,
          location:location_id (
            city_name,
            street_name
          )
        ),
        ticket_pricing:ticket_pricing_id (
          ticket_price,
          vip_price
        )
      )
    `)
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching user tickets:", error.message);
    return [];
  }

  return data;
};
