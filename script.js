import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registePlugin(ScrollTrigger);
document.addEventListener("DOMContentLoaded", () => {
  const lenis = new Lenis();
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  const windowContainer = document.querySelector(".window-container");
  const skyContainer = document.querySelector(".skycontainer");
  const heroCopy = document.querySelector(".hero-copy");
  const heroHeader = document.querySelector(".hero-header");
});
