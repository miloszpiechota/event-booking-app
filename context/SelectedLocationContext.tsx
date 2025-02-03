// SelectedLocationContext.tsx
import React, { createContext, useState, ReactNode } from "react";

// Definicja interfejsu dla lokalizacji.
// Rozszerz lub zmodyfikuj pola zgodnie z danymi zwracanymi przez API.
export interface LocationType {
  street_name: string;
  apartment_number: string;
  city_name: string;
  zip_code: string;
  country_name: string;
  // dodaj inne pola, jeśli są potrzebne
}

// Interfejs kontekstu, który zawiera aktualnie wybraną lokalizację
// oraz funkcję umożliwiającą jej aktualizację.
interface SelectedLocationContextType {
  selectedLocation: LocationType | null;
  setSelectedLocation: (location: LocationType | null) => void;
}

// Tworzymy kontekst z domyślną wartością.
export const SelectedLocationContext = createContext<SelectedLocationContextType>({
  selectedLocation: null,
  setSelectedLocation: () => {},
});

// Interfejs dla właściwości providera
interface SelectedLocationProviderProps {
  children: ReactNode;
}

// Provider otaczający komponenty, które potrzebują dostępu do kontekstu.
export const SelectedLocationProvider = ({ children }: SelectedLocationProviderProps) => {
  const [selectedLocation, setSelectedLocation] = useState<LocationType | null>(null);

  return (
    <SelectedLocationContext.Provider value={{ selectedLocation, setSelectedLocation }}>
      {children}
    </SelectedLocationContext.Provider>
  );
};
