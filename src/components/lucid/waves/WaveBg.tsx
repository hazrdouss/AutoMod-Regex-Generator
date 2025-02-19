import React from "react";
import Gradient from "../../Gradient.tsx";
import { useSettingsContext } from "./context/SettingsContext.tsx";

const WaveBg = () => {
   const { settings } = useSettingsContext();

   return (
      <>
         <Gradient {...settings} />
      </>
   );
};

export default WaveBg;
