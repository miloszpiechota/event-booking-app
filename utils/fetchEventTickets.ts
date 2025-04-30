import { supabase } from "../superbaseClient.ts"; // upewnij się, że masz poprawnie skonfigurowany klient Supabase

const fetchEventTickets = async () => {
   
    const { data, error } = await supabase
        .from('event_ticket')
        .select(`
        id,
        quantity,
        qr_code,
        ticket_pricing:ticket_pricing_id (
            ticket_price, 
            vip_price, 
            fee
        )
        `);
    
    if (error) {
        console.error('Error fetching event tickets:', error);
        return [];
    }
    
    return data;
}

