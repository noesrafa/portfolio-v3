document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".items");
  let imageIndex = 1;
  let animationTimeout = null;
  let currentPlaying = false;

  function addNewItem(x, y) {
    // compare distance between last item and current mouse position
    const lastItem = container.lastChild;
    if (lastItem) {
      const lastX = parseInt(lastItem.style.left, 10) + 75;
      const lastY = parseInt(lastItem.style.top, 10) + 100;
      const distance = Math.sqrt((lastX - x) ** 2 + (lastY - y) ** 2);
      if (distance < 60) return;
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
      y: 1000,
      opacity: 0,
      duration: 0.75,
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
    addNewItem(event.pageX-300, event.pageY);
    animationTimeout = setTimeout(startAnimation, 100);
  });
});
