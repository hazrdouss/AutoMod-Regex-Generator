import { RotateCcw } from "lucide-react";
import React, { useRef } from "react";
import { useSettingsContext } from "./context/SettingsContext.tsx";

const Reset = ({
   list,
   callback,
}: {
   list: Array<string>;
   callback?: () => void;
}) => {
   const { setSettings, defaultSettings } = useSettingsContext();
   const resetEl = useRef<HTMLDivElement | null>(null);
   const timeoutRef = useRef<NodeJS.Timeout | null>(null);

   const resetSettings = () => {
      const changedSettings = list.reduce(
         (acc, setting) => {
            acc[setting] = defaultSettings[setting];
            return acc;
         },
         {} as Record<string, any>,
      );

      setSettings((prev) => ({
         ...prev,
         ...changedSettings,
      }));

      // Add success class and show tooltip
      resetEl.current.classList.add("tooltip-success", "tooltip-show");
      resetEl.current.setAttribute("data-tip", "Success!");

      if (timeoutRef.current) {
         clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
         // Fade out before switching text
         resetEl.current.classList.add("tooltip-fade-out");

         setTimeout(() => {
            resetEl.current.classList.remove(
               "tooltip-success",
               "tooltip-fade-out",
            );
            resetEl.current.setAttribute("data-tip", "Reset");
         }, 300); // Wait for fade-out animation
      }, 1500); // Time before tooltip starts fading out

      callback();
   };

   return (
      <div
         ref={resetEl}
         className={
            "absolute top-0.5 -right-2.5 rounded-full transition-all duration-300 translate-x-full tooltip tooltip-right"
         }
         data-tip={"Reset"}
      >
         <RotateCcw
            className={
               "cursor-pointer opacity-10 hover:-rotate-20 hover:opacity-100 active:-rotate-135 transition-all duration-150"
            }
            size={16}
            strokeWidth={3}
            onClick={resetSettings}
         />
      </div>
   );
};

export default Reset;
