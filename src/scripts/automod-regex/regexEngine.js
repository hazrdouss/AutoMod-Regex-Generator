import { RE2JS } from "re2js";
import { debounce } from "../utils";
import unescape from "validator/lib/unescape";
import escape from "validator/lib/escape";

let input = document.querySelector("#tester-input");
let matchCount = document.querySelector("#tester-count");
let inputHighlight = document.querySelector("#tester-highlight");

let expression = { compiled: "", raw: "" };

document.addEventListener("updatedRegex", (data) => {
  expression = {
    compiled: RE2JS.compile(data.detail.regex, RE2JS.MULTILINE),
    raw: data.detail.regex,
  };
  if (input.innerHTML) {
    highLight();
  }
});

function highLight() {
  if (!expression.raw) return;

  const text = unescape(input.innerText);
  const matchString = expression.compiled.matcher(text);

  let highlightedText = "",
    lastIndex = 0,
    replaceCount = 0;

  while (matchString.find()) {
    replaceCount++;
    highlightedText += escape(text.substring(lastIndex, matchString.start()));
    highlightedText +=
      `<span class="[&:nth-child(odd)]:bg-blue-500 [&:nth-child(even)]:bg-blue-600 [&:nth-child(odd)]:opacity-50 [&:nth-child(even)]:opacity-35 motion-preset-fade-sm">` +
      escape(matchString.group()) +
      `</span>`;
    lastIndex = matchString.end();
  }

  highlightedText += escape(text.substring(lastIndex));

  matchCount.innerHTML =
    replaceCount < 1 && expression.raw
      ? `<span class="text-red-400">${replaceCount}</span>`
      : `<span class="text-green-400">${replaceCount}</span>`;

  inputHighlight.innerHTML = highlightedText || " ";
}

input.oninput = debounce(() => {
  highLight();
}, 200);
