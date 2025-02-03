import { supabase } from '../superbase.ts';

export const fetchEvents = async () => {
  const { data, error } = await supabase
    .from('event')
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
      event_ticket:event_ticket_id (
      id,
        name,
        quantity,
        qr_code,
        ticket_pricing:ticket_pricing_id (
          id,
          ticket_price, 
          vip_price, 
          fee
        )
      )
    `);

  if (error) {
    console.error('Error fetching events:', error);
    return [];
  }

  return data;
};
