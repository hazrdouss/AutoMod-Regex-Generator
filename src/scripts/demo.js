let canvas = document.querySelector("canvas");
let video = document.querySelector("video");

let videoStream = canvas.captureStream(60);
let mediaRecorder = new MediaRecorder(videoStream);

let chunks = [];
mediaRecorder.ondataavailable = function (e) {
   chunks.push(e.data);
};

mediaRecorder.onstop = function (e) {
   let blob = new Blob(chunks, { type: "video/mp4" });
   chunks = [];
   let videoURL = URL.createObjectURL(blob);
   video.src = videoURL;
};
mediaRecorder.ondataavailable = function (e) {
   chunks.push(e.data);
};

mediaRecorder.start();
setTimeout(function () {
   mediaRecorder.stop();
}, 10000);
