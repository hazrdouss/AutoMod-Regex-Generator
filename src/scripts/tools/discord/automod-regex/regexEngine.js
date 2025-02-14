import { RE2JS } from "re2js";
import { adaptiveDebounce } from "../../../utils";
import unescape from "validator/lib/unescape";
import escape from "validator/lib/escape";

let input = document.querySelector("#tester-input");
let matchCount = document.querySelector("#tester-matches");
let inputLength = document.querySelector("#tester-count");
let inputHighlight = document.querySelector("#tester-highlight");

let expression = { compiled: "", raw: "" };

document.addEventListener("updatedRegex", (data) => {
   expression = {
      compiled: RE2JS.compile(data.detail.regex, RE2JS.MULTILINE),
      raw: data.detail.regex,
   };
   if (input.innerHTML) {
      highlight();
   }
});

function highlight() {
   if (!expression.raw) return;

   const text = unescape(input.innerText.replace(/\n\n/g, "\n"));
   console.log(text);
   const matchString = expression.compiled.matcher(text);

   let highlightedText = "",
      lastIndex = 0,
      replaceCount = 0;

   while (matchString.find()) {
      replaceCount++;
      highlightedText += escape(text.substring(lastIndex, matchString.start()));
      highlightedText += `<span class="h-min odd:bg-blue-500 break-all even:bg-blue-600 odd:opacity-50 even:opacity-35 ">${escape(matchString.group())}</span>`;
      lastIndex = matchString.end();
   }

   highlightedText += escape(text.substring(lastIndex));

   const matchCountColor =
      replaceCount < 1 && expression.raw
         ? "--color-red-400"
         : "--color-green-400";

   matchCount.innerHTML = `
      <span style="color: var(${matchCountColor})">${replaceCount}
      </span>
   `;

   inputHighlight.innerHTML = highlightedText || " ";
}

input.oninput = adaptiveDebounce(
   () => {
      highlight();
      inputLength.textContent = input.textContent.length;
   },
   () => {
      const length = input.textContent.length;
      return length > 500 ? 100 : 0;
   },
);

input.onBeforeInput = (e) => {
   if (
      input.innerText.length >= 2000 &&
      e.inputType !== "deleteContentBackward"
   ) {
      input.innerText = input.innerText.substring(0, 2000);
      inputLength.textContent = input.textContent.length;
      highlight();
      e.preventDefault();
   }
};
