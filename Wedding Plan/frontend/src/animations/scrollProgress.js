// src/animations/scrollProgress.js
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Scroll-based parallax effect and background color transitions
export const scrollProgressAnimation = () => {

  // Parallax scrolling effect on elements
  gsap.fromTo('.scroll-element', {
    y: 100,
    opacity: 0,
  }, {
    y: 0,
    opacity: 1,
    scrollTrigger: {
      trigger: '.scroll-element',
      start: 'top 80%',
      end: 'bottom 20%',
      scrub: true,  // Smooth scroll-tied animation
    },
  });

  // Background color transitions based on scroll position
  gsap.to('body', {
    backgroundColor: '#f8f9fa',
    scrollTrigger: {
      trigger: '.section-1',
      start: 'top center',
      end: 'bottom center',
      scrub: true,
      onEnter: () => gsap.to('body', { backgroundColor: '#f8f9fa' }),
      onLeaveBack: () => gsap.to('body', { backgroundColor: '#fff' }),
    },
  });

  gsap.to('body', {
    backgroundColor: '#e9ecef',
    scrollTrigger: {
      trigger: '.section-2',
      start: 'top center',
      end: 'bottom center',
      scrub: true,
      onEnter: () => gsap.to('body', { backgroundColor: '#e9ecef' }),
      onLeaveBack: () => gsap.to('body', { backgroundColor: '#f8f9fa' }),
    },
  });
};
