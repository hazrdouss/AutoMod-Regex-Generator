import {
  emoReplaceMap,
  letReplaceMap,
  numReplaceMap,
  symReplaceMap,
  uniReplaceMaps,
} from "./replaceMaps.js";
import Prism from "prismjs";
import escape from "validator/lib/escape";
import "prismjs/components/prism-regex";
import { debounce, isVowel, regEscape, toast } from "../utils";

const inputCount = document.querySelector("#input-count");
const output = document.querySelector("#output");
const copy = document.querySelector("#copy");
const share = document.querySelector("#share");
const maps = document.querySelector("#maps")
// const regex101 = document.querySelector("iframe#regex101");
maps.oninput = debounce(() => {
  const exp = buildExpression();

  output.innerHTML = exp ? exp : "Output...";
  inputCount.innerText = input.value.length;
  Prism.highlightElement(output);

  updateIdentifier();
  window.location.hash = shareHash;

  const event = new CustomEvent("updatedRegex", {
    detail: { regex: buildExpression(true) },
  });
  document.dispatchEvent(event);
}, 300)
let shareHash = "";

let exp = "";
let input = document.querySelector("#input");
let settings = {
  vowellessVariants: document.querySelector("input[name='vowelless-variants']"),
  numberVariants: document.querySelector("input[name='number-variants']"),
  letterVariants: document.querySelector("input[name='letter-variants']"),
  symbolVariants: document.querySelector("input[name='symbol-variants']"),
  emojiVariants: document.querySelector("input[name='emoji-variants']"),
  unicodeVariants: document.querySelector("input[name='unicode-variants']"),

  caseInsensitive: document.querySelector("input[name='caseInsensitive']"),
  whitespace: document.querySelector("input[name='whitespace']"),
  letterSpam: document.querySelector("input[name='letter-spam']"),

  partialMatches: document.querySelector("input[name='partial-matches']"),
  mergeDuplicates: document.querySelector("input[name='merge-duplicates']"),
  characterMap: maps
};

function getData() {
  return {
    input: input.value,
    settings: {
      vowellessVariants: settings.vowellessVariants.checked,
      numberVariants: settings.numberVariants.checked,
      letterVariants: settings.letterVariants.checked,
      symbolVariants: settings.symbolVariants.checked,
      emojiVariants: settings.emojiVariants.checked,
      unicodeVariants: settings.unicodeVariants.checked,

      caseInsensitive: settings.caseInsensitive.checked,
      whitespace: settings.whitespace.checked,
      letterSpam: settings.letterSpam.checked,

      partialMatches: settings.partialMatches.checked,
      mergeDuplicates: settings.mergeDuplicates.checked,
      characterMap: settings.characterMap.value == "new"
    },
  };
}

function buildExpression(raw) {
  let content = getData().input;
  let expression = "";
  let lastChar = "";
  let uniReplaceMap  = uniReplaceMaps[maps.value]
  for (let i = 0; i < content.length; i++) {
    let char = regEscape(content[i]);
    let group = "";
    let characterSet = "";

    // Merge Duplicates
    if (getData().settings.mergeDuplicates && char === lastChar) {
      if (!getData().settings.partialMatches && i === content.length - 1) {
        expression += "\\b";
      }
      continue;
    }
    lastChar = char;

    // --- --- --- --- --- --- --- --- --- ---
    // CHARACTER SET GROUP
    // --- --- --- --- --- --- --- --- --- ---

    // Base Character
    characterSet += `${char}`;

    // Partial Matches
    if (!getData().settings.partialMatches && i === 0) {
      expression += "\\b";
    }
    // Case Insensitive
    if (getData().settings.caseInsensitive && i === 0) {
      expression += "(?i)";
    }

    // Letter Variants
    if (
      getData().settings.letterVariants &&
      letReplaceMap[char] !== undefined
    ) {
      letReplaceMap[char].forEach((replacement) => {
        characterSet += `|${replacement}`;
      });
    }
    // Number Variants
    if (
      getData().settings.numberVariants &&
      numReplaceMap[char] !== undefined
    ) {
      numReplaceMap[char].forEach((replacement) => {
        characterSet += `|${replacement}`;
      });
    }
    // Symbol Variants
    if (
      getData().settings.symbolVariants &&
      symReplaceMap[char] !== undefined
    ) {
      symReplaceMap[char].forEach((replacement) => {
        characterSet += `|${replacement}`;
      });
    }
    // Emoji Variants
    if (getData().settings.emojiVariants && emoReplaceMap[char] !== undefined) {
      emoReplaceMap[char].forEach((replacement) => {
        characterSet += `|${replacement}`;
      });
    }
    // Unicode Variants
    if (
      getData().settings.unicodeVariants &&
      uniReplaceMap[char] !== undefined
    ) {
      uniReplaceMap[char].forEach((replacement) => {
        characterSet += `|${replacement}`;
      });
    }

    group += `(${characterSet})`;

    if (getData().settings.whitespace) {
      group += `\\s*`;
    }

    expression += `(${group})`;

    if (getData().settings.letterSpam) {
      expression += "+";
    }
    if (
      getData().settings.vowellessVariants &&
      isVowel(char) &&
      content.length > 1
    ) {
      if (expression.endsWith("+")) {
        expression = expression.slice(0, expression.length - 1);
      }
      expression += "?";
    }
    if (
      getData().settings.vowellessVariants &&
      getData().settings.letterSpam &&
      isVowel(char) &&
      content.length > 1
    ) {
      if (expression.endsWith("?")) {
        expression = expression.slice(0, expression.length - 1);
      }
      expression += "*";
    }

    if (!getData().settings.partialMatches && i === content.length - 1) {
      expression += "\\b";
    }
  }

  if (raw) {
    return expression;
  } else {
    return escape(expression);
  }
}

