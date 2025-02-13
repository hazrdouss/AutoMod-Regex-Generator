import React from "react";
import { ShaderGradient, ShaderGradientCanvas } from "@shadergradient/react";

function Gradient(props) {
   return (
      <div
         style={{
            inset: 0,
            zIndex: -100,
         }}
         className={props.className || "fixed"}
      >
         <ShaderGradientCanvas
            style={{
               position: "absolute",
               inset: 0,
               pointerEvents: "none",
               zIndex: 0,
            }}
         >
            <ShaderGradient
               type={props.type || "plane"}
               uSpeed={props.uSpeed || 0.125}
               uStrength={props.uStrength || 0.965}
               uDensity={props.uDensity || 2.275}
               color3={props.color3 || "#999999"}
               color2={props.color2 || "#222222"}
               color1={props.color1 || "#222222"}
               reflection={props.reflection || false}
               lightType={props.lightType || "3d"}
               brightness={props.brightness || 0.875}
               grain={props.grain || "off"}
               cDistance={props.cDistance || 3.5}
               cPolarAngle={props.cPolarAngle || 122}
               enableTransition={props.enableTransition || false}
               positionX={props.positionX || -1}
               positionY={props.positionY || 1}
               positionZ={props.positionZ || 0}
            />
         </ShaderGradientCanvas>
         <div className="backdrop-blur-[0px] absolute top-0 left-0 bottom-0 right-0 z-2"></div>
      </div>
   );
}

export default Gradient;
