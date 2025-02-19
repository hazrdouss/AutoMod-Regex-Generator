import gsap from "gsap";
import { createElement, CheckCircle, XCircle, Info } from "lucide";

export const debounce = (callback, wait) => {
   let timeoutId = null;
   return (...args) => {
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
         callback(...args);
      }, wait);
   };
};

export const isVowel = (char) => {
   const vowels = ["a", "e", "i", "o", "u"];
   return vowels.includes(char.toLowerCase());
};

export const regEscape = (string) => {
   return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

export const toast = (text, type) => {
   // const typeIcons = {
   //    success: createElement(CheckCircle),
   //    error: createElement(XCircle),
   //    info: createElement(Info),
   // };

   const toast = document.createElement("div");
   toast.innerHTML = `
    <div class="-translate-x-3 toast hide toast-start px-5! py-2! rounded-xl alert">
      <span class="">${text}</span>
    </div>
  `;
   document.body.appendChild(toast);

   toast.querySelector("div").style.backgroundColor = `var(--color-${type})`;
   toast.querySelector("div").style.color = `var(--color-${type}-content)`;

   console.log(toast);

   setTimeout(() => {
      gsap.to(toast, {
         opacity: 0,
         duration: 0.3,
         ease: "power3.inOut",
         onComplete: () => {
            toast.remove();
         },
      });
   }, 3000);
};

export const adaptiveDebounce = (callback, getWait) => {
   let timeoutId = null;

   return (...args) => {
      window.clearTimeout(timeoutId);
      const wait = typeof getWait === "function" ? getWait() : getWait; // Allow function-based delay
      timeoutId = window.setTimeout(() => {
         callback(...args);
      }, wait);
   };
};
