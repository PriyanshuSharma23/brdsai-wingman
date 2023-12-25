"use client";
import { TranscriptVisualizer } from "./transcript-visualizer";
import { RecordingControls } from "./recording-controls";
import { RecordingVisualizer } from "./recording-visualizer";
import { useAudioRecorder } from "react-audio-voice-recorder";
import { useEffect } from "react";

const RecordPage = () => {
  const {
    isRecording,
    togglePauseResume,
    recordingBlob,
    startRecording,
    stopRecording,
    mediaRecorder,
  } = useAudioRecorder();

  useEffect(() => {
    startRecording();
  }, []);

  useEffect(() => {
    console.log(recordingBlob);
  }, [recordingBlob]);

  useEffect(() => {
    console.log(isRecording);
  }, [isRecording]);

  return (
    <>
      <div className="flex-1 bg-white flex flex-col py-10">
        <TranscriptVisualizer
          transcribe={
            isRecording || (!!recordingBlob && recordingBlob.size > 0)
          }
        />
        <RecordingVisualizer mediaRecorder={mediaRecorder} />
        <p className="text-2xl">{isRecording}</p>
      </div>
      <RecordingControls
        {...{
          isRecording,
          toggleRecording: togglePauseResume,
          startRecording,
          stopRecording,
        }}
      />
    </>
  );
};

export default RecordPage;
