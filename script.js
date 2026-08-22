async function loadFrames(animation) {
  let path = `./sprite_sheet/monke_${animation}/monke_${animation}_sprite_sheet.json`;
  let response = await fetch(path);

  let status = response.status;
  let data = await response.json();
  console.log(status);
  console.log(data);

  return data;
}

let frames = await loadFrames("idle");
