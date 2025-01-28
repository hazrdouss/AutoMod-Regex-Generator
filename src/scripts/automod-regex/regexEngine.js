import { RE2JS } from "re2js";
import { debounce } from "../utils";

let input = document.querySelector("#tester-input");
let matchCount = document.querySelector("#tester-count");
let inputHighlight = document.querySelector("#tester-highlight");

let expression = "";

function expReplace(exp, string, replacement) {
  const matchString = exp.matcher(string);
  const replacedString = exp.matcher(string).replaceAll(replacement);

  let replacedCount = [];

  while (matchString.find()) {
    replacedCount.push(matchString.group());
  }

  return { string: replacedString, count: replacedCount.length };
}

document.addEventListener("updatedRegex", (data) => {
  expression = RE2JS.compile(data.detail.regex, RE2JS.MULTILINE);
  highLight();
});

function highLight() {
  if (expression) {
    inputHighlight.textContent = input.value;
    const text = input.value;

    const highlightedText = expReplace(
      expression,
      text,
      '<span class="[&:nth-child(odd)]:bg-blue-500 [&:nth-child(even)]:bg-blue-600 [&:nth-child(odd)]:opacity-50 [&:nth-child(even)]:opacity-40 motion-preset-fade-sm">$0</span>',
    );

    inputHighlight.innerHTML = highlightedText.string || " " || "Output...";
    matchCount.textContent = highlightedText.count;
  }
}

input.oninput = debounce(() => {
  highLight();
}, 100);

input.addEventListener("scroll", () => {
  inputHighlight.scrollTop = input.scrollTop;
  inputHighlight.scrollLeft = input.scrollLeft;
});
