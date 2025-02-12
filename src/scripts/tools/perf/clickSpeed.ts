import gsap from "gsap";
import confetti from "canvas-confetti";

const clickSpeedModal = {
  container: document.querySelector("#clickSpeedModal"),
  speed: document.querySelector("#clickSpeedVal"),
  description: document.querySelector("#clickSpeedDesc"),
  details: document.querySelector("#clickSpeedDetails"),
};

const liveClickStats = {
  count: document.querySelector("#clickCount"),
  time: document.querySelector("#clickTime"),
};
const clickWaveContainer = document.querySelector("#clickWaves");
const waveSize = "1000px";
const waveDuration = 2000;
const waveEase = "expo.out";

const speedMessages = [
  { max: 3, message: "Did you fall asleep?" },
  { max: 6, message: "Get those fingers workin, lazy fuck'" },
  { max: 9, message: "My grandma still clicking faster than you ☠️" },
  { max: 12, message: "Fast enough, I guess" },
  { max: 15, message: "Respectable" },
  { max: 18, message: "Relax bro, the mouse aint done nothing wrong" },
  {
    max: 22,
    message: "I wonder what else those hands can do... 👀",
  },
  {
    max: Infinity,
    message: "So you're not using an auto-clicker? 💀",
  },
];

let clickCount = 0;
let countdownActive = false;
let countdownTime = 5;
let timerInterval = null;

clickWaveContainer.onclick = (e) => {
  if (!countdownActive) {
    countdownActive = true;
    countdownTime = 5;
    liveClickStats.time.textContent = `0:${countdownTime.toString().padStart(2, "0")}`;

    timerInterval = setInterval(updateCountdownTimer, 1000);

    setTimeout(() => {
      showResults();
      countdownActive = false;
    }, 5000);
  }

  if (countdownActive) {
    clickCount++;
    liveClickStats.count.textContent = clickCount.toString();

    const x = e.offsetX;
    const y = e.offsetY;

    const clickWave = document.createElement("div");
    clickWave.classList.add(
      "aspect-square",
      "bg-white/5",
      "border-3",
      "border-white/10",
      "w-0",
      "absolute",
      "-translate-x-1/2",
      "-translate-y-1/2",
      "pointer-events-none",
    );
    clickWave.style.top = `${y}px`;
    clickWave.style.left = `${x}px`;

    clickWaveContainer.appendChild(clickWave);

    gsap.to(clickWave, {
      width: waveSize,
      duration: waveDuration / 1000,
      ease: waveEase,
    });
    gsap.to(clickWave, {
      borderWidth: 10,
      opacity: 0,
      duration: waveDuration / 1000,
      ease: waveEase,
    });

    setTimeout(() => {
      clickWave.remove();
    }, waveDuration);
  }
};

function updateCountdownTimer() {
  if (countdownTime > 0) {
    countdownTime--;
    liveClickStats.time.textContent = `0:${countdownTime.toString().padStart(2, "0")}`;
  } else {
    clearInterval(timerInterval);
  }
}

function showResults() {
  clearInterval(timerInterval);

  const clickSpeed = Math.round(clickCount / 5);

  clickSpeedModal.speed.textContent = clickSpeed;
  clickSpeedModal.description.textContent = speedMessages.find(
    ({ max }) => clickSpeed <= max,
  ).message;
  clickSpeedModal.details.textContent = clickCount;

  clickCount = 0;
  liveClickStats.time.textContent = "0:05";
  setTimeout(() => {
    gsap.to(liveClickStats.count, {
      textContent: 0,
      duration: 0.5,
      ease: "power3.out",
      roundProps: "textContent",
    });
  }, 500);

  clickSpeedModal.container.showModal();
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
  });
}
