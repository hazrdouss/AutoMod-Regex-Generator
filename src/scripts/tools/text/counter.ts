import gsap from "gsap";
import { debounce } from "../../utils.ts";
import { update } from "@react-spring/three";

const editor = document.querySelector("#input");
const charLimitEl = document.querySelector("#charLimit");
const wordCountEl = document.querySelector("#wordCount");
const charCountEl = document.querySelector("#charCount");
const sentenceCountEl = document.querySelector("#sentenceCount");
const paragraphCountEl = document.querySelector("#paragraphCount");

function animateCount(el, value) {
  gsap.to(el, {
    textContent: value,
    duration: 0.7,
    roundProps: "textContent",
    ease: "expo.out",
  });
}

function getCounts() {
  const text = editor.value.trim();

  const words = text.match(/\b\w+\b/g) || [];

  const chars = text.replace(/\s/g, "").length;

  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);

  const paragraphs = text.split(/\n\s*\n/).filter((p) => p.trim().length > 0);

  return {
    words: words,
    chars: chars,
    sentences: sentences,
    paragraphs: paragraphs,
  };
}

function updateCounts() {
  const { words, chars, sentences, paragraphs } = getCounts();

  animateCount(wordCountEl, words.length);
  animateCount(charCountEl, chars);
  animateCount(sentenceCountEl, sentences.length);
  animateCount(paragraphCountEl, paragraphs.length);

  charLimitEl.textContent = chars;
}

editor.oninput = debounce(() => updateCounts(), 300);
editor.addEventListener("input", () => {
  charLimitEl.textContent = getCounts().chars;
});

window.onload = () => updateCounts();
