import React, { useContext, useEffect, useRef, useState } from "react";

import { RotateCcw } from "lucide-react";
import { useSettingsContext } from "../context/SettingsContext.tsx";
import { gsap } from "gsap";

const Color = () => {
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
                  "fieldset p-2 flex gap-2 border border-white/5 rounded-sm"
               }
            >
               <legend>Background Color</legend>
               <div className="flex gap-2 w-full">
                  <input
                     type="color"
                     name="color-bg"
                     id="color-bg"
                     className="color color-lg"
                     defaultValue={settings.bgColor}
                     onChange={(e) => {
                        setSetting("bgColor", e.target.value);
                     }}
                  />
               </div>
            </fieldset>
            <div className={"flex flex-wrap gap-[inherit]"}>
               <fieldset
                  className={
                     "fieldset grow flex-1 p-2 flex gap-2 border border-white/5 rounded-sm"
                  }
               >
                  <legend>Color 1</legend>
                  <div className="flex gap-2 w-full">
                     <input
                        type="color"
                        defaultValue={settings.color1}
                        name="color-1"
                        id="color-1"
                        className="color color-lg"
                        onChange={(e) => {
                           setSetting("color1", e.target.value);
                        }}
                     />
                  </div>
               </fieldset>
               <fieldset
                  className={
                     "fieldset grow flex-1 p-2 flex gap-2 border border-white/5 rounded-sm"
                  }
               >
                  <legend>Color 2</legend>
                  <div className="flex gap-2 w-full">
                     <input
                        type="color"
                        defaultValue={settings.color2}
                        name="color-2"
                        id="color-2"
                        className="color color-lg"
                        onChange={(e) => {
                           setSetting("color2", e.target.value);
                        }}
                     />
                  </div>
               </fieldset>
               <fieldset
                  className={
                     "fieldset grow flex-1 p-2 flex gap-2 border border-white/5 rounded-sm"
                  }
               >
                  <legend>Color 3</legend>
                  <div className="flex gap-2 w-full">
                     <input
                        type="color"
                        defaultValue={settings.color3}
                        name="color-3"
                        id="color-3"
                        className="color color-lg"
                        onChange={(e) => {
                           setSetting("color3", e.target.value);
                        }}
                     />
                  </div>
               </fieldset>
            </div>
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
               <legend>Environment</legend>
               <div
                  className={
                     "h-5 flex items-end justify-between w-full gap-[inherit]"
                  }
               >
                  <input
                     type="checkbox"
                     name="environment"
                     id="environment"
                     defaultChecked={settings.lightType === "env"}
                     className="toggle toggle-sm"
                     onChange={(e) => {
                        setEnvToggled(e.target.checked);
                        setSetting(
                           "lightType",
                           e.target.checked ? "env" : "3d",
                        );
                     }}
                  />
                  {envToggled && (
                     <div
                        ref={envPresetEl}
                        className="join join-horizontal flex"
                     >
                        <input
                           type="radio"
                           name="type"
                           id="envPreset-city"
                           className="hidden peer/envPreset-city"
                           defaultChecked={settings.envPreset === "city"}
                        />
                        <label
                           onClick={() => {
                              setSetting("envPreset", "city");
                           }}
                           htmlFor="envPreset-city"
                           className="btn bg-primary/25 rounded-l-lg join-item btn-xs peer-checked/envPreset-city:bg-primary"
                        >
                           City
                        </label>

                        <input
                           type="radio"
                           name="type"
                           id="envPreset-dawn"
                           className="hidden peer/envPreset-dawn"
                           defaultChecked={settings.envPreset === "dawn"}
                        />
                        <label
                           onClick={() => {
                              setSetting("envPreset", "dawn");
                           }}
                           htmlFor="envPreset-dawn"
                           className="btn bg-primary/25 join-item btn-xs peer-checked/envPreset-dawn:bg-primary"
                        >
                           Dawn
                        </label>

                        <input
                           type="radio"
                           name="type"
                           id="envPreset-lobby"
                           className="hidden peer/envPreset-lobby"
                           defaultChecked={settings.envPreset === "lobby"}
                        />
                        <label
                           onClick={() => {
                              setSetting("envPreset", "lobby");
                           }}
                           htmlFor="envPreset-lobby"
                           className="btn bg-primary/25 join-item btn-xs peer-checked/envPreset-lobby:bg-primary"
                        >
                           Lobby
                        </label>
                     </div>
                  )}
               </div>
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
            {!envToggled && (
               <fieldset
                  className={
                     "fieldset grow flex-1 p-2 flex gap-2 border border-white/5 rounded-sm"
                  }
               >
                  <legend>Brightness</legend>
                  <div className={"flex w-full gap-2 items-center"}>
                     <input
                        type="number"
                        min="0"
                        name="brightness"
                        id="brightness"
                        step="0.01"
                        className="input input-xs w-12"
                        defaultValue={settings.brightness}
                        onChange={(e) => {
                           setSetting("brightness", e.target.value);
                        }}
                     />
                     <input
                        type="range"
                        min="0"
                        max="2"
                        step="0.1"
                        className="range range-xs w-full"
                        defaultValue={settings.brightness}
                        onChange={(e) => {
                           document.getElementById("brightness").nodeValue =
                              e.target.value;
                           setSetting("brightness", e.target.value);
                        }}
                     />
                  </div>
               </fieldset>
            )}
            {envToggled && (
               <fieldset
                  className={
                     "fieldset grow flex-1 p-2 flex gap-2 border border-white/5 rounded-sm"
                  }
               >
                  <legend>Reflection</legend>
                  <div className={"flex w-full items-center gap-2"}>
                     <input
                        type="number"
                        min="0"
                        name="reflection"
                        id="reflection"
                        step="0.01"
                        className="input input-xs w-12 "
                        defaultValue={settings.reflection}
                        onChange={(e) => {
                           setSetting("reflection", e.target.value);
                        }}
                     />
                     <input
                        type="range"
                        min="0"
                        max="2"
                        step="0.1"
                        className="range range-xs w-full"
                        defaultValue={settings.reflection}
                        onChange={(e) => {
                           document.getElementById("reflection").nodeValue =
                              e.target.value;
                           setSetting("reflection", e.target.value);
                           console.log(e.target.value);
                        }}
                     />
                  </div>
               </fieldset>
            )}
         </div>
      </div>
   );
};
export default Color;
