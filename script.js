const cards = document.querySelectorAll(".project-card");
const section = document.querySelector(".projects-scroll");

function animateProjects() {

  const rect = section.getBoundingClientRect();

  const maxScroll =
    section.offsetHeight - window.innerHeight;

  let progress = -rect.top / maxScroll;

  progress = Math.max(0, Math.min(1, progress));

  const total = cards.length - 1;

  const position = progress * total;

  cards.forEach((card, index) => {

    let distance = index - position;

    /*
      Current card = 0
      Next card = 1
      Previous card = -1
    */

    if (distance < -1) {

      card.style.opacity = "0";

      card.style.transform =
        "translateY(-120px) scale(.85)";

    }

    else if (distance < 0) {

      const amount = Math.abs(distance);

      card.style.opacity = 1 - amount;

      card.style.transform =
        `translateY(${-amount * 70}px)
         scale(${1 - amount * .08})`;

    }

    else if (distance <= 1) {

      const amount = distance;

      card.style.opacity = "1";

      card.style.transform =
        `translateY(${amount * 120}px)
         scale(${1 - amount * .08})`;

    }

    else {

      card.style.opacity = "0";

      card.style.transform =
        "translateY(120px) scale(.85)";

    }

    /*
      Make the cards stack in order
    */

    card.style.zIndex = cards.length - index;

  });

}

window.addEventListener("scroll", animateProjects);

window.addEventListener("resize", animateProjects);

animateProjects();



/* =========================================
   TYPEWRITER
========================================= */

const typewriterSentences = [
  "Pushing the boundaries of what's possible on screen.",
  "Designing digital experiences that demand attention.",
  "Crafting pixel-perfect code engineered to scale.",
  "Transforming visionary concepts into living web realities."
];

const targetElement =
  document.getElementById("typewriter-text");

let sentenceIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typingSpeed = 70;
const deletingSpeed = 35;
const delayBetweenSentences = 2000;


function typeWriter() {

  if (!targetElement) return;

  const currentSentence =
    typewriterSentences[sentenceIndex];

  if (isDeleting) {

    targetElement.textContent =
      currentSentence.substring(0, charIndex - 1);

    charIndex--;

  } else {

    targetElement.textContent =
      currentSentence.substring(0, charIndex + 1);

    charIndex++;

  }

  let nextTimeout =
    isDeleting ? deletingSpeed : typingSpeed;


  if (
    !isDeleting &&
    charIndex === currentSentence.length
  ) {

    nextTimeout = delayBetweenSentences;

    isDeleting = true;

  }

  else if (
    isDeleting &&
    charIndex === 0
  ) {

    isDeleting = false;

    sentenceIndex =
      (sentenceIndex + 1) % typewriterSentences.length;

    nextTimeout = 500;

  }

  setTimeout(typeWriter, nextTimeout);

}

typeWriter();



/* =========================================
   SCROLL EMERGENCE
========================================= */

const emergeElements =
  document.querySelectorAll(
    ".emerge-left, .emerge-right"
  );


const emergeObserver =
  new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add("show");

          /*
            Animate only once.
            Once the element has appeared,
            we don't observe it anymore.
          */

          emergeObserver.unobserve(
            entry.target
          );

        }

      });

    },
    {
      threshold: 0.2
    }
  );


emergeElements.forEach((element) => {

  emergeObserver.observe(element);

});







gsap.timeline({
    scrollTrigger: {
        trigger: ".skills-transition",
        start: "top top",
        end: "+=100%",
        scrub: 1,
        pin: true
    }
})
.to(".skills-screen h2", {
    scale: 80,
    duration: 0.6,
    ease: "none"
})
.to(".next-screen", {
    y: 0,
    duration: 0.4,
    ease: "power2.inOut"
});




document.addEventListener("DOMContentLoaded", () => {
    // Fixed: added 's' to '.nav-items'
    const navItems = document.querySelectorAll('.nav-items');

    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Fixed: added 's' to '.nav-items.active'
            const currentActive = document.querySelector('.nav-items.active');
            
            if (currentActive) {
                currentActive.classList.remove('active');
            }
            
            this.classList.add('active');
        });
    });
});





var Path = "M 10 100 Q 500 1400 100"

var finalPath ="M 10 100 Q 500 100 1400 100"

var string = document.querySelector(".string")

string.addEventListener("mousemove", function (dets){
  Path = `M 10 100 Q 500 ${dets.y} 1400 100`
  gsap.to("svg path",{
    attr:{d:Path},
    duration:0.2,
    ease:"power3.out"
  })
})

string.addEventListener("mouseleave", function (){
 gsap.to("svg path",{
  attr:{d:finalPath},
  duration:1.5,
  ease:"elastic.out(1,0.2)"
 })
})


/* =========================
   SCROLL PROGRESS
========================= */

const progressBar = document.querySelector(".scroll-progress");

function updateScrollProgress() {
  const scrollTop = window.scrollY;

  const documentHeight =
    document.documentElement.scrollHeight -
    window.innerHeight;

  const progress =
    documentHeight > 0
      ? (scrollTop / documentHeight) * 100
      : 0;

  progressBar.style.width = `${progress}%`;
}

window.addEventListener("scroll", updateScrollProgress);
window.addEventListener("resize", updateScrollProgress);

updateScrollProgress();