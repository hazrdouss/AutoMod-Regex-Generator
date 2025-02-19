import React from "react";

import { useSettingsContext } from "../context/SettingsContext.tsx";
import Reset from "../Reset.tsx";

const Shape = () => {
   const { settings, setSetting } = useSettingsContext();

   return (
      <div>
         <Reset list={["type", "uStrength", "uDensity", "uAmplitude"]} />
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
                     checked={settings.type === "plane"}
                     onChange={() => {
                        setSetting("type", "plane");
                     }}
                  />
                  <label
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
                     checked={settings.type === "sphere"}
                     onChange={() => {
                        setSetting("type", "sphere");
                     }}
                  />
                  <label
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
                     checked={settings.type === "waterPlane"}
                     onChange={() => {
                        setSetting("type", "waterPlane");
                     }}
                  />
                  <label
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
                     value={settings.uStrength}
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
                     value={settings.uStrength}
                     onChange={(e) => {
                        setSetting("uStrength", e.target.value);
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
                     value={settings.uDensity}
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
                     value={settings.uDensity}
                     onChange={(e) => {
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
                        name="uAmplitude"
                        id="uAmplitude"
                        step="0.01"
                        className="input input-xs w-12 shrink "
                        value={settings.uAmplitude}
                        onChange={(e) => {
                           setSetting("uAmplitude", e.target.value);
                        }}
                     />
                     <input
                        type="range"
                        min="0"
                        max="10"
                        step="0.1"
                        className="cursor-w-resize range range-xs w-full"
                        value={settings.uAmplitude}
                        onChange={(e) => {
                           setSetting("uAmplitude", e.target.value);
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