copy.addEventListener("click", () => {
  navigator.clipboard
    .writeText(output.innerText)
    .then(() => {
      toast("Copied", "success");
    })
    .catch((err) => {
      console.log("unable to copy", err);
      window.getSelection().selectAllChildren(output);
      toast("Cant copy cuz of stupid restrictions (press CTRL + C)", "error");
    });
});

share.addEventListener("click", () => {
  if (shareHash) {
    navigator.clipboard
      .writeText(window.location + shareHash)
      .then(() => {
        toast("Copied", "success");
      })
      .catch((err) => {
        console.log("unable to copy", err);
        window.getSelection().selectAllChildren(output);
        toast("Cant copy cuz of stupid restrictions (press CTRL + C)", "error");
      });
  } else {
    toast("Nothing to copy right now!", "error");
  }
});

function updateIdentifier() {
  const data = getData();
  let settings = 0;
  settings += data.settings.vowellessVariants << 0;
  settings += data.settings.numberVariants << 1;
  settings += data.settings.letterVariants << 2;
  settings += data.settings.symbolVariants << 3;
  settings += data.settings.emojiVariants << 4;
  settings += data.settings.unicodeVariants << 5;
  settings += data.settings.caseInsensitive << 6;
  settings += data.settings.whitespace << 7;
  settings += data.settings.letterSpam << 8;
  settings += data.settings.partialMatches << 9;
  settings += data.settings.mergeDuplicates << 10;
  settings += data.settings.characterMap << 11
  const marshalledValue = JSON.stringify({
    input: data.input,
    settings: settings,
  });
  shareHash = btoa(marshalledValue);
}

input.oninput = debounce(() => {
  const exp = buildExpression();

  output.innerHTML = exp ? exp : "Output...";
  inputCount.innerText = input.value.length;
  Prism.highlightElement(output);

  updateIdentifier();
  window.location.hash = shareHash;

  const event = new CustomEvent("updatedRegex", {
    detail: { regex: buildExpression(true) },
  });
  document.dispatchEvent(event);
}, 300);

Object.entries(settings).forEach(([_, element]) => {
  element.oninput = debounce(() => {
    const exp = buildExpression();

    output.innerHTML = exp ? exp : "Output...";
    Prism.highlightElement(output);

    updateIdentifier();
    window.location.hash = shareHash;

    const event = new CustomEvent("updatedRegex", {
      detail: { regex: buildExpression(true) },
    });
    document.dispatchEvent(event);
  }, 300);
});

function restoreFromHash() {
  if (
    window.location.hash &&
    (() => {
      try {
        const hash = window.location.hash.slice(1);
        const data = JSON.parse(atob(hash));
        return data && typeof data === "object" && data.settings;
      } catch (e) {
        return false;
      }
    })()
  ) {
    const hash = window.location.hash.slice(1);
    const data = JSON.parse(atob(hash));

    if (data) {
      input.value = data.input || "";
      settings.vowellessVariants.checked = data.settings & 1;
      settings.numberVariants.checked = data.settings & 2;
      settings.letterVariants.checked = data.settings & 4;
      settings.symbolVariants.checked = data.settings & 8;
      settings.emojiVariants.checked = data.settings & 16;
      settings.unicodeVariants.checked = data.settings & 32;
      settings.caseInsensitive.checked = data.settings & 64;
      settings.whitespace.checked = data.settings & 128;
      settings.letterSpam.checked = data.settings & 256;
      settings.partialMatches.checked = data.settings & 512;
      settings.mergeDuplicates.checked = data.settings & 1024;
      maps.value = data.settings & 2048 ? "new" : "old";
      output.innerHTML = buildExpression();
    }

    Prism.highlightElement(output);

    const event = new CustomEvent("updatedRegex", {
      detail: { regex: buildExpression(true) },
    });
    document.dispatchEvent(event);
  }
}

window.onload = () => {
  restoreFromHash();
  input.focus();
};

export default exp;
