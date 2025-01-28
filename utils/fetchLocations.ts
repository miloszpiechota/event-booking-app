import { supabase } from '@/superbase';
import React from 'react'

export const fetchLocations = async () => {
    const{data,error} = await supabase.from('location').select('*');
    if(error){
        console.error('Error fetching locations:',error);
        return [];
    }
    return data;

};

