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
};
