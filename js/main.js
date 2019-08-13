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

// Photo button event
photoButton.addEventListener("click", e => {
  takePicture();
  e.preventDefault();
});

// Filter event
photoFilter.addEventListener("change", e => {
  // set filter
  filter = e.target.value;
  video.style.filter = filter;
  e.preventDefault();
});

// clear event

clearButton.addEventListener("click", e => {
  // clear photos
  photos.innerHTML = "";
  filter = "none";
  video.style.filter = filter;
  photoFilter.selectedIndex = 0;
});

function takePicture() {
  // create canvas
  const context = canvas.getContext("2d");
  if (width && height) {
    // set canvas props
    canvas.width = width;
    canvas.height = height;
    // Draw image of the video of the canvas
    context.drawImage(video, 0, 0, width, height);
  }

  // Create image frrom the canvas
  const ImgUrl = canvas.toDataURL("image/png");

  // Crreate image element

  const img = document.createElement("img");

  // Set image src
  img.setAttribute("src", ImgUrl);

  // Set image filter
  img.style.filter = filter;

  // Add image to photos
  photos.appendChild(img);
}
