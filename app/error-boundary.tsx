'use client';

import { useEffect } from 'react';

/**
 * Global Error Handler for Element.animate() errors
 * 
 * This component patches the Element.animate() method to catch and suppress
 * errors related to invalid keyframe offsets. This is a defensive fix for
 * third-party libraries (like Framer Motion) that may occasionally generate
 * invalid animation configurations.
 */
export default function GlobalErrorHandler() {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof Element === 'undefined') return;

    // Store the original animate method
    const originalAnimate = Element.prototype.animate;

    // Patch Element.animate to catch errors
    Element.prototype.animate = function(
      keyframes: Keyframe[] | PropertyIndexedKeyframes | null,
      options?: number | KeyframeAnimationOptions
    ): Animation {
      try {
        // Try to run the original animation
        return originalAnimate.call(this, keyframes, options);
      } catch (error) {
        // Log the error for debugging
        console.warn('[Animation Error] Caught and suppressed:', error, {
          element: this,
          keyframes,
          options
        });

        // Return a dummy Animation object that conforms to the Web Animations API
        // This prevents the error from breaking the app
        return {
          id: '',
          effect: null,
          timeline: null,
          startTime: null,
          currentTime: 0,
          playbackRate: 1,
          playState: 'finished' as AnimationPlayState,
          replaceState: 'active' as AnimationReplaceState,
          pending: false,
          ready: Promise.resolve(this as any),
          finished: Promise.resolve(this as any),
          
          cancel: () => {},
          finish: () => {},
          play: () => {},
          pause: () => {},
          reverse: () => {},
          updatePlaybackRate: () => {},
          persist: () => {},
          commitStyles: () => {},
          
          oncancel: null,
          onfinish: null,
          onremove: null,
          
          addEventListener: () => {},
          removeEventListener: () => {},
          dispatchEvent: () => false,
        } as Animation;
      }
    };

    // Cleanup function to restore original method
    return () => {
      Element.prototype.animate = originalAnimate;
    };
  }, []);

  return null;
}
