import React from "react";
import SettingsContextProvider from "./context/SettingsContext.tsx";
import TabsContextProvider from "./context/TabsContex.tsx";
import Tabs from "./Tabs.tsx";
import TabsPanels from "./TabsPanels.tsx";
import WaveBg from "./WaveBg.tsx";

const WaveEditor = () => {
   return (
      <>
         <SettingsContextProvider>
            <TabsContextProvider>
               <WaveBg />
               <TabsPanels />
               <Tabs />
            </TabsContextProvider>
         </SettingsContextProvider>
      </>
   );
};

export default WaveEditor;
