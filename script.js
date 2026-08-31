// =========================================================================
// LANGUAGE TOGGLE
// =========================================================================
let currentLang = "en";

const translations = {
  en: {
    navLanguageButton: "EN",
    navEmail: "Email",
    navLinkedin: "LinkedIn",
    navGithub: "GitHub",
    heading: "Hi, I'm Justin",
  },
  kr: {
    navLanguageButton: "한국어",
    navEmail: "이메일",
    navLinkedin: "링크드인",
    navGithub: "깃허브",
    heading: "안녕하세요, 저는 이진일입니다",
  },
};

function setLanguage(lang) {
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    element.textContent = translations[lang][key];
  });
}

function changeLanguage() {
  const element = document.querySelector(".language-button");
  element.addEventListener("click", () => {
    currentLang = currentLang === "en" ? "kr" : "en";
    setLanguage(currentLang);
  });
}

changeLanguage();

// =========================================================================
// EMAIL COPY
// =========================================================================
// const email_element = document.querySelector("#email");
// email_element.addEventListener("click", (event) => {});

// function copyEmail() {
//   const element = document.querySelector("#email");
//   element.addEventListener("click", (event) => {
//     console.log("Email button clicked!");
//   });
// }
// copyEmail();

// =========================================================================
// ANIMATIONS
// =========================================================================
let beenClicked = false;
let animationTimerId;
let posTimerId;
let posX = 0;
let monkeyElement = document.querySelector(".monkey");
let monkeySpaceElement = document.querySelector(".monkey-space");
const spriteWidth = monkeyElement.getBoundingClientRect().width;
const containerWidth = monkeySpaceElement.clientWidth;

async function loadFrames(animation) {
  let path = `./sprite_sheet/monkey_${animation}/monkey_${animation}_sprite_sheet.json`;
  let response = await fetch(path);
  let data = await response.json();

  return data.frames;
}

function changeSpriteSheet(animation) {
  let path = `./sprite_sheet/monkey_${animation}/monkey_${animation}_sprite_sheet.png`;
  const img = new Image();
  img.src = path;
  return img.decode().then(() => {
    monkeyElement.style.backgroundImage = `url("${path}")`;
  });
}

function displayFrame(frames, index) {
  const x = -frames[index].frame.x;
  const y = -frames[index].frame.y;
  monkeyElement.style.backgroundPosition = `${x}px ${y}px`;
}

function runAnimation(frames, currentFrame, loop) {
  return new Promise((resolve) => {
    function step(currentFrame) {
      const numberOfFrames = frames.length;
      if (currentFrame === numberOfFrames) {
        if (loop) {
          currentFrame = 0;
        } else {
          resolve();
          return;
        }
      }
      displayFrame(frames, currentFrame);
      animationTimerId = setTimeout(step, 100, currentFrame + 1);
    }
    step(currentFrame);
  });
}

function shiftMonkeyPosition() {
  posX += 1;
  if (posX > containerWidth) {
    posX = -spriteWidth;
  }
  monkeyElement.style.transform = `translateX(${posX}px) scale(2.5)`;
  posTimerId = setTimeout(shiftMonkeyPosition, 20);
}

async function animationController() {
  // IDLE
  let idle_frames = await loadFrames("idle");
  changeSpriteSheet("idle");
  runAnimation(idle_frames, 0, true);

  // EMOTE
  monkeyElement.addEventListener("click", async () => {
    let emote_frames = await loadFrames("emote");
    changeSpriteSheet("emote");
    clearTimeout(animationTimerId);
    await runAnimation(emote_frames, 0, false);
    changeSpriteSheet("idle");
    runAnimation(idle_frames, 0, true);
  });
}

animationController();
shiftMonkeyPosition();
