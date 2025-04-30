import { Alert } from "react-native";
import { supabase } from "../superbaseClient.ts";

export const createRating = async (
  rating: number,
  eventId: number,
  userId: string | null,
  setUserRating: (rating: number) => void
) => {
  Alert.alert(
    "Confirm Rating",
    `Are you sure you want to submit a rating of ${rating} stars?`,
    [
      { text: "Cancel", style: "cancel" },
      {
        text: "Confirm",
        onPress: async () => {
          setUserRating(rating);
          console.log("🔄 Sending rating to database...", { rating, eventId, userId });

          const { data, error } = await supabase
            .from("event_rate")
            .insert([
              {
                rating: rating,
                event_id: eventId,
                user_id: userId,
                created_at: new Date().toISOString(),
              },
            ])
            .select();

          if (error) {
            console.error("❌ Error rating event:", error.message);
            Alert.alert("Error", "There was a problem submitting your rating.");
          } else {
            console.log("✅ Successfully added rating:", data);
            setTimeout(() => {
              Alert.alert("Success", "Your rating has been submitted.");
            }, 500);
          }
        },
      },
    ]
  );
};
