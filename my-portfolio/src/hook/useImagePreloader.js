import { useState, useEffect } from "react";
import myPic from "../assets/myPic2.png";

/**
 * Default list of critical portfolio image assets to preload in the background.
 */
const defaultImages = [
  "/my-logo.png",
  "/herobg.png",
  "/contactn.png",
  "/loaderbg.png",
  myPic,
  // Skill icons
  "/skills/react.png",
  "/skills/html.png",
  "/skills/css.png",
  "/skills/javascript.png",
  "/skills/tailwind.svg",
  "/skills/c.png",
  "/skills/cpp.png",
  "/skills/nodejs.webp",
  "/skills/express.svg",
  "/skills/mongoDb.webp",
  "/skills/vscode.svg",
  "/skills/postman.png",
  "/skills/git.png",
  "/skills/github.png",
  // Contact icons
  "/contact/github.png",
  "/contact/linkedin.png",
  "/contact/instagram.png",
  "/contact/twitter.png",
  // Main Project previews
  "/projects/react/streamify.png",
  "/projects/react/task-tracker.png",
  "/projects/react/dice-game.png",
  "/projects/react/resume-builder.png",
];

/** I use Ai to generate this comments (^_^) for your better understanding
 *
 * Custom Hook: useImagePreloader,
 * ----------------------------------------------------------------------
 * HOW IT WORKS STEP-BY-STEP:
 * 1. Takes an array of image URLs to load in advance before showing the website.
 * 2. Creates HTML Image objects (`new Image()`) in memory to trigger browser caching.
 * 3. Tracks real-time load progress (`targetProgress`) as each image finishes downloading.
 * 4. Runs a smooth visual stepper loop (`displayProgress`) from 0% to 100% over ~2.3s
 *    so all preloader status text stages are comfortably readable to the user.
 * 5. When progress hits 100%, pauses briefly on "WELCOME!" (550ms) then sets `isLoading` to false.
 * 6. Includes a 3.5-second safety timer so slow networks never leave the site hanging.
 */
export const useImagePreloader = (imagesToPreload = defaultImages) => {
  // State: Whether preloader is active and the current percentage (0-100%)
  const [isLoading, setIsLoading] = useState(true);
  const [displayProgress, setDisplayProgress] = useState(0);

  useEffect(() => {
    let isMounted = true;
    let loadedCount = 0;
    const totalImages = imagesToPreload.length;

    // Stores the calculated target percentage based on actual downloaded images
    let targetProgress = 0;

    // STEP 1: Fail-safe timer (Max 3.5 seconds to prevent hanging on slow connections)
    const safetyTimer = setTimeout(() => {
      targetProgress = 100;
    }, 3500);

    // STEP 2: Function called every time an image finishes downloading or fails
    const updateRealProgress = () => {
      loadedCount++;
      if (isMounted) {
        // Calculate percentage of loaded images
        targetProgress = Math.round((loadedCount / totalImages) * 100);
      }
    };

    // STEP 3: Instantiate Image objects in memory to force browser network preloading
    imagesToPreload.forEach((src) => {
      const img = new Image();
      img.src = src;

      // Check if image was already cached in browser memory
      if (img.complete) {
        updateRealProgress();
      } else {
        img.onload = updateRealProgress;
        img.onerror = updateRealProgress; // count errors as finished so load never gets stuck
      }
    });

    // STEP 4: Smooth visual stepper loop (~2.3s total duration)
    // Ensures progress ticks up smoothly so the user can read all status messages
    const stepInterval = setInterval(() => {
      if (!isMounted) return;

      setDisplayProgress((current) => {
        // Increment progress towards targetProgress
        if (
          current < targetProgress ||
          (current < 100 && loadedCount >= totalImages)
        ) {
          const next = current + 1;

          // When progress reaches 100%
          if (next >= 100) {
            clearInterval(stepInterval);

            // Hold on 100% ("WELCOME!") for 550ms before fading out preloader
            setTimeout(() => {
              if (isMounted) {
                setIsLoading(false);
              }
            }, 550);
            return 100;
          }
          return next;
        }
        return current;
      });
    }, 23); // Step every 23ms (~2.3 seconds total flow)

    // STEP 5: Cleanup timers if component unmounts
    return () => {
      isMounted = false;
      clearTimeout(safetyTimer);
      clearInterval(stepInterval);
    };
  }, [imagesToPreload]);

  return { isLoading, progress: displayProgress };
};

export default useImagePreloader;
