import React, { useEffect } from "react";

import { RotateCcw } from "lucide-react";
import { useSettingsContext } from "../context/SettingsContext.tsx";

const Shape = () => {
   const { settings, setSettings, setSetting, defaultSettings } =
      useSettingsContext();

   const resetSettings = () => {
      setSettings((prev) => ({
         ...prev,
         type: defaultSettings.type,
         uStrength: defaultSettings.uStrength,
         uDensity: defaultSettings.uDensity,
      }));
   };

   const handleScrollIncrement = (
      e: React.WheelEvent,
      numberInput: string,
      setting: string,
   ) => {
      const numInput = document.getElementById(numberInput) as HTMLInputElement;
      const target = e.target as HTMLInputElement;
      if (e.deltaY > 0) {
         target.stepUp();
      } else {
         target.stepDown();
      }
      numInput.value = target.value;
      setSetting(setting, target.value);
   };

   useEffect(() => {
      console.log("Shapes Rendered");
   });

   return (
      <div>
         <div
            className={
               "absolute top-0.5 -right-2.5 translate-x-full cursor-pointer opacity-10 hover:-rotate-20 hover:opacity-100 active:-rotate-135 transition-all duration-150"
            }
         >
            <RotateCcw size={16} strokeWidth={3} onClick={resetSettings} />
         </div>
         <div>
            <fieldset
               className={
                  "fieldset p-2 flex gap-2 border border-white/5 rounded-sm"
               }
            >
               <legend>Type</legend>
               <div className="join join-horizontal flex w-full">
                  <input
                     type="radio"
                     name="type"
                     id="type-plane"
                     className="hidden peer/type-plane"
                     defaultChecked={settings.type === "plane"}
                  />
                  <label
                     onClick={() => {
                        setSetting("type", "plane");
                     }}
                     htmlFor="type-plane"
                     className="flex-1 btn rounded-l-lg join-item bg-primary/25 btn-xs peer-checked/type-plane:bg-primary"
                  >
                     Plane
                  </label>

                  <input
                     type="radio"
                     name="type"
                     id="type-sphere"
                     className="hidden peer/type-sphere"
                     defaultChecked={settings.type === "sphere"}
                  />
                  <label
                     onClick={() => {
                        setSetting("type", "sphere");
                     }}
                     htmlFor="type-sphere"
                     className="flex-1 btn join-item bg-primary/25 btn-xs peer-checked/type-sphere:bg-primary"
                  >
                     Sphere
                  </label>

                  <input
                     type="radio"
                     name="type"
                     id="type-waterPlane"
                     className="hidden peer/type-waterPlane"
                     defaultChecked={settings.type === "waterPlane"}
                  />
                  <label
                     onClick={() => {
                        setSetting("type", "waterPlane");
                     }}
                     htmlFor="type-waterPlane"
                     className="flex-1 btn join-item bg-primary/25 btn-xs peer-checked/type-waterPlane:bg-primary"
                  >
                     Water
                  </label>
               </div>
            </fieldset>
            <fieldset
               className={
                  "fieldset p-2 flex gap-2 border border-white/5 rounded-sm"
               }
            >
               <legend>Strength</legend>
               <div className="flex gap-2 w-full items-center">
                  <input
                     type="number"
                     min="0"
                     name="uStrength"
                     id="uStrength"
                     step="0.01"
                     className="input input-xs w-12 shrink "
                     defaultValue={settings.uStrength}
                     onChange={(e) => {
                        setSetting("uStrength", e.target.value);
                     }}
                  />
                  <input
                     type="range"
                     min="0"
                     max="10"
                     step="0.1"
                     className="cursor-w-resize range range-xs w-full"
                     defaultValue={settings.uStrength}
                     onChange={(e) => {
                        const numInput = document.getElementById(
                           "uStrength",
                        ) as HTMLInputElement;
                        numInput.value = e.target.value;
                        setSetting("uStrength", e.target.value);
                     }}
                     onWheel={(e) => {
                        const numInput = document.getElementById(
                           "uStrength",
                        ) as HTMLInputElement;
                        const target = e.target as HTMLInputElement;
                        if (e.deltaY > 0) {
                           target.stepUp();
                        } else {
                           target.stepDown();
                        }
                        numInput.value = target.value;
                        setSetting("uStrength", target.value);
                     }}
                  />
               </div>
            </fieldset>
            <fieldset
               className={
                  "fieldset p-2 flex gap-2 border border-white/5 rounded-sm"
               }
            >
               <legend>Density</legend>
               <div className="flex gap-2 w-full items-center">
                  <input
                     type="number"
                     min="0"
                     name="uDensity"
                     id="uDensity"
                     step="0.01"
                     className="input input-xs w-12 shrink "
                     defaultValue={settings.uDensity}
                     onChange={(e) => {
                        setSetting("uDensity", e.target.value);
                     }}
                  />
                  <input
                     type="range"
                     min="0"
                     max="10"
                     step="0.1"
                     className="cursor-w-resize range range-xs w-full"
                     defaultValue={settings.uDensity}
                     onChange={(e) => {
                        const numInput = document.getElementById(
                           "uDensity",
                        ) as HTMLInputElement;
                        numInput.value = e.target.value;
                        setSetting("uDensity", e.target.value);
                     }}
                  />
               </div>
            </fieldset>

            {settings.type === "sphere" && (
               <fieldset
                  className={
                     "fieldset p-2 flex gap-2 border border-white/5 rounded-sm"
                  }
               >
                  <legend>Spiral</legend>
                  <div className="flex gap-2 w-full items-center">
                     <input
                        type="number"
                        min="0"
                        name="uFrequency"
                        id="uFrequency"
                        step="0.01"
                        className="input input-xs w-12 shrink "
                        defaultValue={settings.uFrequency}
                        onChange={(e) => {
                           setSetting("uFrequency", e.target.value);
                        }}
                     />
                     <input
                        type="range"
                        min="0"
                        max="10"
                        step="0.1"
                        className="cursor-w-resize range range-xs w-full"
                        defaultValue={settings.uFrequency}
                        onChange={(e) => {
                           const numInput = document.getElementById(
                              "uFrequency",
                           ) as HTMLInputElement;
                           numInput.value = e.target.value;
                           setSetting("uFrequency", e.target.value);
                        }}
                     />
                  </div>
               </fieldset>
            )}
         </div>
      </div>
   );
};
export default Shape;
