/**
 * This file defines a React component 'CountUpNumber' that animates the counting
 * up of a number from 0 to the specified 'endValue' over the specified 'duration'.
 * It uses the useEffect hook to handle the animation logic and the useState hook
 * to manage the current count value.
 */

import { FC, useEffect, useState } from "react";

// Define the Props type for the CountUpNumber component
type Props = {
  endValue: number; // The target value to count up to
  duration: number; // The duration of the counting animation
};

// Define the CountUpNumber component
const CountUpNumber: FC<Props> = ({ endValue, duration }) => {
  // State to manage the current count value
  const [count, setCount] = useState(0);

  // Effect to handle the counting animation
  useEffect(() => {
    let startTime: number; // Timestamp when the animation starts
    let animationFrameId: number; // ID of the animation frame

    // Function to update the count based on the progress of the animation
    const updateCount = (timestamp: number) => {
      // Initialize the start time if not already set
      if (!startTime) startTime = timestamp;

      // Calculate the progress of the animation
      const progress = timestamp - startTime;

      // If the animation is still in progress, update the count and request the next frame
      if (progress < duration) {
        setCount(Math.min(endValue, (progress / duration) * endValue));
        animationFrameId = requestAnimationFrame(updateCount);
      } else {
        // If the animation is complete, set the count to the end value
        setCount(endValue);
      }
    };

    // Start the animation by requesting the first frame
    animationFrameId = requestAnimationFrame(updateCount);

    // Cleanup function to cancel the animation frame when the component unmounts
    return () => cancelAnimationFrame(animationFrameId);
  }, [endValue, duration]);

  // Render the count as a paragraph element with appropriate styling
  return <p className="md:font-bold font-medium text-lg xl:text-5xl">{Math.round(count)}</p>;
};

export default CountUpNumber;
