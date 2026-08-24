// const email_element = document.querySelector("#email");
// email_element.addEventListener("click", (event) => {});

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

function runAnimation(frames) {
  let numberOfFrames = frames.length;
  let currentFrame = 0;

  for (let i = 0; i < numberOfFrames; i++) {
    console.log(`printing frame ${i}`);
    setTimeout(displayFrame, 100 + 100 * i, frames, i);
  }
}

async function emoteAnimation() {
  let frames = await loadFrames("emote");
  let monke = document.querySelector(".monke");
  monke.addEventListener("click", (event) => {
    for (let i = 0; i < frames.length; i++) {
      setTimeout(displayFrame, 100 + 100 * i, frames, i);
    }
  });
}

changeSpriteSheet("emote");
emoteAnimation();

//let frames = await loadFrames("idle");
//runAnimation(frames);

// function copyEmail() {
//   const element = document.querySelector("#email");
//   element.addEventListener("click", (event) => {
//     console.log("Email button clicked!");
//   });
// }
// copyEmail();
