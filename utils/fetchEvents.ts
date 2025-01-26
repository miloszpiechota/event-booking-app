import { supabase } from '../superbase';

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
      location:location_id (city_name, street_name, apartment_number, zip_code, country_name, latitude, longitude),
      event_category:category_id (name)
    `);

  if (error) {
    console.error('Error fetching events:', error);
    return [];
  }

  return data;
};
