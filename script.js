// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  /* -------------------- LENIS SETUP -------------------- */
  const lenis = new Lenis();
  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000); // GSAP + Lenis sync
  });

  gsap.ticker.lagSmoothing(0);

  /* -------------------- ELEMENT SELECTORS -------------------- */
  const windowContainer = document.querySelector(".window-container");
  const skyContainer = document.querySelector(".sky-container");
  const heroCopy = document.querySelector(".hero-copy");
  const heroHeader = document.querySelector(".hero-header");
  const windowTitle = document.querySelector(".window-container h2");

  /* -------------------- INITIAL VALUES -------------------- */
  const skyContainerHeight = skyContainer.offsetHeight;
  const viewportHeight = window.innerHeight;
  const skyMoveDistance = skyContainerHeight - viewportHeight;

  // hero copy start me niche chhupi rahe
  gsap.set(heroCopy, { yPercent: 100 });

  // 👉 NEW: h2 ko start me hidden rakho
  gsap.set(windowTitle, {
    opacity: 0,
    scale: 0.8,
  });

  /* -------------------- MAIN SCROLL ANIMATION -------------------- */
  ScrollTrigger.create({
    trigger: ".hero",
    start: "top top",
    end: `+=${window.innerHeight * 3}px`,
    pin: true,
    scrub: 1,

    onUpdate: (self) => {
      const progress = self.progress; // 0 → 1 scroll progress

      /* ---- window + header scale logic ---- */
      let windowScale;
      if (progress <= 0.5) {
        windowScale = 1 + (progress / 0.5) * 3;
      } else {
        windowScale = 4;
      }

      gsap.set(windowContainer, { scale: windowScale });
      gsap.set(heroHeader, { scale: windowScale, z: progress * 500 });

      /* ---- sky image move ---- */
      gsap.set(skyContainer, {
        y: -progress * skyMoveDistance,
      });

      /* ---- hero text slide logic ---- */
      let heroCopyY;
      if (progress <= 0.66) {
        heroCopyY = 100;
      } else if (progress >= 1) {
        heroCopyY = 0;
      } else {
        heroCopyY = 100 * (1 - (progress - 0.66) / 0.34);
      }
      gsap.set(heroCopy, { yPercent: heroCopyY });

      /* -------------------- 🔥 H2 (Jets) LOGIC -------------------- */
      /*
        - Scroll ke beech me h2 appear ho
        - Window zoom ke sath smooth feel aaye
      */

      if (progress > 0.25 && progress < 0.65) {
        // h2 show + thoda zoom in
        gsap.set(windowTitle, {
          opacity: 1,
          scale: 1,
        });
      } else {
        // baaki time h2 hide
        gsap.set(windowTitle, {
          opacity: 0,
          scale: 0.8,
        });
      }
    },
  });
});
