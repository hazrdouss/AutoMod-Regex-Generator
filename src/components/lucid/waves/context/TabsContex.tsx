import React, { createContext, useContext, useState } from "react";
import tabsList from "../tabs/tabsList.tsx";

interface TabsContext {
   tabsList: typeof tabsList;
   activeTab: string;
   setActiveTab: React.Dispatch<React.SetStateAction<string>>;
   tabsVisible: boolean;
   setTabsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

interface TabsContextProviderProps {
   children: React.ReactNode;
}

export const TabsContext = createContext<TabsContext | null>(null);

export default function TabsContextProvider({
   children,
}: TabsContextProviderProps) {
   const [activeTab, setActiveTab] = useState(tabsList()[0].id);
   const [tabsVisible, setTabsVisible] = useState<boolean>(false);

   return (
      <TabsContext.Provider
         value={{
            tabsList,
            activeTab,
            setActiveTab,
            tabsVisible,
            setTabsVisible,
         }}
      >
         {children}
      </TabsContext.Provider>
   );
}

export const useTabsContext = () => {
   const context = useContext(TabsContext);
   if (context === undefined) {
      throw new Error(
         "useTabsContext must be used within a TabsContextProvider",
      );
   }
   return context;
};
