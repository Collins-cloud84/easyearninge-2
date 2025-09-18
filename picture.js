let userBalance = 0;
let dailyPictures = [];
const maxPics = 5;

// Set this to true for admin, false for regular user
const isAdmin = false; // <-- Set to true to show upload, false to hide

// Show/hide upload section based on role
window.onload = function() {
  document.getElementById('adminUpload').style.display = isAdmin ? 'block' : 'none';
  updateBalance();
  renderPictures();
};

function handleUpload() {
  const uploadInput = document.getElementById('uploadInput');
  const files = uploadInput.files;
  const uploadMsg = document.getElementById('uploadMsg');

  if (files.length === 0) {
    uploadMsg.textContent = 'Please select pictures to upload.';
    return;
  }
  if (files.length > maxPics) {
    uploadMsg.textContent = `Only ${maxPics} pictures allowed per day.`;
    return;
  }

  dailyPictures = [];
  let loaded = 0;
  for (let i = 0; i < files.length && i < maxPics; i++) {
    let file = files[i];
    let reader = new FileReader();
    reader.onload = function(e) {
      dailyPictures.push({img: e.target.result, liked: false});
      loaded++;
      if (loaded === files.length || loaded === maxPics) {
        renderPictures();
      }
    }
    reader.readAsDataURL(file);
  }
  uploadMsg.textContent = 'Pictures uploaded for today!';
}

// Render daily pictures for users to like
function renderPictures() {
  const picsList = document.getElementById('picturesList');
  picsList.innerHTML = "";
  dailyPictures.forEach((pic, idx) => {
    let card = document.createElement('div');
    card.className = 'pic-card';

    let img = document.createElement('img');
    img.src = pic.img;
    card.appendChild(img);

    let btn = document.createElement('button');
    btn.className = 'like-btn';
    btn.textContent = pic.liked ? 'Liked' : 'Like & Earn 5 KES';
    if (pic.liked) btn.classList.add('liked');
    btn.disabled = pic.liked;
    btn.onclick = function() {
      if (!pic.liked) {
        pic.liked = true;
        userBalance += 5;
        updateBalance();
        renderPictures();
      }
    };
    card.appendChild(btn);
    picsList.appendChild(card);
  });
}

// Update user balance display
function updateBalance() {
  document.getElementById('userBalance').textContent = `KES ${userBalance}`;
}