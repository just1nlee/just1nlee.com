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
let timerId;

async function loadFrames(animation) {
  let path = `./sprite_sheet/monkey_${animation}/monkey_${animation}_sprite_sheet.json`;
  let response = await fetch(path);

  let status = response.status;
  let data = await response.json();
  console.log(status);
  console.log(data);

  return data.frames;
}

function changeSpriteSheet(animation) {
  let path = `./sprite_sheet/monkey_${animation}/monkey_${animation}_sprite_sheet.png`;
  const element = document.querySelector(".monkey");
  element.style.backgroundImage = `url("${path}")`;
}

function displayFrame(frames, index) {
  const element = document.querySelector(".monkey");
  const x = -frames[index].frame.x;
  const y = -frames[index].frame.y;
  element.style.backgroundPosition = `${x}px ${y}px`;
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
      timerId = setTimeout(step, 100, currentFrame + 1);
    }
    step(currentFrame);
  });
}

async function animationController() {
  // IDLE
  let idle_frames = await loadFrames("idle");
  changeSpriteSheet("idle");
  runAnimation(idle_frames, 0, true);

  // EMOTE
  let element = document.querySelector(".monkey");
  element.addEventListener("click", async (event) => {
    let emote_frames = await loadFrames("emote");
    changeSpriteSheet("emote");
    clearTimeout(timerId);
    await runAnimation(emote_frames, 0, false);
    changeSpriteSheet("idle");
    runAnimation(idle_frames, 0, true);
  });
}
