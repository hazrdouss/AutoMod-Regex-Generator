import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import Gradient from "../components/Gradient";

const WaveEditor = () => {
   const [settings, setSettings] = useState({
      type: "plane",
      color1: "#222222",
      color2: "#222222",
      color3: "#999999",
      bgColor: "#000000",
      speed: 0.2,
   });
   const tabs = [
      {
         id: "shape",
         label: "Shape",
         content: (
            <form>
               <fieldset
                  className={
                     "fieldset p-2 flex gap-2 border border-white/3 rounded-sm"
                  }
               >
                  <legend>Type</legend>
                  <div className="flex gap-2">
                     <input
                        type="radio"
                        name="type"
                        id="type-plane"
                        className="hidden peer/type-plane"
                        defaultChecked={settings.type === "plane"}
                     />
                     <label
                        onClick={(e) => {
                           setSettings((prev) => ({
                              ...prev,
                              type: e.target.getAttribute("for").slice(5),
                           }));
                        }}
                        htmlFor="type-plane"
                        className="px-4 py-2 btn bg-primary/25 btn-sm peer-checked/type-plane:bg-primary"
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
                        onClick={(e) => {
                           setSettings((prev) => ({
                              ...prev,
                              type: e.target.getAttribute("for").slice(5),
                           }));
                        }}
                        htmlFor="type-sphere"
                        className="px-4 py-2 btn bg-primary/25 btn-sm peer-checked/type-sphere:bg-primary"
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
                        onClick={(e) => {
                           setSettings((prev) => ({
                              ...prev,
                              type: e.target.getAttribute("for").slice(5),
                           }));
                        }}
                        htmlFor="type-waterPlane"
                        className="px-4 py-2 btn bg-primary/25 btn-sm peer-checked/type-waterPlane:bg-primary"
                     >
                        Water
                     </label>
                  </div>
               </fieldset>
            </form>
         ),
      },
      {
         id: "colors",
         label: "Colors",
         content: (
            <form className={"flex flex-col gap-4"}>
               <fieldset
                  className={
                     "fieldset p-2 flex gap-2 border border-white/3 rounded-sm"
                  }
               >
                  <legend>Background Color</legend>
                  <div className="flex gap-2">
                     <input
                        type="color"
                        name="color-bg"
                        id="color-bg"
                        className="color color-xl"
                        defaultValue={settings.bgColor}
                        onChange={(e) => {
                           setSettings((prev) => ({
                              ...prev,
                              bgColor: e.target.value,
                           }));
                        }}
                     />
                  </div>
               </fieldset>
               <div className={"flex gap-[inherit]"}>
                  <fieldset
                     className={
                        "fieldset flex-1 p-2 flex gap-2 border border-white/5 rounded-sm"
                     }
                  >
                     <legend>Color 1</legend>
                     <div className="flex gap-2">
                        <input
                           type="color"
                           defaultValue={settings.color1}
                           name="color-1"
                           id="color-1"
                           className="color color-xl"
                           onChange={(e) => {
                              setSettings((prev) => ({
                                 ...prev,
                                 color1: e.target.value,
                              }));
                           }}
                        />
                     </div>
                  </fieldset>
                  <fieldset
                     className={
                        "fieldset flex-1 p-2 flex gap-2 border border-white/5 rounded-sm"
                     }
                  >
                     <legend>Color 2</legend>
                     <div className="flex gap-2">
                        <input
                           type="color"
                           defaultValue={settings.color2}
                           name="color-2"
                           id="color-2"
                           className="color color-xl"
                           onChange={(e) => {
                              setSettings((prev) => ({
                                 ...prev,
                                 color2: e.target.value,
                              }));
                           }}
                        />
                     </div>
                  </fieldset>
                  <fieldset
                     className={
                        "fieldset flex-1 p-2 flex gap-2 border border-white/5 rounded-sm"
                     }
                  >
                     <legend>Color 3</legend>
                     <div className="flex gap-2">
                        <input
                           type="color"
                           defaultValue={settings.color3}
                           name="color-3"
                           id="color-3"
                           className="color color-xl"
                           onChange={(e) => {
                              setSettings((prev) => ({
                                 ...prev,
                                 color3: e.target.value,
                              }));
                           }}
                        />
                     </div>
                  </fieldset>
               </div>
            </form>
         ),
      },
      {
         id: "motion",
         label: "Motion",
         content: (
            <form className={"flex flex-col gap-4"}>
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
                     defaultChecked
                     className="toggle"
                  />
               </fieldset>
               <fieldset
                  className={
                     "fieldset flex-1 p-2 flex gap-2 border border-white/5 rounded-sm"
                  }
               >
                  <legend>Speed</legend>
                  <div className={"flex flex-col w-full gap-2"}>
                     <input
                        type="number"
                        name="speed"
                        id="speed"
                        step="0.01"
                        className="input w-full"
                        defaultValue={settings.speed}
                        onChange={(e) => {
                           setSettings((prev) => ({
                              ...prev,
                              speed: e.target.value,
                           }));
                        }}
                     />
                     <input
                        type="range"
                        min="0"
                        max="2"
                        step="0.1"
                        className="range range-xs w-full"
                        defaultValue={settings.speed}
                        onChange={(e) => {
                           document.getElementById("speed").value =
                              e.target.value;
                           setSettings((prev) => ({
                              ...prev,
                              speed: e.target.value,
                           }));
                        }}
                     />
                  </div>
               </fieldset>
            </form>
         ),
      },
      { id: "view", label: "View", content: <div>View</div> },
   ];

   const [tabsVisible, setTabsVisible] = useState(false);
   const [activeTab, setActiveTab] = useState(tabs[0].id);
   const contentRef = useRef(null);

   useEffect(() => {
      if (tabsVisible) {
         gsap.fromTo(
            contentRef.current,
            { opacity: 0, y: 25, height: "10px" },
            {
               opacity: 1,
               y: 0,
               duration: 0.4,
               ease: "power3.out",
               height: "auto",
            },
         );
      }
   }, [tabsVisible, activeTab]);

   return (
      <div>
         <Gradient
            bgColor={settings.bgColor}
            type={settings.type}
            color1={settings.color1}
            color2={settings.color2}
            color3={settings.color3}
            uSpeed={settings.speed}
            animate={settings.animate}
         />
         <div className="fixed bottom-4 left-4 right-4 flex flex-col gap-2">
            {tabsVisible && (
               <div
                  data-tab={activeTab}
                  ref={contentRef}
                  className="p-2 rounded-sm overflow-hidden border border-white/10 border-b-2 bg-base-200/80 backdrop-blur-xl"
               >
                  {tabs.find((tab) => tab.id === activeTab)?.content}
               </div>
            )}
            <ul className="rounded-sm w-full menu  border border-white/10 border-b-2 menu-horizontal gap-3 justify-center bg-base-200/80 backdrop-blur-xl rounded-box">
               {tabs.map((tab) => (
                  <li key={tab.id}>
                     <button
                        onClick={() => {
                           setActiveTab(tab.id);
                           setTabsVisible((prev) =>
                              tab.id === activeTab ? !prev : true,
                           );
                        }}
                        className={`cursor-pointer btn ${activeTab === tab.id && tabsVisible ? "btn-secondary" : "bg-neutral/0"}`}
                     >
                        {tab.label}
                     </button>
                  </li>
               ))}
            </ul>
         </div>
      </div>
   );
};

export default WaveEditor;
