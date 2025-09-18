let videoUserBalance = 0;
let dailyVideos = [];
const maxVideos = 5;
const isAdmin = false; // Set true for admin, false for user

window.onload = function() {
  document.getElementById('adminVideoUpload').style.display = isAdmin ? 'block' : 'none';
  updateVideoBalance();
  renderVideos();
};

function handleVideoUpload() {
  const videoUploadInput = document.getElementById('videoUploadInput');
  const files = videoUploadInput.files;
  const videoUploadMsg = document.getElementById('videoUploadMsg');

  if (files.length === 0) {
    videoUploadMsg.textContent = 'Please select videos to upload.';
    return;
  }
  if (files.length > maxVideos) {
    videoUploadMsg.textContent = `Only ${maxVideos} videos allowed per day.`;
    return;
  }

  dailyVideos = [];
  let loaded = 0;
  for (let i = 0; i < files.length && i < maxVideos; i++) {
    let file = files[i];
    let reader = new FileReader();
    reader.onload = function(e) {
      dailyVideos.push({src: e.target.result, earned: false});
      loaded++;
      if (loaded === files.length || loaded === maxVideos) {
        renderVideos();
      }
    }
    reader.readAsDataURL(file);
  }
  videoUploadMsg.textContent = 'Videos uploaded for today!';
}

function renderVideos() {
  const videosList = document.getElementById('videosList');
  videosList.innerHTML = "";
  dailyVideos.forEach((vid, idx) => {
    let card = document.createElement('div');
    card.className = 'video-card';

    let video = document.createElement('video');
    video.src = vid.src;
    video.controls = true;
    video.dataset.idx = idx;

    // Timer to check watching duration
    let watchedTime = 0;
    let timerActive = false;
    video.addEventListener('play', function() {
      if (!vid.earned && !timerActive) {
        timerActive = true;
        let start = Date.now();
        let interval = setInterval(function() {
          if (!video.paused) {
            watchedTime = (Date.now() - start) / 1000;
            if (watchedTime >= 6 && !vid.earned) {
              vid.earned = true;
              videoUserBalance += 5;
              updateVideoBalance();
              renderVideos();
              clearInterval(interval);
              timerActive = false;
            }
          } else {
            clearInterval(interval);
            timerActive = false;
          }
        }, 500);
      }
    });

    card.appendChild(video);

    let btn = document.createElement('button');
    btn.className = 'earn-btn';
    btn.textContent = vid.earned ? 'Earned' : 'Watch 6s & Earn 5 KES';
    if (vid.earned) btn.classList.add('earned');
    btn.disabled = vid.earned || false;
    card.appendChild(btn);

    videosList.appendChild(card);
  });
}

function updateVideoBalance() {
  document.getElementById('videoUserBalance').textContent = `KES ${videoUserBalance}`;
}