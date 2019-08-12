// Global Vars
let width = 500,
  height = 0,
  filter = "none",
  streaming = false;

// DOM Elements
const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const photos = document.getElementById("photos");
const photoButton = document.getElementById("photo-button");
const clearButton = document.getElementById("clear-button");
const photoFilter = document.getElementById("photo-filter");

// Get media stream
navigator.mediaDevices
  .getUserMedia({ video: true, audio: false })
  .then(stream => {
    // Link to video source
    video.srcObject = stream;
    video.play();
  })
  .catch(err => {
    console.log(`Error: ${err}`);
  });

// Play when ready
video.addEventListener(
  "canplay",
  e => {
    if (!streaming) {
      //set video /canvas height
      height = video.videoHeight / (video.videoWidth / width);
      video.setAttribute("width", width);
      video.setAttribute("height", height);
      canvas.setAttribute("width", width);
      canvas.setAttribute("height", height);

      streaming = true;
    }
  },
  false
);
