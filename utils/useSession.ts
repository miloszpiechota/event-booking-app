// hooks/useSession.ts
import { useState, useEffect } from 'react';
import { supabase } from '../superbaseClient.ts';  // Zaktualizuj ścieżkę do pliku z konfiguracją Supabase

// Custom hook do zarządzania sesją użytkownika
export const useSession = () => {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    // Funkcja do pobrania sesji przy załadowaniu komponentu
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    };

    // Nasłuchiwanie zmian sesji (np. logowanie, wylogowanie)
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // Pobranie sesji początkowej
    getSession();

    // Czyszczenie nasłuchiwacza sesji przy odmontowywaniu komponentu
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  return session;
};
