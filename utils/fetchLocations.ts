import { supabase } from '../superbaseClient.ts'; // upewnij się, że masz poprawnie skonfigurowany klient Supabase
import React from 'react'

export const fetchLocations = async () => {
    const{data,error} = await supabase.from('location').select('*');
    if(error){
        console.error('Error fetching locations:',error);
        return [];
    }
    return data;

};

