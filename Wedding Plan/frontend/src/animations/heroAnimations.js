// src/animations/heroAnimations.js
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Hero section animations with pinning and mouse-follow effects
export const heroAnimation = () => {
  const tl = gsap.timeline();

  // Timeline animation for the hero text
  tl.from('.hero-section h1', { 
    duration: 1.5, 
    y: -50, 
    opacity: 0, 
    ease: 'power3.out' 
  })
  .from('.hero-section p', { 
    duration: 1, 
    y: 30, 
    opacity: 0, 
    ease: 'power3.out' 
  }, '-=0.5')
  .from('.hero-section button', { 
    duration: 1, 
    scale: 0.5, 
    opacity: 0, 
    ease: 'back.out(1.7)' 
  }, '-=0.5');

  // Pin the hero section while scrolling
  gsap.fromTo('.hero-section h1', {
    y: 0,
    opacity: 1,
  }, {
    y: -200,
    opacity: 0,
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top top',
      end: 'bottom top',
      scrub: true,  // Smooth scroll-tied animation
      pin: true,    // Pin the element in place
    },
  });

  // Mouse-follow interaction for hero elements
  const heroElements = document.querySelectorAll('.hero-section h1, .hero-section p');
  window.addEventListener('mousemove', (e) => {
    heroElements.forEach((el) => {
      gsap.to(el, {
        x: (e.clientX - window.innerWidth / 2) / 20,  // Move based on mouse position
        y: (e.clientY - window.innerHeight / 2) / 20,
        duration: 0.5,
        ease: 'power3.out',
      });
    });
  });
};
