import { supabase } from "@/superbase";

export const fetchPaymentMethods = async () => {
    const{data,error} = await supabase.from('payment_method').select('*');

    if(error){
        console.error('Error fetching payment methods:',error);
        return [];
    }

    return data;
};