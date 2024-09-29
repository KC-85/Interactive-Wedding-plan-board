// src/animations/boardAnimations.js
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';

gsap.registerPlugin(ScrollTrigger, Draggable);

// Full interactivity for the Planning Board
export const fullBoardInteractivity = () => {
  
  // Scroll-triggered parallax effect on images
  gsap.fromTo('.board-content img', {
    y: 50,
    opacity: 0,
  }, {
    y: 0,
    opacity: 1,
    scrollTrigger: {
      trigger: '.board-content',
      start: 'top 80%',
      end: 'bottom 20%',
      scrub: true,  // Smooth animation tied to scroll
    },
  });

  // Draggable seating items within the seating chart
  Draggable.create('.seating-item', {
    bounds: '.seating-chart',
    inertia: true,  // Smooth motion after drag
    onDragEnd: function () {
      console.log(`Item dropped at x: ${this.x}, y: ${this.y}`);
    }
  });

  // Staggered guest list item animations
  gsap.from('.guest-list-item', {
    opacity: 0,
    y: 50,
    stagger: 0.3,  // Stagger each item by 0.3s
    scrollTrigger: {
      trigger: '.guest-list',
      start: 'top 80%',
      end: 'bottom 20%',
      scrub: true,  // Smooth scroll-tied animation
    },
  });
};
