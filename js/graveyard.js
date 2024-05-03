document.addEventListener("DOMContentLoaded", function () {
    const title_container = document.querySelector(".hero_title");
    const phrase = "Top rated design for fast growing companies";
  
    let words = phrase.split(" ");
      let currentWord = 0;
      let speed = 100;
  
      function typeWriter() {
        if (currentWord < words.length) {
          title_container.innerHTML += words[currentWord] + " ";
          currentWord++;
          setTimeout(typeWriter, speed);
        }
      }
      // dot after last word
      let dot = document.createElement("span");
      dot.className = "dot";
      
  
      typeWriter();
  });
  