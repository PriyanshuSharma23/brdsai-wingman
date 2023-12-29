"use client";
import "regenerator-runtime/runtime";
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
  } = useSpeechRecognition({
    clearTranscriptOnListen: false,
  });

  const [lastTranscript, setLastTranscript] = useState("");

  useEffect(() => {
    if (transcript.length > 0) {
      setLastTranscript(transcript);
    }
  }, [transcript]);

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) return;
    if (props.transcribe) {
      SpeechRecognition.startListening({
        continuous: true,
      });
    } else {
      SpeechRecognition.stopListening();
    }
  }, [browserSupportsSpeechRecognition, props.transcribe]);

  useEffect(() => {
    return () => {
      setLastTranscript("");
    }
  }, []);

  return (
    <p className="text-center text-gray-400/80 max-w-[30ch] mx-auto h-24">
      {browserSupportsSpeechRecognition &&
        getLastWindowContent(lastTranscript, 20)}
    </p>
  );
};

function getLastWindowContent(s: string, n: number) {
    // Split the string into an array of words
    const words = s.split(/\s+/);

    // Calculate the number of windows
    const numWindows = Math.ceil(words.length / n);

    // Calculate the starting index of the last window
    const startIndex = (numWindows - 1) * n;

    // Get the content of the last window
    const lastWindowContent = words.slice(startIndex).join(' ');

    return lastWindowContent;
}
