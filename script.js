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
    introParagraphFirstPart:
      "I am an undergraduate Computer Science student at Oregon State University with a focus in Artificial Intelligence. I build systems and infrastructure, and I'm currently working on my own terminal multiplexer called ",
    introParagraphSecondPart: ".",
    detailsSummaryButton: "MORE",
    mainFirstParagraph:
      "I am Korean American, born and raised in Portland, Oregon. I have built systems for state government and open source, and I am currently doing research on automated failure attribution for LLM multi-agent systems.",
    mainSecondParagraph:
      "I can't point to the exact moment that I fell in love with computers, but they've always been there for me. As a child, I put countless hours into video games like Pokémon, Tetris, and Minecraft, which served as my introduction to the world of ones and zeroes. I built my first PC in middle school, then spent a year of part-time checks on my first Apple silicon, an M1 MacBook Air that I still use as my daily driver. I later got a T480s to experiment with different Linux distributions, which got me fixated on developer tools like Vim, tiling window managers, and terminal multiplexers.",
    mainThirdParagraph:
      "Outside of computers, I go hiking, build LEGO, and read manga. Places like the coast and the Columbia River Gorge make me proud to call Oregon home. My LEGO collection is mostly Star Wars, with my favorite set being the UCS Jango Fett's Slave I. One day, I hope to add Rivendell to the collection. My top 3 manga currently look like One Piece, Slam Dunk, and Mobile Suit Gundam: The Origin (in no particular order). If you've made it this far, thanks for reading.",
    footerCreditsFirstPart: "Monkey sprite based on original art by ",
    footerCreditsSecondPart: "",
  },
  kr: {
    navLanguageButton: "한국어",
    navEmail: "이메일",
    navLinkedin: "링크드인",
    navGithub: "깃허브",
    heading: "안녕하세요, 저는 이진일입니다",
    introParagraphFirstPart:
      "저는 인공지능을 중점적으로 공부하는 오리건 주립대학교 컴퓨터공학과 학부생입니다. 시스템과 인프라를 만들며, 현재는 직접 만들고 있는 터미널 멀티플렉서 ",
    introParagraphSecondPart: "을 작업하고 있습니다.",
    detailsSummaryButton: "더보기",
    mainFirstParagraph:
      "저는 오리건주 포틀랜드에서 태어나고 자란 한국계 미국인입니다. 주 정부와 오픈소스를 위한 시스템을 만들어 왔고, 현재는 LLM 멀티 에이전트 시스템의 자동 실패 원인 분석에 대해 연구하고 있습니다.",
    mainSecondParagraph:
      "제가 컴퓨터와 사랑에 빠진 정확한 순간은 짚어낼 수 없지만, 컴퓨터는 언제나 제 곁에 있었습니다. 어릴 적에는 포켓몬, 테트리스, 마인크래프트 같은 게임에 수많은 시간을 쏟았고, 그것이 0과 1의 세계로 들어가는 첫 입구가 되었습니다. 중학생 때 첫 PC를 조립했고, 이후 1년치 아르바이트 월급을 모아 첫 애플 실리콘인 M1 맥북 에어를 샀는데 지금도 주력 기기로 쓰고 있습니다. 나중에는 여러 리눅스 배포판을 시험해 보려고 T480s를 구했고, 그러면서 Vim, 타일링 윈도우 매니저, 터미널 멀티플렉서 같은 개발 도구에 푹 빠지게 되었습니다.",
    mainThirdParagraph:
      "컴퓨터 말고는 등산을 하고, 레고를 조립하고, 만화를 읽습니다. 오리건 해안이나 컬럼비아강 협곡 같은 곳들 덕분에 오리건을 고향이라고 부르는 게 자랑스럽습니다. 제 레고 컬렉션은 대부분 스타워즈이고, 가장 좋아하는 세트는 UCS 장고 펫의 슬레이브 I입니다. 언젠가는 리븐델도 컬렉션에 더하고 싶습니다. 요즘 제가 가장 좋아하는 만화 3편은 원피스, 슬램덩크, 그리고 기동전사 건담 디 오리진입니다(순서는 상관없습니다). 여기까지 읽어주셨다면, 감사합니다.",
    footerCreditsFirstPart: "",
    footerCreditsSecondPart: "님의 원작을 기반으로 한 원숭이 스프라이트",
  },
};

function setLanguage(lang) {
  document.documentElement.lang = lang;
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
const emailElement = document.querySelector("#email");
const emailPopoverElement = document.querySelector("#email-popover");
let popoverTimerId;

function copyEmail() {
  emailElement.addEventListener("click", async (event) => {
    await navigator.clipboard.writeText("leejustincs@gmail.com");
    emailPopoverElement.classList.add("visible");
    clearTimeout(popoverTimerId);
    popoverTimerId = setTimeout(() => {
      emailPopoverElement.classList.remove("visible");
    }, 1600);
  });
}

copyEmail();

// =========================================================================
// ANIMATIONS
// =========================================================================
let beenClicked = false;
let animationTimerId;
let isEmoting = false;
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
    if (!beenClicked) {
      beenClicked = true;
      shiftMonkeyPosition();
      return;
    }
    if (isEmoting) {
      return;
    }
    isEmoting = true;

    let emote_frames = await loadFrames("emote");
    changeSpriteSheet("emote");
    clearTimeout(animationTimerId);
    await runAnimation(emote_frames, 0, false);
    changeSpriteSheet("idle");
    runAnimation(idle_frames, 0, true);

    isEmoting = false;
  });
}

animationController();
