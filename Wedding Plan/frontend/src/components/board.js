// src/components/board.js

import React, { useState } from 'react';
import { sanitizeHTML } from '../utils/sanitize';

const Board = () => {
  const [content, setContent] = useState('<script>alert("XSS")</script><b>All Tasks</b>');

  // Sanitize content before rendering
  const safeContent = sanitizeHTML(content);

  return (
    <div>
      <h2>Planning Board</h2>
      <div dangerouslySetInnerHTML={{ __html: safeContent }} />
    </div>
  );
};

export default Board;
