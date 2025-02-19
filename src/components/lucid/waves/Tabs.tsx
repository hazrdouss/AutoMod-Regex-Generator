import React from "react";
import tabsList from "./tabs/tabsList.tsx";
import { useTabsContext } from "./context/TabsContex.tsx";

const Tabs = () => {
   const { activeTab, setActiveTab, tabsVisible, setTabsVisible } =
      useTabsContext();

   return (
      <ul className="fixed bottom-4 menu border join join-horizontal border-white/10 border-b-2 menu-horizontal justify-center bg-base-200/80 backdrop-blur-xl rounded-xl">
         {tabsList().map((tab) => (
            <li key={tab.id}>
               <button
                  onClick={() => {
                     setActiveTab(tab.id);
                     setTabsVisible((prev) =>
                        tab.id === activeTab ? !prev : true,
                     );
                  }}
                  className={`cursor-pointer btn join-item ${activeTab === tab.id && tabsVisible ? "btn-secondary" : "bg-neutral/0"}`}
               >
                  {tab.label}
               </button>
            </li>
         ))}
      </ul>
   );
};

export default Tabs;
