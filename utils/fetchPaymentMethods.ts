import { supabase } from "../superbaseClient.ts"; // upewnij się, że masz poprawnie skonfigurowany klient Supabase

export const fetchPaymentMethods = async () => {
    const{data,error} = await supabase.from('payment_method').select('*');

    if(error){
        console.error('Error fetching payment methods:',error);
        return [];
    }

    return data;
};