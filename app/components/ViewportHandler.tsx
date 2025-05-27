"use client";

import { useEffect, useState } from "react";

const ViewportHandler = () => {
  const [isMacOS, setIsMacOS] = useState(false);

  useEffect(() => {
    const isMac = /Mac|iPod|iPhone|iPad/.test(navigator.platform);
    setIsMacOS(isMac);
    
    // Update viewport meta tag based on platform
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (viewportMeta) {
      if (isMac) {
        viewportMeta.setAttribute('content', 'width=device-width, initial-scale=0.5, maximum-scale=0.5, user-scalable=no');
      } else {
        viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1');
      }
    }
  }, []);

  return null;
};

export default ViewportHandler; 