import { supabase } from "../superbaseClient.ts"; // upewnij się, że masz poprawnie skonfigurowany klient Supabase


export async function updateTicketQuantity(ticketId: number, ticketCount: number): Promise<void> {
  try {
    // Pobierz aktualną ilość biletów
    const { data: ticketData, error: fetchError } = await supabase
      .from("event_ticket")
      .select("quantity")
      .eq("id", ticketId)
      .single();

    if (fetchError || !ticketData) {
      console.error("Błąd pobierania danych o biletach:", fetchError);
      return;
    }

    // Oblicz nową ilość biletów
    const currentQuantity = ticketData.quantity;
    const newQuantity = currentQuantity - ticketCount;

    // Upewnij się, że nowa wartość nie jest ujemna
    if (newQuantity < 0) {
      console.error("Nie można zamówić więcej biletów niż dostępnych.");
      return;
    }

    // Wykonaj aktualizację
    const { data: updateData, error: updateError } = await supabase
      .from("event_ticket")
      .update({ quantity: newQuantity })
      .eq("id", ticketId);

    if (updateError) {
      console.error("Błąd aktualizacji ilości biletów:", updateError);
    } else {
      console.log("Zaktualizowano ilość biletów:", updateData);
    }
  } catch (error) {
    console.error("Nieoczekiwany błąd podczas aktualizacji biletów:", error);
  }
}
