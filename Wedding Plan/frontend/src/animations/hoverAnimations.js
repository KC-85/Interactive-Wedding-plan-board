// src/animations/hoverAnimations.js
import gsap from 'gsap';

// Button hover animations for interactivity
export const hoverButtonAnimation = () => {
  const buttons = document.querySelectorAll('button');

  buttons.forEach((button) => {
    // Hover effect: scale up when hovered
    button.addEventListener('mouseenter', () => {
      gsap.to(button, { 
        scale: 1.2, 
        duration: 0.3, 
        ease: 'power3.out' 
      });
    });

    // Scale back down when hover ends
    button.addEventListener('mouseleave', () => {
      gsap.to(button, { 
        scale: 1, 
        duration: 0.3, 
        ease: 'power3.in' 
      });
    });
  });
};
