// fetchEventByTicketId.ts
import { supabase } from "../superbaseClient.ts";

export const fetchEventByTicketId = async (eventTicketId: string) => {
  const { data, error } = await supabase
    .from("event")
    .select(`
       id,
      name,
      short_description,
      long_description,
      start_date,
      end_date,
      image_url,
      status,
      created_at,
      event_organizer:event_organizer_id(first_name, last_name, contact_email,contact_info,phone),
      location:location_id (
        city_name, 
        street_name, 
        apartment_number, 
        zip_code, 
        country_name, 
        latitude, 
        longitude
      ),
      event_category:category_id (name),
      event_ticket:event_ticket_id(id)
    `);

  if (error) {
    console.error("Error fetching events:", error);
    return null;
  }

  // Znajdź event, który ma event_ticket.id === eventTicketId
  const matchedEvent = data.find((event) => {
    return event.event_ticket?.id === eventTicketId;
  });

  return matchedEvent || null;
};
