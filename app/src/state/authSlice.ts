import { AppThunk, RootState } from "./store";

import { Auth } from "aws-amplify";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  email?: string;
  password?: string;
  otpCode?: string;
  authenticated: boolean;
  uid?: string;
  showConfirmationScreen: boolean;
}

const initialState: AuthState = {
  authenticated: false,
  showConfirmationScreen: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setEmail: (state: AuthState, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setUid: (state: AuthState, action: PayloadAction<string>) => {
      state.uid = action.payload;
    },
    setPassword: (state: AuthState, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setOtpCode: (state: AuthState, action: PayloadAction<string>) => {
      state.otpCode = action.payload;
    },
    setAuthenticated: (state: AuthState, action: PayloadAction<boolean>) => {
      state.authenticated = action.payload;
    },
    setShowConfirmationScreen: (
      state: AuthState,
      action: PayloadAction<boolean>
    ) => {
      state.showConfirmationScreen = action.payload;
    },
  },
});

export const signUp = (): AppThunk => async (dispatch, getState) => {
  const state = getState();
  const email = state.auth.email;
  const password = state.auth.password;
  if (email && password) {
    dispatch(setShowConfirmationScreen(true));

    try {
      await Auth.signUp(email, password);
    } catch (e) {
      console.log(e);
    }
  }
};

export const signIn = (): AppThunk => async (_, getState) => {
  const state = getState();
  const email = state.auth.email;
  const password = state.auth.password;
  if (email && password) {
    try {
      await Auth.signIn(email, password);
    } catch (e) {
      console.log(e);
    }
  }
};

export const confirmCode = (): AppThunk => async (_, getState) => {
  const state = getState();
  const email = state.auth.email;
  const code = state.auth.otpCode;
  if (email && code) {
    try {
      await Auth.confirmSignUp(email, code);
    } catch (e) {
      console.error(e);
    }
  }
};

export const {
  setEmail,
  setPassword,
  setOtpCode,
  setAuthenticated,
  setShowConfirmationScreen,
  setUid,
} = authSlice.actions;

export const showConfirmationScreen = (state: RootState) =>
  state.auth.showConfirmationScreen;
export const isAuthenticated = (state: RootState) => state.auth.authenticated;

export default authSlice.reducer;
// sewoke8210@chimpad.com
