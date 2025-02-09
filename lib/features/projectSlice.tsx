import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialStateProperties {
  userAvatar: string;
}

const initialState: InitialStateProperties = {
  userAvatar: "",
};

const featureSlice = createSlice({
  name: "slices",
  initialState,
  reducers: {
    getUserAvatar: (state, action: PayloadAction<string>) => {
      state.userAvatar = action.payload;
    },
  },
});

export const sliceReducers = featureSlice.reducer;
export const { getUserAvatar } = featureSlice.actions;
