import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserData {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

type UserState = UserData | null;


function getStoredUser(): UserState {
  const stored = sessionStorage.getItem("user");
  if (!stored) return null;

  try {
    return JSON.parse(stored) as UserData;
  } catch {
    sessionStorage.removeItem("user");
    return null;
  }
}

const initialState = getStoredUser() as UserState;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(_state, action: PayloadAction<UserData>) {
      sessionStorage.setItem("user", JSON.stringify(action.payload));
      return action.payload;
    },
    clearUser() {
      sessionStorage.removeItem("user");
      return null;
    }
  }
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
