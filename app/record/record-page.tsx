"use client";
import Image from "next/image";
import { TranscriptVisualizer } from "./transcript-visualizer";
import { RecordingControls } from "./recording-controls";
import { RecordingVisualizer } from "./recording-visualizer";
import { useAudioRecorder } from "react-audio-voice-recorder";
import { useCallback, useEffect, useRef, useState } from "react";
import { parseTimestamp } from "@/lib/utils";
import { SaveRecording } from "./save-recording";

const supportsWebm = typeof MediaRecorder !== "undefined" && MediaRecorder.isTypeSupported("audio/webm")

if (!supportsWebm) {
  // Dynamically import the polyfill if 'audio/webm' is not supported
  // @ts-ignore
  Promise.all([import("audio-recorder-polyfill"), import("audio-recorder-polyfill/mpeg-encoder")])
    .then(([AudioRecorderModule, mpegEncoderModule]) => {
      const AudioRecorder = AudioRecorderModule.default
      const mpegEncoder = mpegEncoderModule.default

      AudioRecorder.encoder = mpegEncoder
      AudioRecorder.prototype.mimeType = "audio/mpeg"
      window.MediaRecorder = AudioRecorder
    })
    .catch((error) => {
      console.error("Error importing polyfill:", error)
    })
}

type RecordPageProps = {
  initialPatientId: string | null;
}

const RecordPage = ({
  initialPatientId
}: RecordPageProps) => {
  const {
    isRecording,
    togglePauseResume,
    isPaused,
    recordingBlob,
    startRecording,
    stopRecording,
    mediaRecorder,
    recordingTime,
  } = useAudioRecorder({});

  const [saveWindowOpen, setSaveWindowOpen] = useState(false);
  const [audioSource, setAudioSource] = useState<string>();

  const [duration, setDuration] = useState<number>(0);
  const firstTimeRef = useRef(false);

  useEffect(() => {
    if (!firstTimeRef.current) startRecording();
    firstTimeRef.current = true;
    return () => { };
  }, [startRecording]); // TODO: WHY UHHHH!!!!

  useEffect(() => {
    console.log("isRecording", isRecording);
  }, [isRecording]);

  const saveRecording = () => {
    setDuration(recordingTime);
    stopRecording();
    setSaveWindowOpen(true);
  };

  useEffect(() => {
    if (recordingBlob != undefined) {
      const url = URL.createObjectURL(recordingBlob);
      setAudioSource(url);
    }
  }, [recordingBlob]);

  return (
    <>
      <div className="flex-1  flex flex-col py-10 justify-center">
        {isRecording ? (
          <>
            <TranscriptVisualizer
              transcribe={
                isRecording && !isPaused //|| (!!recordingBlob && recordingBlob.size > 0)
              }
            />
            <RecordingVisualizer mediaRecorder={mediaRecorder} />
            <div className="text-4xl text-neutral-600 text-center mt-4">
              {parseTimestamp(recordingTime, 2)}
            </div>
          </>
        ) : (
          <div className="text-center  mx-auto text-gray-400">
            <Image
              src={"/onboarding-fig-1.png"}
              alt="onboarding figure 1"
              width={290}
              height={343}
              className="w-2/3 top-0 left-0   fixed  -z-50 max-w-md"
              priority
            />
            <Image
              src={"/onboarding-fig-2.png"}
              alt="onboarding figure 2"
              width={245.5}
              height={180.7}
              className=" bottom-20 md:bottom-10 right-0 -z-50  fixed  max-w-md"
              priority
            />
            <Image
              src={"/brds.png"}
              alt="brds"
              width={273}
              height={78}
              className="w-24 mx-auto mb-6"
              priority
            />
            Press record to start recording
          </div>
        )}
      </div>
      <RecordingControls
        {...{
          isPaused,
          isRecording,
          toggleRecording: togglePauseResume,
          startRecording,
          stopRecording,
          recordingTime,
          saveRecording,
        }}
      />
      {saveWindowOpen && (
        <SaveRecording
          recordingBlob={recordingBlob}
          closeWindow={() => {
            setSaveWindowOpen(false);
          }}
          audioSource={audioSource}
          duration={duration}
          initialPatientId={initialPatientId}
        />
      )}
    </>
  );
};

export default RecordPage;
