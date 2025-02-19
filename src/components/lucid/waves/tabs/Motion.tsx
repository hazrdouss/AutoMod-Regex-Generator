import React, { useContext, useEffect, useRef, useState } from "react";

import { RotateCcw } from "lucide-react";
import { useSettingsContext } from "../context/SettingsContext.tsx";
import { gsap } from "gsap";

const ColorSettings = () => {
   const { settings, setSettings, setSetting, defaultSettings } =
      useSettingsContext();
   const [envToggled, setEnvToggled] = useState(false);
   const envPresetEl = useRef(null);

   useEffect(() => {
      if (envToggled) {
         gsap.fromTo(
            envPresetEl.current,
            { opacity: 0, x: 5, height: "10px" },
            {
               opacity: 1,
               x: 0,
               duration: 0.2,
               ease: "power3.out",
               height: "auto",
            },
         );
      }
   }, [envToggled]);

   const resetSettings = () => {
      setSettings((prev) => ({
         ...prev,
         type: defaultSettings.type,
      }));
   };

   return (
      <div>
         <div
            className={
               "absolute top-0.5 -right-2.5 translate-x-full cursor-pointer opacity-10 hover:-rotate-20 hover:opacity-100 active:-rotate-135 transition-all duration-150"
            }
         >
            <RotateCcw size={16} strokeWidth={3} onClick={resetSettings} />
         </div>
         <div className={"flex flex-col gap-4"}>
            <div className={"flex gap-[inherit]"}>
               <fieldset
                  className={
                     "fieldset flex-1 p-2 flex gap-2 border border-white/5 rounded-sm"
                  }
               >
                  <legend>Animate</legend>
                  <input
                     type="checkbox"
                     name="animate"
                     id="animate"
                     className="toggle"
                     onChange={(e) => {
                        setSetting("animate", e.target.checked ? "on" : "off");
                     }}
                  />
               </fieldset>
               <fieldset
                  className={
                     "fieldset flex-1 p-2 flex gap-2 border border-white/5 rounded-sm"
                  }
               >
                  <legend>Enter Transition</legend>
                  <input
                     type="checkbox"
                     name="animate"
                     id="enableTransition"
                     checked={settings.enableTransition}
                     className="toggle"
                     onChange={(e) => {
                        setSetting(
                           "enableTransition",
                           e.target.checked ? "on" : "off",
                        );
                     }}
                  />
               </fieldset>
            </div>
            <fieldset
               className={
                  "fieldset flex-1 p-2 flex gap-2 border border-white/5 rounded-sm"
               }
            >
               <legend>Speed</legend>
               <div className={"flex flex-col w-full gap-2"}>
                  <input
                     type="number"
                     min="0"
                     name="speed"
                     id="speed"
                     step="0.01"
                     className="input w-full"
                     value={settings.uSpeed}
                     onChange={(e) => {
                        setSetting("uSpeed", e.target.value);
                     }}
                  />
                  <input
                     type="range"
                     min="0"
                     max="2"
                     step="0.1"
                     className="range range-xs w-full"
                     value={settings.uSpeed}
                     onChange={(e) => {
                        setSetting("uSpeed", e.target.value);
                     }}
                  />
               </div>
            </fieldset>
         </div>
      </div>
   );
};
export default ColorSettings;
