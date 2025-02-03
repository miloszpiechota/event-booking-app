import { supabase } from '../superbase.ts'; 
import React from 'react'

export const fetchEventCategory = async () => {
    const{data,error} = await supabase.from('event_category').select('*');
    if(error){
        console.error('Error fetching event_category:',error);
        return [];
    }
    return data;

};

