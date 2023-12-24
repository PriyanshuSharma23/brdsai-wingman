import { create } from "zustand";

interface AudioPlayerState {
  visible: boolean;
}

interface AudioPlayerActions {
  setVisible: (value: boolean) => void;
}

type AudioPlayer = AudioPlayerState & AudioPlayerActions;

const initialState: AudioPlayerState = {
  visible: true,
};

export const useAudioPlayer = create<AudioPlayer>((set, get) => ({
  ...initialState,
  setVisible: (val) => {
    set({
      visible: val,
    });
  },
}));
