document.addEventListener("DOMContentLoaded", () => {
  const heart = document.getElementById("heart");
  const mainContent = document.getElementById("main-content");
  const photoInput = document.getElementById("photoInput");
  const photoGallery = document.getElementById("photoGallery");
  const music = document.getElementById("bg-music");

  const blessings = [
    "愿友谊地久天长 🌸",
    "毕业快乐！🎓",
    "未来一片光明 ✨",
    "心怀感恩，笑对人生 💕",
    "不忘初心，继续前行 🌼",
    "珍惜此刻，拥抱未来 🌈",
    "菩提精神，永远相随 🍀",
    "愿你前程似锦！💫"
  ];

  function showBlessings() {
    music.play().catch(() => console.log("Music needs tap to start"));

    blessings.forEach((word, index) => {
      const span = document.createElement("span");
      span.textContent = word;
      span.classList.add("fly");
      document.body.appendChild(span);

      const startX = window.innerWidth / 2;
      const startY = window.innerHeight / 2;
      const endX = Math.random() * window.innerWidth;
      const endY = Math.random() * window.innerHeight / 1.5;

      span.style.left = `${startX}px`;
      span.style.top = `${startY}px`;
      span.style.fontSize = `${Math.random() * 15 + 35}px`;
      span.style.color = ["#ff4d4d", "#fff", "#ff99cc"][Math.floor(Math.random() * 3)];
      span.style.opacity = "0";

      setTimeout(() => {
        span.style.opacity = "1";
        span.style.left = `${endX}px`;
        span.style.top = `${endY}px`;
      }, index * 150);

      setTimeout(() => { span.style.opacity = "0"; }, 2200 + index * 100);
      setTimeout(() => { span.remove(); }, 3000 + index * 100);
    });

    setTimeout(() => {
      heart.style.opacity = "0";
      setTimeout(() => {
        heart.style.display = "none";
        mainContent.classList.add("show");
      }, 1000);
    }, 4000);
  }

  heart.addEventListener("click", showBlessings);
  heart.addEventListener("touchstart", showBlessings);

  // 🌩️ Cloudinary setup
  const cloudName = "dsyefqzi5"; 
  const uploadPreset = "graduation"; 

  const uploadingMsg = document.createElement("div");
  uploadingMsg.textContent = "正在上传照片，请稍候…";
  uploadingMsg.style.position = "fixed";
  uploadingMsg.style.top = "50%";
  uploadingMsg.style.left = "50%";
  uploadingMsg.style.transform = "translate(-50%, -50%)";
  uploadingMsg.style.background = "rgba(255,255,255,0.9)";
  uploadingMsg.style.padding = "20px 40px";
  uploadingMsg.style.borderRadius = "15px";
  uploadingMsg.style.fontSize = "20px";
  uploadingMsg.style.color = "#b30000";
  uploadingMsg.style.display = "none";
  uploadingMsg.style.boxShadow = "0 0 15px rgba(0,0,0,0.2)";
  uploadingMsg.style.zIndex = "999";
  document.body.appendChild(uploadingMsg);

  photoInput.addEventListener("change", async (e) => {
    const files = e.target.files;
    if (!files.length) return;

    uploadingMsg.style.display = "block";

    for (let file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
          method: "POST",
          body: formData
        });
        const data = await response.json();

        const img = document.createElement("img");
        img.src = data.secure_url;
        img.style.opacity = "0";
        photoGallery.appendChild(img);

        setTimeout(() => {
          img.style.transition = "opacity 1.5s";
          img.style.opacity = "1";
        }, 100);
      } catch (error) {
        console.error("Upload failed:", error);
        alert("上传失败，请稍后再试！");
      }
    }

    setTimeout(() => {
      uploadingMsg.style.transition = "opacity 1s";
      uploadingMsg.style.opacity = "0";
      setTimeout(() => (uploadingMsg.style.display = "none"), 1000);
    }, 1500);
  });

  // 🌸 Floating petals around heart
  function createPetals() {
    for (let i = 0; i < 20; i++) {
      const petal = document.createElement('div');
      petal.classList.add('petal');
      document.body.appendChild(petal);

      const startX = window.innerWidth / 2 + (Math.random() * 100 - 50);
      const startY = window.innerHeight / 2 + (Math.random() * 50 - 25);

      petal.style.left = startX + 'px';
      petal.style.top = startY + 'px';
      petal.style.animationDelay = (Math.random() * 3) + 's';
    }
  }

  createPetals();
});
