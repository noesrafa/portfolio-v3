const title_container = document.querySelector("[animation-chat]");
const dot = document.createElement("span");
const sectionHero = document.querySelector(".hero");
const container = document.createElement("div");
container.className = "items";

// ============= SMOOTH SCROLL ============= //
const lenis = new Lenis();
lenis.on("scroll", (e) => {});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// ============= IMAGE TRAIL ANIMATION ============= //
document.addEventListener("DOMContentLoaded", function () {
  container.className = "items";
  sectionHero.appendChild(container);

  let imageIndex = 1;
  let animationTimeout = null;
  let currentPlaying = false;

  function addNewItem(x, y) {
    const lastItem = container.lastChild;
    if (lastItem) {
      const lastX = parseInt(lastItem.style.left, 10) + 75;
      const lastY = parseInt(lastItem.style.top, 10) + 100;
      const distance = Math.sqrt((lastX - x) ** 2 + (lastY - y) ** 2);
      if (distance < 70) return;
    }

    const newItem = document.createElement("div");
    newItem.className = "item";
    newItem.style.left = `${x - 75}px`;
    newItem.style.top = `${y - 100}px`;

    const img = document.createElement("img");
    img.src = `assets/img/${imageIndex}.png`;
    newItem.appendChild(img);
    imageIndex = (imageIndex % 15) + 1;

    container.appendChild(newItem);

    gsap.from(newItem, {
      scale: 0,
      duration: 0.5,
      ease: "power2.out",
      borderRadius: "50%",
    });

    manageItemLimit();
  }

  function manageItemLimit() {
    while (container.children.length > 10) {
      container.removeChild(container.firstChild);
    }
  }

  function startAnimation() {
    if (currentPlaying || container.children.length === 0) return;
    currentPlaying = true;

    gsap.to(".item", {
      y: 100,
      opacity: 0,
      duration: 0.5,
      stagger: 0.025,
      ease: "power2.in",
      onComplete: function () {
        this.targets().forEach((item) => {
          if (item.parentNode) {
            item.parentNode.removeChild(item);
          }
        });

        currentPlaying = false;
      },
    });
  }

  container.addEventListener("mousemove", function (event) {
    clearTimeout(animationTimeout);
    addNewItem(event.pageX - 300, event.pageY);
    animationTimeout = setTimeout(startAnimation, 100);
  });

  // ============= TITLE ANIMATION ============= //
  const phrase = title_container.getAttribute("animation-chat");
  dot.className = "dot";
  title_container.appendChild(dot);

  let words = phrase.split(" ");
  let currentWord = 0;
  let speed = 130;

  gsap.from(".dot", {
    scale: 0,
    opacity: 0,
    duration: 0.5,
    x: -1000,
    ease: "expo.out",
  });

  function typeWriter() {
    if (currentWord < words.length) {
      const word = document.createElement("span");
      word.className = "word";
      word.innerHTML = words[currentWord];
      title_container.insertBefore(word, dot);

      gsap.from(word, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
      });

      currentWord++;
      setTimeout(typeWriter, speed);
    }
    if (currentWord === words.length) {
      gsap.to(".dot", {
        scale: 0,
        opacity: 0,
        duration: 0.25,
        ease: "power2.in",
      });
      gsap.to(".dot", {
        height: 0,
        width: 0,
        delay: 0.25,
        ease: "circ.out",
      });
    }
  }

  setTimeout(typeWriter, 250);

  // ============= Project animation =============
  const project = document.querySelector(".project_description");

  gsap.to(title_container, {
    scrollTrigger: {
      trigger: ".project",
      start: "top 90%",
      end: "+=500 bottom",
      markers: false,
      scrub: 0.5,
    },
    opacity: 0,
    scale: 0.8,
  });

  gsap.to(project, {
    scrollTrigger: {
      trigger: ".project_images",
      start: "top 50%",
      end: "+=500 bottom",
      markers: false,
      scrub: 0.5,
    },
    opacity: 0,
    y: 100,
    scale: 0.8,
  });
});
