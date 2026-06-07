import { useState, useEffect } from 'react';

/**
 * useWindowSize — custom hook
 * Tracks the browser window's inner width and height.
 * Updates automatically whenever the window is resized.
 */
function useWindowSize() {
  // Store the current window dimensions in state
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    // Handler called every time the window is resized
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Attach the listener when the component mounts
    window.addEventListener('resize', handleResize);

    // Cleanup: remove the listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty array → runs once on mount, cleans up on unmount

  return windowSize;
}

export default useWindowSize;
