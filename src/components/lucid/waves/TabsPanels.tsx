import React, { StrictMode, useEffect, useRef } from "react";
import { useTabsContext } from "./context/TabsContex.tsx";
import gsap from "gsap";

const TabsPanels = () => {
   const { tabsList, tabsVisible, activeTab } = useTabsContext();
   const contentRef = useRef(null);

   useEffect(() => {
      if (tabsVisible) {
         gsap.fromTo(
            contentRef.current,
            { opacity: 0, y: 25 },
            {
               opacity: 1,
               y: 0,
               duration: 0.5,
               ease: "power3.out",
            },
         );
      }
   }, [tabsVisible, activeTab]);

   return (
      <StrictMode>
         {tabsVisible && (
            <div
               data-tab={activeTab}
               ref={contentRef}
               className="fixed bottom-20 p-2 rounded-xl border border-white/10 border-b-2 bg-base-200/80 backdrop-blur-xl"
            >
               {tabsList().find((tab) => tab.id === activeTab)?.content}
            </div>
         )}
      </StrictMode>
   );
};

export default TabsPanels;
