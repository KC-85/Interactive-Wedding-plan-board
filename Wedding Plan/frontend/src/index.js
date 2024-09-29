// index.js

// Force horizontal layout on scroll-container if items stack vertically
window.addEventListener('load', () => {
    const scrollContainer = document.querySelector('.scroll-container');
    
    if (scrollContainer) {
      scrollContainer.style.display = 'flex';
      scrollContainer.style.flexWrap = 'nowrap';
      console.log("Scroll container layout fixed for horizontal alignment.");
    }
  });
  