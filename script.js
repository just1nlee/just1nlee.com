async function loadFrames(animation) {
  let path = `./sprite_sheet/monke_${animation}/monke_${animation}_sprite_sheet.json`;
  let response = await fetch(path);

  let status = response.status;
  let data = await response.json();
  console.log(status);
  console.log(data);

  return data.frames;
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

  //  setTimeout(displayFrame(frames, currentFrame), 100);
  for (let i = 0; i < numberOfFrames; i++) {
    displayFrame(frames, i);
  }
}
// function tick() {
//   console.log("tick");
//   setTimeout(tick, 100);
// }
// tick();

// setTimeout(() => {
//   console.log("this runs once, after waiting");
// }, 10000);

let frames = await loadFrames("idle");
runAnimation(frames);
