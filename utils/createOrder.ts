// import { supabase } from "@/superbase";
// import { Alert } from "react-native";

// export const createOrder = async () => {
//     Alert.alert("Confirm Payment", 'Are you sure you want to pay for this order?',
//         [
//             { text: 'Cancel', style: 'cancel' },
//             {
//                 text: 'Confirm',
//                 onPress: async () => {
//                     console.log('🔄 Sending order to database...')

//                     const {data: paymentData, error: paymentError} = await supabase
//                     .from('payment')
//                     .insert([
//                         {
//                             amount: amount,
//                             total_price: totalPrice,
//                             status: 'paid',
//                             payment_method_id: paymentMathodId, 
//                             created_at: new Date().toISOString()
//                         }
//                     ]).select().single()


//                     if (paymentError) {
//                         console.error('❌ Error creating payment:', paymentError.message)
//                         Alert.alert('Error', 'There was a problem submitting your payment.')
//                         return
//                     }

//                     console.log("✅ Payment inserted:", paymentData);



//                     const { data, error } = await supabase
//                     .from("order")
//                     .insert([
//                         {
//                             user_id: userId,
//                             payment_id: 1,
//                             order_ticket_id: 1,
//                             status: 'paid',
//                             created_at: new Date().toISOString()
//                         }
//                     ])
//                     .select();

//                 }
//             }
//         ]
//     )    
// };