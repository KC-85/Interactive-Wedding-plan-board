// index.js

window.addEventListener('load', () => {
  const scrollContainer = document.querySelector('.scroll-container');

  if (scrollContainer) {
    // Apply forced width and overflow settings
    scrollContainer.style.display = 'flex';
    scrollContainer.style.flexWrap = 'nowrap';
    scrollContainer.style.overflowX = 'scroll';
    scrollContainer.style.width = '90vw';
    scrollContainer.style.maxWidth = '90vw';
    scrollContainer.style.whiteSpace = 'nowrap';

    // Debugging logs
    const containerWidth = scrollContainer.clientWidth;
    const scrollWidth = scrollContainer.scrollWidth;
    const isOverflowing = scrollWidth > containerWidth;

    console.log(`Container Width: ${containerWidth}`);
    console.log(`Scroll Width: ${scrollWidth}`);
    console.log(`Horizontal scrolling active: ${isOverflowing ? 'Yes' : 'No'}`);

    if (!isOverflowing) {
      console.error("Horizontal scrolling not enabled. Container width might be too large.");
    }
  } else {
    console.error("Scroll container not found. Check the HTML structure.");
  }
});
