import { numReplaceMap, symReplaceMap, letReplaceMap, emoReplaceMap, uniReplaceMap } from './replaceMaps.js';
import Prism from 'prismjs';
import 'prismjs/components/prism-regex';

const input = document.querySelector("#input");
const output = document.querySelector("#output");
const copy = document.querySelector(".btn");

const settings = {
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
    mergeDuplicates: document.querySelector("input[name='merge-duplicates']")
};

console.log("checked:", settings.whitespace.checked)

function isVowel(letter) {
    const vowels = ["a", "e", "i", "o", "u"];
    return vowels.includes(letter.toLowerCase());
}

function regEscape(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function buildExpression() {
    let content = input.value;
    let expression = "";
    let lastChar = "";

    for (let i = 0; i < content.length; i++) {
        let char = regEscape(content[i]);
        let group = "";
        let characterSet = "";

        // Merge Duplicates
        if (settings.mergeDuplicates.checked && char === lastChar) {
            if (!settings.partialMatches.checked && i === content.length - 1) {
                expression += "(\\z|\\s)";
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
        if (!settings.partialMatches.checked && i === 0) {
            expression += "(\\A|\\s)";
        }
        // Case Insensitive
        if (settings.caseInsensitive.checked && i === 0) {
            expression += "(?i)";
        }

        // Letter Variants
        if (settings.letterVariants.checked && letReplaceMap[char] !== undefined) {
            letReplaceMap[char].forEach((replacement) => {
                characterSet += `|${replacement}`;
            });
        }
        // Number Variants
        if (settings.numberVariants.checked && numReplaceMap[char] !== undefined) {
            numReplaceMap[char].forEach((replacement) => {
                characterSet += `|${replacement}`;
            });
        }
        // Symbol Variants
        if (settings.symbolVariants.checked && symReplaceMap[char] !== undefined) {
            symReplaceMap[char].forEach((replacement) => {
                characterSet += `|${replacement}`;
            });
        }
        // Emoji Variants
        if (settings.emojiVariants.checked && emoReplaceMap[char] !== undefined) {
            emoReplaceMap[char].forEach((replacement) => {
                characterSet += `|${replacement}`;
            });
        }
        // Unicode Variants
        if (settings.unicodeVariants.checked && uniReplaceMap[char] !== undefined) {
            uniReplaceMap[char].forEach((replacement) => {
                characterSet += `|${replacement}`;
            });
        }

        group += `(${characterSet})`

        if (settings.whitespace.checked) {
            group += `\\s*`;
        }

        expression += `(${group})`

        if (settings.letterSpam.checked) {
            expression += "+"
        }
        if (settings.vowellessVariants.checked && isVowel(char) && content.length > 1) {
            if (expression.endsWith("+")) {
                expression = expression.slice(0, expression.length - 1)
            }
            expression += "?"
        }
        if (settings.vowellessVariants.checked && settings.letterSpam.checked && isVowel(char) && content.length > 1) {
            if (expression.endsWith("?")) {
                expression = expression.slice(0, expression.length - 1)
            }
            expression += "*"
        }

        if (!settings.partialMatches.checked && i === content.length - 1) {
            expression += "(\\z|\\s)";
        }
    }

    return expression;
}

function showToast(text, type) {
    const toast = document.createElement("div");
    toast.classList.add("toast", "hide", "toast-start");
    toast.innerHTML = `
    <div class="px-5 py-2 rounded-xl alert alert-${type}">
      <span class="">${text}</span>
    </div>
  `;

    // Append the toast to the body
    document.body.appendChild(toast);

    // After a short delay, remove the toast
    setTimeout(() => {
        toast.remove();
    }, 3000); // Toast will be removed after 3 seconds
}

copy.addEventListener("click", () => {
    navigator.clipboard
        .writeText(output.innerText)
        .then(() => {
            showToast("Copied", "success");
        })
        .catch((err) => {
            console.log("unable to copy", err)
            window.getSelection().selectAllChildren(output);
            showToast(
                "Cant copy cuz of stupid restrictions (press CTRL + C)",
                "error"
            );
        });
});

input.oninput = () => {
    output.innerText = buildExpression();
    Prism.highlightElement(output)
};

Object.entries(settings).forEach(([_, element]) => {
    element.oninput = () => {
        output.innerText = buildExpression()
        Prism.highlightElement(output)
        console.log("input")
    };
});

console.log(Prism)
