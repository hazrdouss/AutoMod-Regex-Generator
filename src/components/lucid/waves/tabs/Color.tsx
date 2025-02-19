import React, { useEffect, useRef, useState } from "react";

import { useSettingsContext } from "../context/SettingsContext.tsx";
import { gsap } from "gsap";
import Reset from "../Reset.tsx";

const Color = () => {
   const { settings, setSetting, defaultSettings } = useSettingsContext();
   const [envToggled, setEnvToggled] = useState(settings.lightType === "env");
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

   return (
      <div>
         <Reset
            list={[
               "bgColor",
               "color1",
               "color2",
               "color3",
               "lightType",
               "envPreset",
               "brightness",
               "reflection",
            ]}
            callback={() => {
               setEnvToggled(defaultSettings.envPreset === "env");
            }}
         />
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
                     value={settings.bgColor}
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
                        name="color-1"
                        id="color-1"
                        className="color color-lg"
                        value={settings.color1}
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
                        name="color-2"
                        id="color-2"
                        className="color color-lg"
                        value={settings.color2}
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
                        name="color-3"
                        id="color-3"
                        className="color color-lg"
                        value={settings.color3}
                        onChange={(e) => {
                           setSetting("color3", e.target.value);
                        }}
                     />
                  </div>
               </fieldset>
            </div>

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
                     className="toggle toggle-sm"
                     checked={settings.lightType === "env"}
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
                           name="envPreset-city"
                           id="envPreset-city"
                           className="hidden peer/envPreset-city"
                           checked={settings.envPreset === "city"}
                           onChange={() => {
                              setSetting("envPreset", "city");
                           }}
                        />
                        <label
                           htmlFor="envPreset-city"
                           className="btn bg-primary/25 rounded-l-lg join-item btn-xs peer-checked/envPreset-city:bg-primary"
                        >
                           City
                        </label>

                        <input
                           type="radio"
                           name="envPreset-dawn"
                           id="envPreset-dawn"
                           className="hidden peer/envPreset-dawn"
                           checked={settings.envPreset === "dawn"}
                           onChange={() => {
                              setSetting("envPreset", "dawn");
                           }}
                        />
                        <label
                           htmlFor="envPreset-dawn"
                           className="btn bg-primary/25 join-item btn-xs peer-checked/envPreset-dawn:bg-primary"
                        >
                           Dawn
                        </label>

                        <input
                           type="radio"
                           name="envPreset-lobby"
                           id="envPreset-lobby"
                           className="hidden peer/envPreset-lobby"
                           checked={settings.envPreset === "lobby"}
                           onChange={() => {
                              setSetting("envPreset", "lobby");
                           }}
                        />
                        <label
                           htmlFor="envPreset-lobby"
                           className="btn bg-primary/25 join-item btn-xs peer-checked/envPreset-lobby:bg-primary"
                        >
                           Lobby
                        </label>
                     </div>
                  )}
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
                        value={settings.brightness}
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
                        value={settings.brightness}
                        onChange={(e) => {
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
                        value={settings.reflection}
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
                        value={settings.reflection}
                        onChange={(e) => {
                           setSetting("reflection", e.target.value);
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
