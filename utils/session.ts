import { supabase } from '../superbaseClient.ts'; // upewnij się, że masz poprawnie skonfigurowany klient Supabase

// Pobiera access token aktualnie zalogowanego użytkownika
export async function getUserToken(): Promise<string | null> {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    console.error("❌ Błąd pobierania sesji:", error.message);
    return null;
  }
  return data.session?.access_token ?? null;
}

// Pobiera ID aktualnego użytkownika
export async function getUserId(): Promise<string | null> {
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.error("❌ Błąd pobierania użytkownika:", error.message);
    return null;
  }
  return data.user?.id ?? null;
}
