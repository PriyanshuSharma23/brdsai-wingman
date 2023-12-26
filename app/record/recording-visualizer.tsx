"use client";

import { useEffect, useState } from "react";
// @ts-ignore
import { LiveAudioVisualizer } from "react-audio-visualize";

type RecordingVisualizerProps = {
  mediaRecorder: MediaRecorder | undefined;
};
export const RecordingVisualizer = (props: RecordingVisualizerProps) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const resizeHandler = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  if (!props.mediaRecorder) {
    return null;
  }
  return (
    <div className="mt-7">
      <LiveAudioVisualizer
        mediaRecorder={props.mediaRecorder}
        width={screenWidth}
        height={200}
        barWidth={6}
        gap={10}
        barColor={"#035879"}
      />
    </div>
  );
};
