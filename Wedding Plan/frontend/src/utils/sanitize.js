import DOMPurify from 'dompurify';

/**
 * Sanitizes a given HTML string to prevent XSS attacks.
 * @param {string} dirtyHTML - The potentially unsafe HTML string.
 * @param {Object} [config] - Optional configuration for DOMPurify (customize allowed tags, attributes, etc.).
 * @returns {string} - The sanitized HTML string.
 */
export const sanitizeHTML = (dirtyHTML, config = {}) => {
  return DOMPurify.sanitize(dirtyHTML, config);
};

/**
 * Example usage:
 * 
 * const safeHTML = sanitizeHTML('<script>alert("XSS")</script><b>Hello</b>');
 * console.log(safeHTML); // Outputs: <b>Hello</b>
 */
