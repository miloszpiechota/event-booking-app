import { supabase } from "../superbaseClient.ts";


 export const fetchRatings = async (id: any) => {
    const { data, error } = await supabase
    .from("event_rate")
    .select("rating")
    .eq("event_id", id); // ← bardzo ważne!
  
    
    if (error) {
        console.error('Error fetching ratings:', error);
        return [];
    }
    
    return data;
}