// const email_element = document.querySelector("#email");
// email_element.addEventListener("click", (event) => {});

// =========================================================================
// ANIMATIONS
// =========================================================================
let timerId;

async function loadFrames(animation) {
  let path = `./sprite_sheet/monke_${animation}/monke_${animation}_sprite_sheet.json`;
  let response = await fetch(path);

  let status = response.status;
  let data = await response.json();
  console.log(status);
  console.log(data);

  return data.frames;
}

function changeSpriteSheet(animation) {
  let path = `./sprite_sheet/monke_${animation}/monke_${animation}_sprite_sheet.png`;
  const element = document.querySelector(".monke");
  element.style.backgroundImage = `url("${path}")`;
}

function displayFrame(frames, index) {
  const element = document.querySelector(".monke");
  const x = -frames[index].frame.x;
  const y = -frames[index].frame.y;
  element.style.backgroundPosition = `${x}px ${y}px`;
}

function runAnimation(frames, currentFrame, loop) {
  let numberOfFrames = frames.length;
  if (loop && currentFrame % numberOfFrames == 0) {
    currentFrame = 0;
  }
  displayFrame(frames, currentFrame);
  timerId = setTimeout(runAnimation, 100, frames, currentFrame + 1, loop);
}

async function animationController() {
  // IDLE
  let idle_frames = await loadFrames("idle");
  changeSpriteSheet("idle");
  runAnimation(idle_frames, 0, false);
}

animationController();

async function emoteAnimation() {
  let frames = await loadFrames("emote");
  let monke = document.querySelector(".monke");
  monke.addEventListener("click", (event) => {
    for (let i = 0; i < frames.length; i++) {
      setTimeout(displayFrame, 100 + 100 * i, frames, i);
    }
  });
}
// changeSpriteSheet("emote");
// emoteAnimation();

// function copyEmail() {
//   const element = document.querySelector("#email");
//   element.addEventListener("click", (event) => {
//     console.log("Email button clicked!");
//   });
// }
// copyEmail();
