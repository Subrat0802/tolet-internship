import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebar: false,
  editBox: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.sidebar = !state.sidebar;
    },
    toggleEditBox(state) {
      state.editBox = !state.editBox;
    },
  },
});

export const { toggleSidebar, toggleEditBox } = uiSlice.actions;
export default uiSlice.reducer;
