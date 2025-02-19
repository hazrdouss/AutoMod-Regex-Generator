import React, { createContext, useContext, useState } from "react";
import defaultSettings from "../settings.ts";

interface SettingsContext {
   settings: typeof defaultSettings;
   setSettings: React.Dispatch<React.SetStateAction<typeof defaultSettings>>;
   setSetting: (key: string, value: string) => void;
   defaultSettings: typeof defaultSettings;
}

export const SettingsContext = createContext<SettingsContext | null>(null);

export default function SettingsContextProvider({
   children,
}: {
   children: React.ReactNode;
}) {
   const [settings, setSettings] = useState(defaultSettings);

   const setSetting = (key: string, value: string) => {
      setSettings((prev) => ({
         ...prev,
         [key]: value,
      }));
   };

   return (
      <SettingsContext.Provider
         value={{
            settings,
            setSettings,
            setSetting,
            defaultSettings,
         }}
      >
         {children}
      </SettingsContext.Provider>
   );
}

export const useSettingsContext = () => {
   const context = useContext(SettingsContext);
   if (context === undefined) {
      throw new Error(
         "useSettingsContext must be used within a SettingsContextProvider",
      );
   }
   return context;
};
