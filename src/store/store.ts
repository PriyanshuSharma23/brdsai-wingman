import { create } from "zustand";
import { UserSlice, createUserSlice } from "./slices/user";

type StoreState = UserSlice;

export const useStore = create<StoreState>((...a) => ({
  ...createUserSlice(...a),
}));
