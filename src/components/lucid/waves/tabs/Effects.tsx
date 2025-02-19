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
            <fieldset
               className={
                  "fieldset grow p-2 flex gap-2 border border-white/5 rounded-sm"
               }
            >
               <legend>Grain</legend>
               <input
                  type="checkbox"
                  name="grain"
                  id="grain"
                  className="toggle toggle-sm"
                  defaultChecked={settings.grain === "on"}
                  onChange={(e) => {
                     setSetting("grain", e.target.checked ? "on" : "off");
                  }}
               />
            </fieldset>
            <fieldset
               className={
                  "fieldset grow flex-1 p-2 flex gap-2 border border-white/5 rounded-sm"
               }
            >
               <legend>Blur</legend>
               <div className={"flex w-full gap-2 items-center"}>
                  <input
                     type="number"
                     min="0"
                     name="blur"
                     id="blur"
                     step="1"
                     className="input input-xs w-12"
                     defaultValue={settings.blur}
                     onChange={(e) => {
                        setSetting("blur", e.target.value);
                     }}
                  />
                  <input
                     type="range"
                     min="0"
                     max="10"
                     step="1"
                     className="range range-xs w-full"
                     defaultValue={settings.blur}
                     onChange={(e) => {
                        document.getElementById("blur").nodeValue =
                           e.target.value;
                        setSetting("blur", e.target.value);
                     }}
                  />
               </div>
            </fieldset>
         </div>
      </div>
   );
};
export default ColorSettings;
