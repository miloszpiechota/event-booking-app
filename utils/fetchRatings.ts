import { supabase } from "../superbaseClient.ts";


 export const fetchRatings = async (id: any) => {
    const { data, error } = await supabase
        .from('event_rate')
        .select('*');
    
    if (error) {
        console.error('Error fetching ratings:', error);
        return [];
    }
    
    return data;
}