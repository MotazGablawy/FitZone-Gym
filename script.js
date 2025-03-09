//
//
//
//

document.addEventListener("DOMContentLoaded", function () {
  // Toggle mobile menu on click
  const menuIcon = document.querySelector(".toggle-menu");
  const navMenu = document.querySelector("nav ul");
  menuIcon.addEventListener("click", function () {
    navMenu.classList.toggle("active");
  });

  // Manage active class on nav links and close menu on click
  document.querySelectorAll("nav ul li a").forEach((link) => {
    link.addEventListener("click", function () {
      document.querySelectorAll("nav ul li a").forEach((l) => l.classList.remove("active"));
      this.classList.add("active");
      // Close mobile menu if open
      if (navMenu.classList.contains("active")) {
        navMenu.classList.remove("active");
      }
    });
  });

  // Background change functionality with smooth fade
  const backgrounds = ["./images/landing1.jpg", "./images/landing2.jpg", "./images/landing3.jpg"];
  let currentBg = 0;
  const landing = document.querySelector(".landing");
  const bullets = document.querySelectorAll(".bullets li");

  function updateBullets(index) {
    bullets.forEach((bullet, idx) => {
      bullet.classList.toggle("active", idx === index);
    });
  }

  function changeBackgroundSmooth(newIndex) {
    // Create a fader overlay element
    const fader = document.createElement("div");
    fader.style.position = "absolute";
    fader.style.top = "0";
    fader.style.left = "0";
    fader.style.width = "100%";
    fader.style.height = "100%";
    fader.style.backgroundImage = `url(${backgrounds[newIndex]})`;
    fader.style.backgroundSize = "cover";
    fader.style.backgroundPosition = "center";
    fader.style.opacity = "0";
    fader.style.transition = "opacity 1s ease";
    fader.style.zIndex = "0";
    landing.appendChild(fader);

    // Trigger reflow to enable transition
    void fader.offsetWidth;
    // Fade in the overlay
    fader.style.opacity = "1";

    // After transition
    setTimeout(function () {
      landing.style.backgroundImage = `url(${backgrounds[newIndex]})`;
      landing.removeChild(fader);
      updateBullets(newIndex);
      currentBg = newIndex;
    }, 1000);
  }

  // Change background on arrow click
  document.querySelectorAll(".change-background").forEach((arrow) => {
    arrow.addEventListener("click", function () {
      const dir = this.getAttribute("data-dir");
      let newIndex;
      if (dir === "next") {
        newIndex = (currentBg + 1) % backgrounds.length;
      } else {
        newIndex = (currentBg - 1 + backgrounds.length) % backgrounds.length;
      }
      changeBackgroundSmooth(newIndex);
    });
  });

  // Auto change background every 5 seconds
  setInterval(function () {
    const newIndex = (currentBg + 1) % backgrounds.length;
    changeBackgroundSmooth(newIndex);
  }, 5000);
});

document.addEventListener("scroll", function () {
  const sections = document.querySelectorAll("section, div[id]"); // أو يمكنك تحديد الأقسام اللي عايزها
  const scrollPos = window.scrollY + 100; // إضافة offset لو محتاج
  sections.forEach((section) => {
    const id = section.getAttribute("id");
    if (id) {
      const offsetTop = section.offsetTop;
      const offsetHeight = section.offsetHeight;
      if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
        document.querySelectorAll("nav ul li a").forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });
      }
    }
  });
});

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
