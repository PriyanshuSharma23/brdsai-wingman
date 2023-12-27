import { create } from "zustand";

interface AudioPlayerState {
  visible: boolean;
  audioS3Key: string;
}

interface AudioPlayerActions {
  setVisible: (value: boolean) => void;
  setAudios3Key: (source: string) => void;

}

type AudioPlayer = AudioPlayerState & AudioPlayerActions;

const initialState: AudioPlayerState = {
  visible: false,
  audioS3Key: "",
};

export const useAudioPlayerState = create<AudioPlayer>((set, get) => ({
  ...initialState,
  setVisible: (val) => {
    set({
      visible: val,
    });
  },
  setAudios3Key(source) {
    set({
      audioS3Key: source,
    });
  },
}));
