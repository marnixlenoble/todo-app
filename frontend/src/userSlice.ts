import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { IUser } from "shared/types";

interface UserState {
  currentUser: IUser | undefined;
}

const initialState: UserState = {
  currentUser: undefined,
};

const counterSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser | undefined>) => {
      state.currentUser = action.payload;
    },
  },
});

const { setUser: setUserAction } = counterSlice.actions;
const selectCurrentUser = (state: RootState) => state.user.currentUser;

export default counterSlice.reducer;
export { counterSlice, setUserAction, selectCurrentUser };
