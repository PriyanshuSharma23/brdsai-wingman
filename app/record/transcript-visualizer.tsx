"use client";
import { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

type TranscriptVisualizerProps = {
  transcribe: boolean;
};
export const TranscriptVisualizer = (props: TranscriptVisualizerProps) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();


  useEffect(() => {
    if (props.transcribe) {
      SpeechRecognition.startListening();
    } else {
      SpeechRecognition.stopListening();
    }
  }, [props.transcribe]);

  if (!browserSupportsSpeechRecognition || !props.transcribe) {
    return <div></div>;
  }

  return (
    <p className="text-center text-gray-400/80 max-w-[30ch] mx-auto">
      {getLastWindowContent(
        transcript,
        10,
      )}
    </p>
  );
};

function getLastWindowContent(s: string, n: number) {
  // Split the string into an array of words
  const words = s.split(/\s+/);

  // Calculate the starting index for the last n words
  const startIndex = Math.max(0, words.length - n);

  // Get the last n words from the array
  const lastNWords = words.slice(startIndex);

  return lastNWords.join(" ");
}
